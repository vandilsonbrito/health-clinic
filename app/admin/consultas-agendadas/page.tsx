"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Layout from "@/app/components/Admin/Layout"

const appointments = [
  {
    patient: "João Silva",
    doctor: "Dra. Maria Santos",
    specialty: "Cardiologia",
    date: "2024-03-15",
    time: "09:00",
    status: "confirmada",
  },
  {
    patient: "Ana Oliveira",
    doctor: "Dr. Carlos Ferreira",
    specialty: "Ortopedia",
    date: "2024-03-15",
    time: "10:30",
    status: "pendente",
  },
  {
    patient: "Pedro Costa",
    doctor: "Dra. Juliana Lima",
    specialty: "Pediatria",
    date: "2024-03-16",
    time: "14:00",
    status: "cancelada",
  },
]

const statusColors = {
  confirmada: "bg-green-500",
  pendente: "bg-yellow-500",
  cancelada: "bg-red-500",
}

export default function Appointments() {
  const [search, setSearch] = useState("")
  const [doctorFilter, setDoctorFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filteredAppointments = appointments.filter((appointment) => {

    const matchesSearch = appointment.patient.toLowerCase().includes(search.toLowerCase());

    const matchesDoctor = (doctorFilter === "" || doctorFilter === "all") || appointment.doctor === doctorFilter;

    const matchesStatus = (statusFilter === "" || statusFilter === "all") || appointment.status === statusFilter;

    return matchesSearch && matchesDoctor && matchesStatus;
  });

  console.log('doctorFilter', doctorFilter)
  console.log('statusFilter', statusFilter)

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-[1.7rem] md:text-3xl font-bold mb-6 lg:mb-10">Consultas Agendadas</h1>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                    {appointment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

