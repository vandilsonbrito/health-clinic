import { get, push, ref, serverTimestamp, update } from 'firebase/database';
import { useQuery } from '@tanstack/react-query';
import { database } from './firebaseDBConfig';
import { AppointmentFormatType, Doctor, ProfessionalData } from '@/utils/types';
import { canPatientCancel, toStartsAt } from '@/utils/functions/scheduling';
import { bookingsOutsideAgenda, doctorKeyFromName } from '@/utils/functions/adminStats';

// Caminho da "tranca" de uma vaga. Só pode existir uma por médico/data/horário;
// as regras de segurança recusam criar uma tranca que já existe.
const slotPath = (specialtyKey: string, doctorKey: string, date: string, time: string) =>
  `bookedSlots/${specialtyKey}/${doctorKey}/${date}/${time}`;

async function fetchDoctors(): Promise<Doctor[]> {
  const snapshot = await get(ref(database, 'services/consultation'));
  if (!snapshot.exists()) return [];

  const bySpecialty = snapshot.val() as Record<string, Record<string, ProfessionalData>>;
  return Object.entries(bySpecialty)
    .flatMap(([specialtyKey, doctors]) =>
      Object.entries(doctors ?? {}).map(([doctorKey, doctor]) => ({ ...doctor, specialtyKey, doctorKey }))
    )
    .sort((a, b) => a.specialty.localeCompare(b.specialty) || a.name.localeCompare(b.name));
}

export const useDoctors = () =>
  useQuery({ queryKey: ['doctors'], queryFn: fetchDoctors });

async function fetchBookedTimes(doctor: Doctor, date: string): Promise<string[]> {
  const snapshot = await get(ref(database, `bookedSlots/${doctor.specialtyKey}/${doctor.doctorKey}/${date}`));
  return snapshot.exists() ? Object.keys(snapshot.val()) : [];
}

export const useBookedTimes = (doctor: Doctor | undefined, date: string | undefined) =>
  useQuery({
    queryKey: ['booked-times', doctor?.specialtyKey, doctor?.doctorKey, date],
    queryFn: () => fetchBookedTimes(doctor as Doctor, date as string),
    enabled: !!doctor && !!date,
    staleTime: 0,
  });

export type BookingResult =
  | { ok: true; appointmentId: string }
  | { ok: false; reason: 'slot-taken' | 'error' };

// Grava a tranca da vaga e a consulta numa única operação atômica:
// ou as duas são salvas, ou nenhuma. Se a vaga já foi pega, as regras
// recusam a escrita inteira.
export async function bookAppointment({
  doctor,
  date,
  time,
  patientId,
  patientName,
}: {
  doctor: Doctor;
  date: string;
  time: string;
  patientId: string;
  patientName: string;
}): Promise<BookingResult> {
  const appointmentId = push(ref(database, 'appointments')).key as string;
  const lockPath = slotPath(doctor.specialtyKey, doctor.doctorKey, date, time);

  const appointment: AppointmentFormatType = {
    id: appointmentId,
    specialty: doctor.specialty,
    professionalName: doctor.name,
    specialtyKey: doctor.specialtyKey,
    doctorKey: doctor.doctorKey,
    date,
    time,
    startsAt: toStartsAt(date, time),
    status: 'pendente',
    patientId,
    patientName,
    professionalName_date_time: `${doctor.name}_${date}_${time}`,
  };

  try {
    await update(ref(database), {
      [lockPath]: { patientId, appointmentId },
      [`appointments/${appointmentId}`]: { ...appointment, createdAt: serverTimestamp() },
    });
    return { ok: true, appointmentId };
  } catch (error) {
    // Uma recusa pode ser vaga ocupada ou outro problema: confere a tranca.
    try {
      const lock = await get(ref(database, lockPath));
      if (lock.exists()) return { ok: false, reason: 'slot-taken' };
    } catch {
      // ignora: cai no erro genérico abaixo
    }
    console.error('Error booking appointment:', error);
    return { ok: false, reason: 'error' };
  }
}

export type CancelResult = { ok: true } | { ok: false; reason: 'too-late' | 'error' };

// Marca a consulta como cancelada e libera a vaga, também de forma atômica.
export async function cancelAppointment(appointment: AppointmentFormatType): Promise<CancelResult> {
  if (!canPatientCancel(appointment.startsAt, appointment.status)) {
    return { ok: false, reason: 'too-late' };
  }

  const changes: Record<string, unknown> = {
    [`appointments/${appointment.id}/status`]: 'cancelada',
  };
  if (appointment.specialtyKey && appointment.doctorKey) {
    changes[slotPath(appointment.specialtyKey, appointment.doctorKey, appointment.date, appointment.time)] = null;
  }

  try {
    await update(ref(database), changes);
    return { ok: true };
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return { ok: false, reason: 'error' };
  }
}

// ---------- Ações do admin (as regras do banco só permitem para o ADMIN_UID) ----------

export async function confirmAppointment(appointment: AppointmentFormatType): Promise<boolean> {
  try {
    await update(ref(database, `appointments/${appointment.id}`), { status: 'confirmada' });
    return true;
  } catch (error) {
    console.error('Error confirming appointment:', error);
    return false;
  }
}

// Recusa uma pendente ou cancela uma confirmada, sem o limite de 24h do paciente.
export async function adminCancelAppointment(appointment: AppointmentFormatType): Promise<boolean> {
  const changes: Record<string, unknown> = {
    [`appointments/${appointment.id}/status`]: 'cancelada',
  };
  if (appointment.specialtyKey && appointment.doctorKey) {
    changes[slotPath(appointment.specialtyKey, appointment.doctorKey, appointment.date, appointment.time)] = null;
  }
  try {
    await update(ref(database), changes);
    return true;
  } catch (error) {
    console.error('Error cancelling appointment (admin):', error);
    return false;
  }
}

export interface NewDoctorInput {
  name: string;
  specialtyKey: string;
  specialty: string;
  crm: string;
  phone: string;
  email: string;
  pix_key?: string;
  agenda: { date: string[]; time: string[] };
}

export type SaveDoctorResult = { ok: true } | { ok: false; reason: 'already-exists' | 'invalid-name' | 'error' };

export async function saveNewDoctor(input: NewDoctorInput): Promise<SaveDoctorResult> {
  const doctorKey = doctorKeyFromName(input.name);
  if (!doctorKey) return { ok: false, reason: 'invalid-name' };

  const doctorRef = ref(database, `services/consultation/${input.specialtyKey}/${doctorKey}`);
  try {
    if ((await get(doctorRef)).exists()) return { ok: false, reason: 'already-exists' };

    const { specialtyKey: _specialtyKey, ...data } = input;
    await update(doctorRef, {
      ...data,
      name: input.name.trim(),
      pix_key: input.pix_key ?? '',
      id: crypto.randomUUID(),
    });
    return { ok: true };
  } catch (error) {
    console.error('Error saving doctor:', error);
    return { ok: false, reason: 'error' };
  }
}

export type UpdateAgendaResult =
  | { ok: true }
  | { ok: false; reason: 'has-bookings'; conflicts: { date: string; time: string }[] }
  | { ok: false; reason: 'error' };

// Troca a agenda do médico, mas não deixa remover data/horário que já tem reserva ativa.
export async function updateDoctorAgenda(
  specialtyKey: string,
  doctorKey: string,
  agenda: { date: string[]; time: string[] }
): Promise<UpdateAgendaResult> {
  try {
    const bookedSnapshot = await get(ref(database, `bookedSlots/${specialtyKey}/${doctorKey}`));
    const booked: Record<string, string[]> = {};
    if (bookedSnapshot.exists()) {
      Object.entries(bookedSnapshot.val() as Record<string, Record<string, unknown>>).forEach(([date, times]) => {
        booked[date] = Object.keys(times);
      });
    }

    const conflicts = bookingsOutsideAgenda(booked, agenda);
    if (conflicts.length > 0) return { ok: false, reason: 'has-bookings', conflicts };

    await update(ref(database, `services/consultation/${specialtyKey}/${doctorKey}/agenda`), {
      date: [...agenda.date].sort(),
      time: [...agenda.time].sort(),
    });
    return { ok: true };
  } catch (error) {
    console.error('Error updating agenda:', error);
    return { ok: false, reason: 'error' };
  }
}

async function fetchSpecialties(): Promise<{ key: string; label: string }[]> {
  const snapshot = await get(ref(database, 'specialties'));
  const keys: string[] = snapshot.exists() ? Object.values(snapshot.val() as Record<string, string>) : [];
  return keys
    .map((key) => ({ key, label: key.charAt(0).toUpperCase() + key.slice(1) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const useSpecialties = () =>
  useQuery({ queryKey: ['specialties'], queryFn: fetchSpecialties });
