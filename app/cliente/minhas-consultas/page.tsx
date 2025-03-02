import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Cliente/Layout"

const appointments = [
  {
    id: 1,
    doctor: "Dra. Maria Santos",
    specialty: "Cardiologia",
    date: "2024-03-15",
    time: "09:00",
    status: "confirmada",
  },
  { id: 2, doctor: "Dr. João Silva", specialty: "Pediatria", date: "2024-03-20", time: "14:00", status: "pendente" },
  { id: 3, doctor: "Dra. Ana Oliveira", specialty: "Ortopedia", date: "2024-03-25", time: "11:00", status: "cancelada"},
  { id: 4, doctor: "Dr. João Silva", specialty: "Pediatria", date: "2024-03-20", time: "14:00", status: "pendente" },
  { id: 5, doctor: "Dr. João Silva", specialty: "Pediatria", date: "2024-03-20", time: "14:00", status: "pendente" },
  { id: 6, doctor: "Dr. João Silva", specialty: "Pediatria", date: "2024-03-20", time: "14:00", status: "pendente" }
]

const statusColors = {
  confirmada: "bg-green-500",
  pendente: "bg-yellow-500",
  cancelada: "bg-red-500",
}

export default function MyAppointments() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 md:mb-6 md:text-3xl">Minhas Consultas</h1>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{appointment.doctor}</span>
                  <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                    {appointment.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {new Date(appointment.date).toLocaleDateString()} às {appointment.time}
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Remarcar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

