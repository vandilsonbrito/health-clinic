"use client"

import { format, parseISO } from "date-fns"
import { Toaster } from "react-hot-toast"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Layout from "@/app/components/Admin/Layout"
import ModalUpdateAppointmentStatus from "@/app/components/Admin/ModalUpdateAppointmentStatus"
import useAppointmentsAdmin from "@/hooks/useAppointmentsAdmin"
import { AppointmentFormatType } from "@/utils/types"

const statusColors = {
  confirmada: "bg-green-500",
  pendente: "bg-yellow-500",
  cancelada: "bg-red-500",
}

const statusLabels = {
  confirmada: "Confirmada",
  pendente: "Pendente",
  cancelada: "Cancelada",
}

export default function Appointments() {
  const {
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
  } = useAppointmentsAdmin()

  const openModal = (appointment: AppointmentFormatType) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  return (
    <Layout>
      <Toaster position="top-center" />
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
              {doctorNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && <span className="mt-5 ml-3">Carregando...</span>}
        {isError && <span className="mt-5">Erro ao carregar dados.</span>}
        {!isLoading && !isError && filteredAppointments.length === 0 && (
          <p className="mt-5">Nenhuma consulta encontrada.</p>
        )}
        {!isLoading && !isError && filteredAppointments.length > 0 && (
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
              {filteredAppointments.map((appointment) => {
                const status = appointment.status as keyof typeof statusColors
                return (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.professionalName}</TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
                    <TableCell>{appointment.date ? format(parseISO(appointment.date), "dd/MM/yyyy") : ""}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[status] ?? "bg-gray-500"}>
                        {statusLabels[status] ?? appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {appointment.status === "pendente" && (
                        <Button variant="outline" size="sm" onClick={() => openModal(appointment)}>
                          Revisar
                        </Button>
                      )}
                      {appointment.status === "confirmada" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openModal(appointment)}
                        >
                          Cancelar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}

        <ModalUpdateAppointmentStatus
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedAppointment={selectedAppointment}
          onUpdated={() => refetch()}
        />
      </div>
    </Layout>
  )
}
