'use client'
import { useMemo, useState } from "react"
import { format, parseISO } from "date-fns"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "@/app/components/Admin/Layout"
import { useDataFromDB, useFetchUserAppointmentsAdmin } from "@/firebase/firebaseDBServices"
import { statsByPatient } from "@/utils/functions/adminStats"
import { isAdmin } from "@/utils/constants"
import { AppointmentFormatType } from "@/utils/types"

interface Patient {
  profile?: {
    name: string
    email: string
    cellphone: string
    cpf: string
  }
}

export default function Patients() {
  const { data, isLoading, isError } = useDataFromDB({ route: 'users', queryKey: 'registered-patients-data' })
  const { data: appointments } = useFetchUserAppointmentsAdmin()
  const [search, setSearch] = useState("")

  // Total e última consulta calculados das consultas confirmadas (não de contadores salvos).
  const stats = useMemo(
    () => statsByPatient((appointments ?? []) as AppointmentFormatType[]),
    [appointments]
  )

  const patients = useMemo(() => {
    if (!data) return []
    return Object.entries(data as Record<string, Patient>).filter(([uid]) => !isAdmin(uid))
  }, [data])

  const term = search.toLowerCase()
  const filteredPatients = patients.filter(
    ([, patient]) =>
      patient.profile?.name?.toLowerCase().includes(term) ||
      patient.profile?.email?.toLowerCase().includes(term) ||
      patient.profile?.cpf?.includes(search),
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
        {isLoading && <span className="mt-5">Carregando...</span>}
        {isError && <span className="mt-5">Erro ao carregar dados.</span>}
        {!isLoading && !isError && (
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
              {filteredPatients.map(([uid, patient]) => {
                const patientStats = stats[uid]
                return (
                  <TableRow key={uid}>
                    <TableCell>{patient.profile?.name}</TableCell>
                    <TableCell>{patient.profile?.email}</TableCell>
                    <TableCell>{patient.profile?.cellphone}</TableCell>
                    <TableCell>{patient.profile?.cpf}</TableCell>
                    <TableCell>
                      {patientStats?.lastAppointmentDate
                        ? format(parseISO(patientStats.lastAppointmentDate), 'dd/MM/yyyy')
                        : "Ainda não possui consulta realizada"}
                    </TableCell>
                    <TableCell>{patientStats?.totalConfirmed ?? 0}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
        {!isLoading && filteredPatients.length === 0 && <p className="mt-5 ml-4">Nenhum paciente encontrado.</p>}
      </div>
    </Layout>
  )
}
