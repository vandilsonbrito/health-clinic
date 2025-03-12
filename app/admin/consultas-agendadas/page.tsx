"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import Layout from "@/app/components/Admin/Layout"
import { useFetchUserAppointmentsAdmin } from "@/firebase/firebaseDBServices"
import { AppointmentFormatType } from "@/utils/types"
import { Button } from "@/components/ui/button"
import ModalUpdateAppointmentStatus from "@/app/components/Admin/ModalUpdateAppointmentStatus"
import { orderByDate } from "@/utils/functions/orderByDate"

const statusColors = {
  confirmada: "bg-green-500",
  pendente: "bg-yellow-500",
  cancelada: "bg-red-500",
}

export default function Appointments() {

  const { data, isLoading, refetch, isError } = useFetchUserAppointmentsAdmin();
  const userAppointments = data as AppointmentFormatType[]; 
  const [search, setSearch] = useState("")
  const [doctorFilter, setDoctorFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormatType | null>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAppointmentsData, setUserAppointmentsData] = useState(userAppointments);

  useEffect(() => {
    setUserAppointmentsData(orderByDate(userAppointments));
  }, [userAppointments])

  const filteredAppointments = userAppointmentsData?.filter((appointment) => {
    if(!appointment) return false;

    const matchesSearch = appointment.patientName?.toLowerCase().includes(search.toLowerCase());
    const matchesDoctor = (doctorFilter === "" || doctorFilter === "all") || appointment.professionalName === doctorFilter;
    const matchesStatus = (statusFilter === "" || statusFilter === "all") || appointment.status === statusFilter;

    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const handleReviseAppointment = (appointment: AppointmentFormatType) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Consultas Agendadas</h1>
        <div className="grid gap-4 mb-6 md:grid-cols-3">
          <Input
            type="search"
            placeholder="Buscar paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={doctorFilter} onValueChange={setDoctorFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por médico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os médicos</SelectItem>
              <SelectItem value="Dra. Maria Santos">Dra. Maria Santos</SelectItem>
              <SelectItem value="Dr. Carlos Ferreira">Dr. Carlos Ferreira</SelectItem>
              <SelectItem value="Dra. Juliana Lima">Dra. Juliana Lima</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          { isLoading && <p className="mt-5 ml-3">Carregando...</p> }
          { isError && <p className="mt-5">Erro ao carregar dados.</p> }
          <TableBody>
            {filteredAppointments?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.professionalName}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    {appointment.status === "pendente" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleReviseAppointment(appointment)}>
                            Revisar
                        </Button>
                        <ModalUpdateAppointmentStatus 
                          isModalOpen={isModalOpen} 
                          setIsModalOpen={setIsModalOpen} 
                          selectedAppointment={selectedAppointment ?? {} as AppointmentFormatType} 
                          setSelectedAppointment={setSelectedAppointment}
                          refetch={refetch}
                          />
                      </>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

