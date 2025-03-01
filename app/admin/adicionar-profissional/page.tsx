"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/app/components/Admin/Layout"

// Exemplo de dados de médicos
const doctors = [
  {
    id: 1,
    name: "Dr. João Silva",
    specialty: "Cardiologia",
    crm: "123456",
    phone: "(11) 98765-4321",
    email: "joao.silva@example.com",
    schedule: "Segunda e Quarta, 8h-17h",
  },
  {
    id: 2,
    name: "Dra. Maria Santos",
    specialty: "Pediatria",
    crm: "234567",
    phone: "(11) 97654-3210",
    email: "maria.santos@example.com",
    schedule: "Terça e Quinta, 9h-18h",
  },
]

export default function Professionals() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    crm: "",
    phone: "",
    email: "",
    schedule: "",
  })

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDoctor({ ...newDoctor, [name]: value })
  }

  const handleSelectChange = (value: string) => {
    setNewDoctor({ ...newDoctor, specialty: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você adicionaria a lógica para salvar o novo médico no banco de dados
    console.log("Novo médico:", newDoctor)
    setShowForm(false)
    setNewDoctor({ name: "", specialty: "", crm: "", phone: "", email: "", schedule: "" })
  }

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between mb-6 lg:mb-10">
          <h1 className="text-[1.7rem] md:text-3xl font-bold">Cadastrar Profissionais</h1>
          <Button 
            className="mt-8 md:mt-0"
            onClick={() => setShowForm(!showForm)}
            >
            <Plus className="mr-2 h-4 w-4" /> Novo Profissional
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cadastrar Novo Médico</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" value={newDoctor.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                        <SelectItem value="Pediatria">Pediatria</SelectItem>
                        <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                        {/* Adicione mais especialidades conforme necessário */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crm">CRM</Label>
                    <Input id="crm" name="crm" value={newDoctor.crm} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" name="phone" value={newDoctor.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newDoctor.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Horários de Atendimento</Label>
                    <Input
                      id="schedule"
                      name="schedule"
                      value={newDoctor.schedule}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit">Cadastrar Médico</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar profissionais..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>CRM</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Horários de Atendimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.crm}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.schedule}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

