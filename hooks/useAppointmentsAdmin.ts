import { useEffect, useMemo, useState } from "react";
import { useFetchUserAppointmentsAdmin, updateDBData } from "@/firebase/firebaseDBServices";
import { AppointmentFormatType } from "@/utils/types";
import { orderByDate } from "@/utils/functions/orderByDate";
import { format, isAfter, parseISO } from "date-fns";
import { useAuth } from "@/firebase/authContext";

export default function useAppointmentsForAdmin() {
  const { userAuth } = useAuth();
  const { data, isLoading, refetch, isError } = useFetchUserAppointmentsAdmin();
  const userAppointments = data as AppointmentFormatType[];

  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAppointmentUpdated, setIsAppointmentUpdated] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormatType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userAppointmentsData = useMemo(() => {
    if (!userAppointments) return [];
    return orderByDate(userAppointments);
  }, [userAppointments]);

  const filteredAppointments = useMemo(() => {
    return userAppointmentsData?.filter((appointment) => {
      if (!appointment) return false;

      const matchesSearch = appointment.patientName?.toLowerCase().includes(search.toLowerCase());
      const matchesDoctor = (doctorFilter === "" || doctorFilter === "all") || appointment.professionalName === doctorFilter;
      const matchesStatus = (statusFilter === "" || statusFilter === "all") || appointment.status === statusFilter;

      return matchesSearch && matchesDoctor && matchesStatus;
    });
  }, [userAppointmentsData, search, doctorFilter, statusFilter]);

  const lastAppointment = async () => {
    const confirmedAppointments = userAppointmentsData?.filter(
      (appointment) => appointment.status === 'confirmada'
    );
    const lastAppointment = confirmedAppointments?.reduce((latest, appointment) => {
        const appointmentDate = parseISO(appointment.date).getTime();
        return isAfter(appointmentDate, latest) ? appointmentDate : latest;
    }, 0);

    if(confirmedAppointments?.length > 0 && lastAppointment !== 0) {
      const lastAppointmentDate = format(new Date(lastAppointment), 'yyyy-MM-dd');
      
      await updateDBData({
        route: `users/${userAuth?.uid}/profile`,
        data: { lastAppointmentDate, totalOfAppointments: confirmedAppointments.length },
      });
    }
  };

  useEffect(() => {
    if (isAppointmentUpdated && userAppointmentsData.length > 0) {
      lastAppointment().catch(console.error);
    }
  }, [isAppointmentUpdated, userAppointmentsData]);

  return {
    filteredAppointments,
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
    setIsAppointmentUpdated
  };
}