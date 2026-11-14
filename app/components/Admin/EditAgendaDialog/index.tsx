"use client"

import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import toast from "react-hot-toast"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AgendaEditor, { Agenda } from "../AgendaEditor"
import { updateDoctorAgenda } from "@/firebase/appointmentServices"
import { Doctor } from "@/utils/types"

export default function EditAgendaDialog({
  doctor,
  onClose,
  onSaved,
}: {
  doctor: Doctor | null
  onClose: () => void
  onSaved: () => void
}) {
  const [agenda, setAgenda] = useState<Agenda>({ date: [], time: [] })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (doctor) setAgenda({ date: doctor.agenda?.date ?? [], time: doctor.agenda?.time ?? [] })
  }, [doctor])

  if (!doctor) return null

  const handleSave = async () => {
    if (agenda.date.length === 0 || agenda.time.length === 0) {
      toast.error("Escolha pelo menos uma data e um horário.")
      return
    }
    setIsSaving(true)
    const result = await updateDoctorAgenda(doctor.specialtyKey, doctor.doctorKey, agenda)
    setIsSaving(false)

    if (result.ok) {
      toast.success("Agenda atualizada.")
      onSaved()
      onClose()
    } else if (result.reason === "has-bookings") {
      const list = result.conflicts
        .slice(0, 3)
        .map((c) => `${format(parseISO(c.date), "dd/MM")} ${c.time}`)
        .join(", ")
      const more = result.conflicts.length > 3 ? ` e mais ${result.conflicts.length - 3}` : ""
      toast.error(`Há consultas marcadas em horários removidos (${list}${more}). Cancele-as antes.`, { duration: 6000 })
    } else {
      toast.error("Não foi possível salvar a agenda. Tente novamente.")
    }
  }

  return (
    <Dialog open={!!doctor} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agenda de {doctor.name.trim()}</DialogTitle>
          <DialogDescription>
            O paciente pode marcar em qualquer combinação das datas e horários escolhidos.
          </DialogDescription>
        </DialogHeader>
        <AgendaEditor value={agenda} onChange={setAgenda} />
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Fechar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-blueSecundary hover:bg-bluePrimary text-white">
            {isSaving ? "Salvando..." : "Salvar agenda"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
