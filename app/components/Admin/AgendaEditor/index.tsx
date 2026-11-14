"use client"

import { startOfToday } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { generateTimeOptions } from "@/utils/functions/adminStats"
import { fromDateKey, sortTimes, toDateKey } from "@/utils/functions/scheduling"

export type Agenda = { date: string[]; time: string[] }

const TIME_OPTIONS = generateTimeOptions("07:00", "18:00", 30)

// Agenda = todas as datas escolhidas x todos os horários escolhidos.
export default function AgendaEditor({ value, onChange }: { value: Agenda; onChange: (agenda: Agenda) => void }) {
  const today = startOfToday()
  // Horários fora da grade padrão (ex.: 10:15 de agendas antigas) continuam visíveis.
  const timeOptions = sortTimes([...TIME_OPTIONS, ...value.time])

  const toggleTime = (time: string) => {
    const times = value.time.includes(time) ? value.time.filter((t) => t !== time) : [...value.time, time]
    onChange({ ...value, time: sortTimes(times) })
  }

  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <div>
        <p className="text-sm font-medium mb-2">Datas de atendimento ({value.date.length})</p>
        <Calendar
          mode="multiple"
          locale={ptBR}
          selected={value.date.map(fromDateKey)}
          onSelect={(days) => onChange({ ...value, date: (days ?? []).map(toDateKey).sort() })}
          disabled={{ before: today }}
          className="rounded-md border w-fit"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Horários em cada data ({value.time.length})</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {timeOptions.map((time) => {
            const selected = value.time.includes(time)
            return (
              <button
                key={time}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleTime(time)}
                className={cn(
                  "rounded-md border px-2 py-1 text-sm transition-colors",
                  selected ? "bg-blueSecundary text-white border-blueSecundary" : "bg-white hover:bg-gray-100"
                )}
              >
                {time}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
