'use client'
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "@/app/components/Admin/Layout"
import { useDataFromDB } from "@/firebase/firebaseDBServices"
import { format, parseISO } from "date-fns"

interface Patient {
  profile: {
    name: string
    email: string
    cellphone: string
    cpf: string
    lastAppointmentDate: string
    totalOfAppointments: number
  }
}


export default function Patients() {

  const { data, isLoading, isError } = useDataFromDB({route: 'users', queryKey: 'registered-patients-data' })
  const [search, setSearch] = useState("")

  const registeredPatientsData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data);
  }, [data]);

  const filteredPatients = registeredPatientsData?.filter(
    (patient) =>
      (patient[1] as Patient).profile?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (patient[1] as Patient).profile?.email?.toLowerCase().includes(search.toLowerCase()) ||
      (patient[1] as Patient).profile?.cpf?.includes(search),
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
          { isLoading && <span className="mt-5">Carregando...</span> }
          { isError && <span className="mt-5">Erro ao carregar dados.</span> }
          { !isLoading && !isError && (
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
                  {filteredPatients?.map((patient, index) => (
                    <TableRow key={index}>
                      <TableCell>{(patient[1] as Patient).profile?.name}</TableCell>
                      <TableCell>{(patient[1] as Patient).profile?.email}</TableCell>
                      <TableCell>{(patient[1] as Patient).profile?.cellphone}</TableCell>
                      <TableCell>{(patient[1] as Patient).profile?.cpf}</TableCell>
                      <TableCell>
                        { 
                          (patient[1] as Patient).profile?.lastAppointmentDate
                            ? format(parseISO((patient[1] as Patient).profile?.lastAppointmentDate), 'dd/MM/yyyy')
                            : "Ainda não possui consulta confirmada"
                        }
                      </TableCell>
                      <TableCell>{(patient[1] as Patient).profile?.totalOfAppointments}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          ) }
          { filteredPatients?.length === 0 && <p className="mt-5 ml-4">Nenhum paciente encontrado.</p> }
      </div>
    </Layout>
  )
}

