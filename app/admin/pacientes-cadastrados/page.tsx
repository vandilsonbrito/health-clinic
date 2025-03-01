'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "@/app/components/Admin/Layout"

const patients = [
  {
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    lastAppointment: "2024-03-10",
    totalAppointments: 5,
  },
  {
    name: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    phone: "(11) 97654-3210",
    cpf: "987.654.321-00",
    lastAppointment: "2024-02-25",
    totalAppointments: 3,
  },
  {
    name: "Pedro Costa",
    email: "pedro.costa@example.com",
    phone: "(11) 96543-2109",
    cpf: "456.789.123-00",
    lastAppointment: "2024-03-05",
    totalAppointments: 7,
  },
]

export default function Patients() {
  const [search, setSearch] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.cpf.includes(search),
  )

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-[1.7rem] md:text-3xl font-bold mb-8 md:mb-6 lg:mb-10">Pacientes Cadastrados</h1>
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar pacientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Última Consulta</TableHead>
              <TableHead>Total de Consultas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.cpf}</TableCell>
                <TableCell>{patient.lastAppointment}</TableCell>
                <TableCell>{patient.totalAppointments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

