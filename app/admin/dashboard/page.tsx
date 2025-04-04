"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "../../components/Admin/Layout"
import { useDataFromDB, useFetchUserAppointmentsAdmin, useLastSixMonthsAppointments } from "@/firebase/firebaseDBServices"
import { useMemo } from "react"
import { AppointmentFormatType } from "@/utils/types"
import { format, parse } from "date-fns"
import { ptBR } from 'date-fns/locale';

export default function Dashboard() {
  
  const { data } = useFetchUserAppointmentsAdmin();
  const { data: lastMonthsAppointments, isLoading: isLoadingLastSixMonths, isError: isErrorLastSixMonths } = useLastSixMonthsAppointments();
  const { data: registeredPatientsData } = useDataFromDB({route: 'users', queryKey: 'registered-patients-data' });
  const numberOfPatients = registeredPatientsData && Object.keys(registeredPatientsData).length || 0;
  
  const filteredAppointmertsForToday = useMemo(() => {
    return (data as AppointmentFormatType[])?.filter((appointment) => {
      if(appointment.status !== 'confirmada') return false;
      
      const today = Number(new Date().toLocaleDateString('pt-BR', { day: '2-digit' }))
      const appointmentDate = new Date(appointment.date);
      
      return today === appointmentDate.getUTCDate();
    });
  }, [data]);

  const months = lastMonthsAppointments?.map((appointment) => {
    const date = parse(appointment.month, "yyyy-MM", new Date());  
    const monthName = format(date, "MMM", { locale: ptBR });
    return monthName
  });
  const monthsData = lastMonthsAppointments?.map((appointment) => ({
    month: format(parse(appointment.month, "yyyy-MM", new Date()), "MMM yyyy", { locale: ptBR }), // "2025-03" → "Mar"
    count: appointment.count ?? 0, // Evita undefined
  })).reverse();
  
  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">  
        <h1 className="text-[1.7rem] md:text-3xl font-bold mb-6 lg:mb-10">Dashboard</h1>
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Marcadas Para Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAppointmertsForToday?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pacientes Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{numberOfPatients || 0}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Consultas Agendadas para Hoje</CardTitle>
          </CardHeader>
          <CardContent>
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
                {
                  filteredAppointmertsForToday?.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment?.patientName}</TableCell>
                      <TableCell>{appointment?.professionalName}</TableCell>
                      <TableCell>{appointment?.specialty}</TableCell>
                      <TableCell>{appointment?.time}</TableCell>
                    </TableRow>
                    )
                  )
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="my-8">
          <CardHeader>
            <CardTitle>{`Consultas mensais nos últimos ${months?.length} meses`}</CardTitle>
          </CardHeader>
          <CardContent>
            { isLoadingLastSixMonths && <span className="mt-5 ml-3">Carregando...</span> }
            { isErrorLastSixMonths && <span className="mt-5">Erro ao carregar dados.</span> }
            { !isLoadingLastSixMonths && !isErrorLastSixMonths && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#0693DA" />
                </LineChart>
              </ResponsiveContainer>          
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

