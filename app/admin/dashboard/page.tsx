"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "../../components/Admin/Layout"
import { useDataFromDB, useFetchUserAppointmentsAdmin } from "@/firebase/firebaseDBServices"
import { confirmedAppointmentsOn, countAppointmentsByMonth } from "@/utils/functions/adminStats"
import { toDateKey } from "@/utils/functions/scheduling"
import { isAdmin } from "@/utils/constants"
import { AppointmentFormatType } from "@/utils/types"

const MONTHS = 6

export default function Dashboard() {
  const { data, isLoading, isError } = useFetchUserAppointmentsAdmin()
  const { data: registeredPatientsData } = useDataFromDB({ route: 'users', queryKey: 'registered-patients-data' })

  const appointments = useMemo(() => (data ?? []) as AppointmentFormatType[], [data])
  const numberOfPatients = registeredPatientsData
    ? Object.keys(registeredPatientsData).filter((uid) => !isAdmin(uid)).length
    : 0

  const todayAppointments = useMemo(() => confirmedAppointmentsOn(appointments, toDateKey(new Date())), [appointments])
  const pendingCount = appointments.filter((appointment) => appointment.status === "pendente").length

  // Consultas não canceladas por mês, calculadas das próprias consultas.
  const monthsData = useMemo(
    () =>
      countAppointmentsByMonth(appointments, new Date(), MONTHS).map(({ month, count }) => ({
        month: format(parse(month, "yyyy-MM", new Date()), "MMM yyyy", { locale: ptBR }),
        count,
      })),
    [appointments]
  )

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-[1.7rem] md:text-3xl font-bold mb-6 lg:mb-10">Dashboard</h1>
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Confirmadas Para Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aguardando Confirmação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pacientes Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{numberOfPatients}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Consultas Confirmadas para Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length === 0 ? (
              <p className="text-gray-600">Nenhuma consulta confirmada para hoje.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Horário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.professionalName}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <Card className="my-8">
          <CardHeader>
            <CardTitle>{`Consultas por mês nos últimos ${MONTHS} meses`}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <span className="mt-5 ml-3">Carregando...</span>}
            {isError && <span className="mt-5">Erro ao carregar dados.</span>}
            {!isLoading && !isError && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" name="Consultas" stroke="#0693DA" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
