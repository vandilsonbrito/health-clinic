"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import toast from "react-hot-toast"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Layout from "../../components/Cliente/Layout"
import { useAuth } from "@/firebase/authContext"
import { useDataFromDB } from "@/firebase/firebaseDBServices"
import { bookAppointment, useBookedTimes, useDoctors } from "@/firebase/appointmentServices"
import { isProfileInfoFilled } from "@/utils/functions/isProfileInfoFilled"
import { fromDateKey, getAvailableDates, getAvailableTimes, toDateKey } from "@/utils/functions/scheduling"
import { UserProfileData } from "@/utils/types"

export default function ScheduleAppointment() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { userAuth } = useAuth()

  const { data: profile, isLoading: isProfileLoading } = useDataFromDB({
    route: "users/" + userAuth?.uid + "/profile",
    queryKey: "user-profile-data",
  })
  const { data: doctors = [], isLoading: isDoctorsLoading, isError: isDoctorsError } = useDoctors()

  const [specialtyKey, setSpecialtyKey] = useState("")
  const [doctorKey, setDoctorKey] = useState("")
  const [selectedDate, setSelectedDate] = useState<string>()
  const [selectedTime, setSelectedTime] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const specialties = useMemo(() => {
    const unique = new Map<string, string>()
    doctors.forEach((doctor) => unique.set(doctor.specialtyKey, doctor.specialty))
    return Array.from(unique, ([key, label]) => ({ key, label }))
  }, [doctors])

  const doctorsOfSpecialty = doctors.filter((doctor) => doctor.specialtyKey === specialtyKey)
  const selectedDoctor = doctorsOfSpecialty.find((doctor) => doctor.doctorKey === doctorKey)

  const availableDates = useMemo(
    () => getAvailableDates(selectedDoctor?.agenda?.date, selectedDoctor?.agenda?.time),
    [selectedDoctor]
  )
  const availableDateSet = useMemo(() => new Set(availableDates), [availableDates])

  const { data: bookedTimes = [], isFetching: isTimesLoading, refetch: refetchBookedTimes } =
    useBookedTimes(selectedDoctor, selectedDate)
  const availableTimes = selectedDate
    ? getAvailableTimes(selectedDoctor?.agenda?.time, bookedTimes, selectedDate)
    : []

  const handleSpecialtyChange = (value: string) => {
    setSpecialtyKey(value)
    const onlyDoctor = doctors.filter((doctor) => doctor.specialtyKey === value)
    setDoctorKey(onlyDoctor.length === 1 ? onlyDoctor[0].doctorKey : "")
    setSelectedDate(undefined)
    setSelectedTime("")
  }

  const handleDoctorChange = (value: string) => {
    setDoctorKey(value)
    setSelectedDate(undefined)
    setSelectedTime("")
  }

  const handleDateSelect = (day: Date | undefined) => {
    setSelectedDate(day ? toDateKey(day) : undefined)
    setSelectedTime("")
    setIsCalendarOpen(false)
  }

  const handleSchedule = async () => {
    if (!userAuth || !selectedDoctor || !selectedDate || !selectedTime) return
    setIsSubmitting(true)

    const result = await bookAppointment({
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      patientId: userAuth.uid,
      patientName: (profile as UserProfileData)?.name || userAuth.displayName || userAuth.email || "Paciente",
    })

    setIsSubmitting(false)

    if (result.ok) {
      toast.success("Consulta agendada! Aguarde a confirmação da clínica.")
      queryClient.invalidateQueries({ queryKey: ["user-appointments-data"] })
      router.push("/cliente/minhas-consultas")
      return
    }

    if (result.reason === "slot-taken") {
      toast.error("Esse horário acabou de ser reservado. Escolha outro.")
      setSelectedTime("")
      refetchBookedTimes()
      return
    }

    toast.error("Não foi possível agendar. Tente novamente.")
  }

  if (isProfileLoading || isDoctorsLoading) {
    return (
      <Layout>
        <p className="text-lg p-8">Carregando...</p>
      </Layout>
    )
  }

  if (!profile || !isProfileInfoFilled(profile as UserProfileData)) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 md:text-3xl">Agendar Consulta</h1>
          <Card>
            <CardHeader>
              <CardTitle>Complete seu perfil para agendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Precisamos do seu CPF, telefone e endereço antes de marcar uma consulta.
              </p>
              <Button asChild className="bg-blueSecundary hover:bg-bluePrimary text-white">
                <Link href="/cliente/atualizar-perfil">Atualizar perfil</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 md:text-3xl">Agendar Consulta</h1>

        {isDoctorsError && (
          <p className="mb-4 text-red-600">Não foi possível carregar os profissionais. Recarregue a página.</p>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Especialidade e profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={handleSpecialtyChange} value={specialtyKey}>
                <SelectTrigger aria-label="Especialidade">
                  <SelectValue placeholder="Escolha uma especialidade" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.key} value={specialty.key}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={handleDoctorChange} value={doctorKey} disabled={!specialtyKey}>
                <SelectTrigger aria-label="Profissional">
                  <SelectValue placeholder="Escolha o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {doctorsOfSpecialty.map((doctor) => (
                    <SelectItem key={doctor.doctorKey} value={doctor.doctorKey}>
                      {doctor.name.trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Data</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDoctor && availableDates.length === 0 ? (
                <p className="text-gray-600">Este profissional não tem datas disponíveis no momento.</p>
              ) : (
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={!selectedDoctor}
                      className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(fromDateKey(selectedDate), "dd/MM/yyyy (EEEE)", { locale: ptBR }) : <span>Escolha uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDate ? fromDateKey(selectedDate) : undefined}
                      onSelect={handleDateSelect}
                      defaultMonth={availableDates[0] ? fromDateKey(availableDates[0]) : undefined}
                      disabled={(day) => !availableDateSet.has(toDateKey(day))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Horário</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && !isTimesLoading && availableTimes.length === 0 ? (
                <p className="text-gray-600">Não há horários livres nesta data. Escolha outra.</p>
              ) : (
                <Select onValueChange={setSelectedTime} value={selectedTime} disabled={!selectedDate || isTimesLoading}>
                  <SelectTrigger aria-label="Horário">
                    <SelectValue placeholder={isTimesLoading ? "Carregando horários..." : "Escolha um horário"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>

          {selectedDoctor && selectedDate && selectedTime && (
            <p className="text-gray-700">
              <strong>{selectedDoctor.name.trim()}</strong> ({selectedDoctor.specialty}) em{" "}
              <strong>{format(fromDateKey(selectedDate), "dd/MM/yyyy")}</strong> às <strong>{selectedTime}</strong>
            </p>
          )}

          <Button
            onClick={handleSchedule}
            className="w-full md:w-auto bg-blueSecundary hover:bg-bluePrimary text-white"
            disabled={!selectedDoctor || !selectedDate || !selectedTime || isSubmitting}
          >
            {isSubmitting ? "Agendando..." : "Confirmar agendamento"}
          </Button>
        </div>
      </div>
    </Layout>
  )
}
