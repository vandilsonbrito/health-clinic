import { useMemo, useState } from "react";
import { useFetchUserAppointmentsAdmin } from "@/firebase/firebaseDBServices";
import { AppointmentFormatType } from "@/utils/types";
import { orderByDate } from "@/utils/functions/orderByDate";

export default function useAppointmentsForAdmin() {
  const { data, isLoading, refetch, isError } = useFetchUserAppointmentsAdmin();

  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormatType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appointments = useMemo(
    () => orderByDate((data ?? []) as AppointmentFormatType[]),
    [data]
  );

  // Lista de médicos para o filtro, sem repetição e sem depender dos outros filtros.
  const doctorNames = useMemo(
    () => Array.from(new Set(appointments.map((a) => a.professionalName?.trim()).filter(Boolean))).sort(),
    [appointments]
  );

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      if (!appointment) return false;

      const matchesSearch = (appointment.patientName ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesDoctor = doctorFilter === "" || doctorFilter === "all" || appointment.professionalName?.trim() === doctorFilter;
      const matchesStatus = statusFilter === "" || statusFilter === "all" || appointment.status === statusFilter;

      return matchesSearch && matchesDoctor && matchesStatus;
    });
  }, [appointments, search, doctorFilter, statusFilter]);

  return {
    filteredAppointments,
    doctorNames,
    isLoading,
    isError,
    search,
    setSearch,
    doctorFilter,
    setDoctorFilter,
    statusFilter,
    setStatusFilter,
    selectedAppointment,
    setSelectedAppointment,
    isModalOpen,
    setIsModalOpen,
    refetch,
  };
}
