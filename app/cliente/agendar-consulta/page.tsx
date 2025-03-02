"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Cliente/Layout"

const doctors = [
  { id: 1, name: "Dra. Maria Santos", specialty: "Cardiologia" },
  { id: 2, name: "Dr. João Silva", specialty: "Pediatria" },
  { id: 3, name: "Dra. Ana Oliveira", specialty: "Ortopedia" },
]

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

export default function ScheduleAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const handleSchedule = () => {
    // Aqui você implementaria a lógica para agendar a consulta
    console.log("Agendamento:", { selectedDate, selectedDoctor, selectedTime })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 md:text-3xl">Agendar Consulta</h1>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecione o Médico</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um médico" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selecione a Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
             </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selecione o Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedTime} value={selectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Button
            onClick={handleSchedule}
            className="w-full md:w-auto bg-blueSecundary hover:bg-bluePrimary text-white"
            disabled={!selectedDoctor || !selectedDate || !selectedTime}
          >
            Agendar Consulta
          </Button>
        </div>
      </div>
    </Layout>
  )
}

