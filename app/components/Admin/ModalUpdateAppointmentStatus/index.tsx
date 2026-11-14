"use client"

import { useState } from "react"
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
import { adminCancelAppointment, confirmAppointment } from "@/firebase/appointmentServices"
import { AppointmentFormatType } from "@/utils/types"

interface ModalUpdateAppointmentStatusProps {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  selectedAppointment: AppointmentFormatType | null
  onUpdated: () => void
}

export default function ModalUpdateAppointmentStatus({
  isModalOpen,
  setIsModalOpen,
  selectedAppointment,
  onUpdated,
}: ModalUpdateAppointmentStatusProps) {
  const [action, setAction] = useState<"confirm" | "cancel">()

  if (!selectedAppointment) return null

  const isPending = selectedAppointment.status === "pendente"

  const run = async (kind: "confirm" | "cancel") => {
    setAction(kind)
    const ok =
      kind === "confirm"
        ? await confirmAppointment(selectedAppointment)
        : await adminCancelAppointment(selectedAppointment)
    setAction(undefined)

    if (!ok) {
      toast.error("Não foi possível atualizar a consulta. Tente novamente.")
      return
    }
    toast.success(kind === "confirm" ? "Consulta confirmada." : isPending ? "Consulta recusada." : "Consulta cancelada.")
    setIsModalOpen(false)
    onUpdated()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isPending ? "Revisar consulta" : "Cancelar consulta"}</DialogTitle>
          <DialogDescription>
            {isPending
              ? "Confirme a consulta ou recuse para liberar o horário."
              : "Ao cancelar, o horário volta a ficar disponível para outros pacientes."}
          </DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-gray-500">Paciente</dt>
          <dd>{selectedAppointment.patientName}</dd>
          <dt className="text-gray-500">Profissional</dt>
          <dd>{selectedAppointment.professionalName}</dd>
          <dt className="text-gray-500">Especialidade</dt>
          <dd>{selectedAppointment.specialty}</dd>
          <dt className="text-gray-500">Data</dt>
          <dd>
            {selectedAppointment.date ? format(parseISO(selectedAppointment.date), "dd/MM/yyyy") : ""} às{" "}
            {selectedAppointment.time}
          </dd>
        </dl>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700"
            disabled={!!action}
            onClick={() => run("cancel")}
          >
            {action === "cancel" ? "Salvando..." : isPending ? "Recusar" : "Cancelar consulta"}
          </Button>
          {isPending && (
            <Button
              className="bg-blueSecundary hover:bg-bluePrimary text-white"
              disabled={!!action}
              onClick={() => run("confirm")}
            >
              {action === "confirm" ? "Salvando..." : "Confirmar"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
