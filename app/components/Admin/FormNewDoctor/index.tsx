"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { withMask } from "use-mask-input"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import AgendaEditor, { Agenda } from "../AgendaEditor"
import { saveNewDoctor, useSpecialties } from "@/firebase/appointmentServices"

const onlyDigits = (value: string) => value.replace(/\D/g, "")

const doctorSchema = z.object({
  name: z.string().trim().min(5, { message: "Informe o nome completo (ex.: Dra. Ana Melo)" }).max(60),
  specialtyKey: z.string().min(1, { message: "Escolha a especialidade" }),
  crm: z.string().trim().min(4, { message: "CRM inválido" }).max(20),
  phone: z.string().refine((value) => onlyDigits(value).length === 11, { message: "Telefone precisa ter 11 dígitos" }),
  email: z.string().email({ message: "E-mail inválido" }),
  pix_key: z.string().max(80).optional(),
})

type DoctorForm = z.infer<typeof doctorSchema>

export default function FormNewDoctor({
  setShowForm,
  refetch,
}: {
  setShowForm: (show: boolean) => void
  refetch: () => void
}) {
  const { data: specialties = [] } = useSpecialties()
  const [agenda, setAgenda] = useState<Agenda>({ date: [], time: [] })
  const [agendaError, setAgendaError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<DoctorForm>({
    resolver: zodResolver(doctorSchema),
    defaultValues: { name: "", specialtyKey: "", crm: "", phone: "", email: "", pix_key: "" },
  })

  async function onSubmit(values: DoctorForm) {
    if (agenda.date.length === 0 || agenda.time.length === 0) {
      setAgendaError("Escolha pelo menos uma data e um horário.")
      return
    }
    setAgendaError("")
    setIsSaving(true)

    const specialty = specialties.find((s) => s.key === values.specialtyKey)
    const result = await saveNewDoctor({
      ...values,
      specialty: specialty?.label ?? values.specialtyKey,
      agenda,
    })
    setIsSaving(false)

    if (result.ok) {
      toast.success("Profissional cadastrado.")
      refetch()
      setShowForm(false)
    } else if (result.reason === "already-exists") {
      toast.error("Já existe um profissional com esse nome nessa especialidade.")
    } else if (result.reason === "invalid-name") {
      toast.error("Nome inválido.")
    } else {
      toast.error("Não foi possível cadastrar. Tente novamente.")
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Novo profissional</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Dra. Ana Melo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialtyKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha a especialidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.key} value={specialty.key}>
                            {specialty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="crm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CRM</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl ref={withMask("(99) 99999-9999")}>
                      <Input placeholder="(11) 98765-4321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="ana.melo@clinica.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pix_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave PIX (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="CPF, e-mail ou telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <AgendaEditor value={agenda} onChange={setAgenda} />
              {agendaError && <p className="mt-2 text-sm font-medium text-red-600">{agendaError}</p>}
            </div>

            <Button type="submit" disabled={isSaving} className="bg-blueSecundary hover:bg-bluePrimary text-white">
              {isSaving ? "Salvando..." : "Cadastrar profissional"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
