"use client"

import { useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Cliente/Layout"
import { useAuth } from "@/firebase/authContext"
import { useFetchUserAppointmentsClient } from "@/firebase/firebaseDBServices"
import { cancelAppointment } from "@/firebase/appointmentServices"
import { canPatientCancel, fromDateKey, toStartsAt } from "@/utils/functions/scheduling"
import { AppointmentFormatType } from "@/utils/types"

const statusColors = {
  confirmada: "bg-green-500",
  pendente: "bg-yellow-500",
  cancelada: "bg-red-500",
}

const statusLabels = {
  confirmada: "Confirmada",
  pendente: "Aguardando confirmação",
  cancelada: "Cancelada",
}

const startsAtOf = (appointment: AppointmentFormatType) =>
  appointment.startsAt ?? toStartsAt(appointment.date, appointment.time)

export default function MyAppointments() {
  const { userAuth } = useAuth()
  const { data, isLoading, isError, refetch } = useFetchUserAppointmentsClient(userAuth?.uid ?? "")
  const [cancellingId, setCancellingId] = useState<string>()

  const now = Date.now()
  const appointments = ((data ?? []) as AppointmentFormatType[])
  const upcoming = appointments
    .filter((appointment) => startsAtOf(appointment) >= now)
    .sort((a, b) => startsAtOf(a) - startsAtOf(b))
  const past = appointments
    .filter((appointment) => startsAtOf(appointment) < now)
    .sort((a, b) => startsAtOf(b) - startsAtOf(a))

  const handleCancel = async (appointment: AppointmentFormatType) => {
    setCancellingId(appointment.id)
    const result = await cancelAppointment(appointment)
    setCancellingId(undefined)

    if (result.ok) {
      toast.success("Consulta cancelada.")
      refetch()
    } else if (result.reason === "too-late") {
      toast.error("Faltam menos de 24h. Para cancelar, entre em contato com a clínica.")
    } else {
      toast.error("Não foi possível cancelar. Tente novamente.")
    }
  }

  const renderAppointment = (appointment: AppointmentFormatType) => {
    const status = appointment.status as keyof typeof statusColors
    const isUpcoming = startsAtOf(appointment) >= now
    const cancellable = canPatientCancel(appointment.startsAt, appointment.status)

    return (
      <Card key={appointment.id}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-4">
            <span>{appointment.professionalName.trim()}</span>
            <Badge className={statusColors[status] ?? "bg-gray-500"}>
              {statusLabels[status] ?? appointment.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
          <p className="text-sm text-gray-600">
            {format(fromDateKey(appointment.date), "dd/MM/yyyy")} às {appointment.time}
          </p>

          {isUpcoming && appointment.status !== "cancelada" && (
            <div className="mt-4">
              {cancellable ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  disabled={cancellingId === appointment.id}
                  onClick={() => handleCancel(appointment)}
                >
                  {cancellingId === appointment.id ? "Cancelando..." : "Cancelar"}
                </Button>
              ) : (
                <p className="text-sm text-gray-500">
                  Para cancelar com menos de 24h de antecedência, entre em contato com a clínica.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 md:mb-6 md:text-3xl">Minhas Consultas</h1>

        {isLoading && <p>Carregando...</p>}
        {isError && <p className="text-red-600">Não foi possível carregar suas consultas.</p>}
        {!isLoading && !isError && appointments.length === 0 && (
          <p className="text-gray-600">Você ainda não tem consultas agendadas.</p>
        )}

        {upcoming.length > 0 && (
          <section className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold">Próximas</h2>
            {upcoming.map(renderAppointment)}
          </section>
        )}

        {past.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Anteriores</h2>
            {past.map(renderAppointment)}
          </section>
        )}
      </div>
    </Layout>
  )
}
