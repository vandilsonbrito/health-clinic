"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Toaster } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "@/app/components/Admin/Layout"
import FormNewDoctor from "@/app/components/Admin/FormNewDoctor"
import EditAgendaDialog from "@/app/components/Admin/EditAgendaDialog"
import { useDoctors } from "@/firebase/appointmentServices"
import { getAvailableDates } from "@/utils/functions/scheduling"
import { Doctor } from "@/utils/types"

export default function Doctors() {
  const { data: doctors = [], refetch, isLoading, isError } = useDoctors()
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between mb-6 lg:mb-10">
          <h1 className="text-[1.7rem] md:text-3xl font-bold">Profissionais Cadastrados</h1>
          <Button
            className="mt-8 md:mt-0 bg-blueSecundary hover:bg-bluePrimary text-white"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : (<><Plus className="mr-2 h-4 w-4" />Novo Profissional</>)}
          </Button>
        </div>

        {showForm && <FormNewDoctor setShowForm={setShowForm} refetch={refetch} />}

        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar profissionais..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading && <span className="mt-5 ml-3">Carregando...</span>}
        {isError && <span className="mt-5">Erro ao carregar dados.</span>}
        {!isLoading && !isError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>CRM</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Agenda</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => {
                const upcomingDates = getAvailableDates(doctor.agenda?.date, doctor.agenda?.time)
                return (
                  <TableRow key={`${doctor.specialtyKey}/${doctor.doctorKey}`}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.crm}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className={upcomingDates.length === 0 ? "text-red-600" : "text-gray-600"}>
                          {upcomingDates.length === 0 ? "Sem datas futuras" : `${upcomingDates.length} datas`}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => setEditingDoctor(doctor)}>
                          Editar agenda
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
        {!isLoading && !isError && filteredDoctors.length === 0 && (
          <p className="mt-5 ml-4">Nenhum profissional encontrado.</p>
        )}
      </div>

      <EditAgendaDialog doctor={editingDoctor} onClose={() => setEditingDoctor(null)} onSaved={() => refetch()} />
    </Layout>
  )
}
