import { format, subMonths } from "date-fns";
import { AppointmentFormatType } from "../types";
import { toStartsAt } from "./scheduling";

// Funções puras que calculam os números do admin direto das consultas,
// em vez de manter contadores separados no banco.

const startsAtOf = (appointment: AppointmentFormatType) =>
  appointment.startsAt ?? toStartsAt(appointment.date, appointment.time);

// Consultas não canceladas por mês da consulta, dos últimos `months` meses
// (incluindo o atual), do mais antigo para o mais recente.
export function countAppointmentsByMonth(
  appointments: AppointmentFormatType[] = [],
  now: Date = new Date(),
  months = 6
): { month: string; count: number }[] {
  const counts = new Map<string, number>();
  for (let i = months - 1; i >= 0; i--) {
    counts.set(format(subMonths(now, i), "yyyy-MM"), 0);
  }
  appointments.forEach((appointment) => {
    if (appointment.status === "cancelada" || !appointment.date) return;
    const month = appointment.date.slice(0, 7);
    if (counts.has(month)) counts.set(month, (counts.get(month) ?? 0) + 1);
  });
  return Array.from(counts, ([month, count]) => ({ month, count }));
}

// Consultas confirmadas de uma data ("yyyy-MM-dd"), ordenadas por horário.
export function confirmedAppointmentsOn(
  appointments: AppointmentFormatType[] = [],
  date: string
): AppointmentFormatType[] {
  return appointments
    .filter((appointment) => appointment.status === "confirmada" && appointment.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));
}

export interface PatientStats {
  totalConfirmed: number;
  lastAppointmentDate?: string;
}

// Por paciente: total de consultas confirmadas e data da última que já aconteceu.
export function statsByPatient(
  appointments: AppointmentFormatType[] = [],
  now: Date = new Date()
): Record<string, PatientStats> {
  const stats: Record<string, PatientStats> = {};
  appointments.forEach((appointment) => {
    if (appointment.status !== "confirmada" || !appointment.patientId) return;
    const current = (stats[appointment.patientId] ??= { totalConfirmed: 0 });
    current.totalConfirmed += 1;

    const alreadyHappened = startsAtOf(appointment) <= now.getTime();
    if (alreadyHappened && (!current.lastAppointmentDate || appointment.date > current.lastAppointmentDate)) {
      current.lastAppointmentDate = appointment.date;
    }
  });
  return stats;
}

// Horários de meia em meia hora para montar a agenda de um médico.
export function generateTimeOptions(start = "07:00", end = "18:00", stepMinutes = 30): string[] {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const options: string[] = [];
  for (let m = toMinutes(start); m <= toMinutes(end); m += stepMinutes) {
    options.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return options;
}

// Chave do médico no banco a partir do nome: sem título, sem acento, com hífens.
// "Dra. Ana Lúcia Melo" -> "ana-lucia-melo"
export function doctorKeyFromName(name: string): string {
  return name
    .trim()
    .replace(/^(dr|dra)\.?\s+/i, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Reservas que deixariam de existir na agenda nova (data ou horário removidos).
export function bookingsOutsideAgenda(
  booked: Record<string, string[]>,
  agenda: { date: string[]; time: string[] }
): { date: string; time: string }[] {
  const dates = new Set(agenda.date);
  const times = new Set(agenda.time);
  return Object.entries(booked).flatMap(([date, bookedTimes]) =>
    bookedTimes
      .filter((time) => !dates.has(date) || !times.has(time))
      .map((time) => ({ date, time }))
  );
}
