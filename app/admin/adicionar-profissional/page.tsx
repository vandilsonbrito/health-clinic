"use client"
import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Layout from "@/app/components/Admin/Layout"
import { useDataFromDB } from "@/firebase/firebaseDBServices"
import FormNewDoctor from "@/app/components/Admin/FormNewDoctor"
import { Toaster } from "react-hot-toast"

type Schedule = {
  date: string[];
  time: string[];
};

type Doctor = {
  agenda: Schedule;
  specialty: string;
  name: string;
  crm: string;
  phone: string;
  email: string;
  id: number;
};

type DoctorsData = Record<string, Record<string, Doctor>>;

export default function Doctors() {

  const { data, refetch, isLoading, isError } = useDataFromDB({ route: "services/consultation", queryKey: "doctors-data" })
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  
  
  const doctorsData: Doctor[] = useMemo(() => {
    if (!data) return [];
  
    return Object.values(data as DoctorsData).flatMap(specialty => Object.values(specialty));
  }, [data]);
  console.log('doctorsData', doctorsData);
  

  const filteredDoctors = doctorsData && doctorsData.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Layout>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between mb-6 lg:mb-10">
          <h1 className="text-[1.7rem] md:text-3xl font-bold">Cadastrar Profissionais</h1>
          <Button 
            className="mt-8 md:mt-0 bg-blueSecundary hover:bg-bluePrimary text-white"
            onClick={() => setShowForm(!showForm)}
            >
            {showForm ? "Cancelar" : (<><Plus className="mr-2 h-4 w-4" />Novo Profissional</>)}         
          </Button>
        </div>

        {showForm && (
          <FormNewDoctor setShowForm={setShowForm} refetch={refetch}/>
        )}

        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar profissionais..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        { isLoading && <span className="mt-5 ml-3">Carregando...</span> }
        { isError && <span className="mt-5">Erro ao carregar dados.</span> }
        { !isLoading && !isError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>CRM</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                {/* <TableHead>Horários de Atendimento</TableHead> */}
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {filteredDoctors?.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.crm}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  {/* <TableCell>{doctor.agenda}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Layout>
  )
}

