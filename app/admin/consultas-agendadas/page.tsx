"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import Layout from "@/app/components/Admin/Layout"
import { AppointmentFormatType } from "@/utils/types"
import { Button } from "@/components/ui/button"
import ModalUpdateAppointmentStatus from "@/app/components/Admin/ModalUpdateAppointmentStatus"
import { format, parseISO } from "date-fns"
import useAppointmentsAdmin from "@/hooks/useAppointmentsAdmin"

//import {specialistsData} from "../../../mock-specialists-data"
//import {addDataToDB} from "@/firebase/firebaseDBServices"

const statusColors = {
  confirmada: "bg-green-500",
  pendente: "bg-yellow-500",
  cancelada: "bg-red-500",
}

export default function Appointments() {

  //addDataToDB({ route: `services`, data: specialistsData })
  const {
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
    setIsAppointmentUpdated,
  } = useAppointmentsAdmin(); 
  
  const handleReviseAppointment = (appointment: AppointmentFormatType) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">
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
        { isLoading && <span className="mt-5 ml-3">Carregando...</span> }
        { isError && <span className="mt-5">Erro ao carregar dados.</span> }
        { !isLoading && !isError && (
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
            <TableBody>
              {filteredAppointments?.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.professionalName}</TableCell>
                  <TableCell>{appointment.specialty}</TableCell>
                  <TableCell>{
                    appointment.date 
                      ? format(parseISO(appointment.date), 'dd/MM/yyyy')
                      : ''
                  }</TableCell>
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
                            setIsAppointmentUpdated={setIsAppointmentUpdated}
                            />
                        </>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Layout>
  )
}

