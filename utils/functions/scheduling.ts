import { format, parse } from "date-fns";

// Regras de agenda (funções puras, sem Firebase, para facilitar testes).
// Datas no formato "yyyy-MM-dd" e horários "HH:mm", no fuso do navegador.

export const CANCEL_LIMIT_MS = 24 * 60 * 60 * 1000;

export function toStartsAt(date: string, time: string): number {
  return parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date()).getTime();
}

export function sortTimes(times: string[] = []): string[] {
  return Array.from(new Set(times)).sort();
}

// Horários do médico numa data: tira os já reservados e os que já passaram.
export function getAvailableTimes(
  agendaTimes: string[] = [],
  bookedTimes: string[] = [],
  date: string,
  now: Date = new Date()
): string[] {
  const booked = new Set(bookedTimes);
  return sortTimes(agendaTimes).filter(
    (time) => !booked.has(time) && toStartsAt(date, time) > now.getTime()
  );
}

// Datas da agenda que ainda têm pelo menos um horário no futuro.
export function getAvailableDates(
  agendaDates: string[] = [],
  agendaTimes: string[] = [],
  now: Date = new Date()
): string[] {
  const sortedTimes = sortTimes(agendaTimes);
  const latestTime = sortedTimes[sortedTimes.length - 1];
  if (!latestTime) return [];

  return Array.from(new Set(agendaDates))
    .filter((date) => toStartsAt(date, latestTime) > now.getTime())
    .sort();
}

export function canPatientCancel(
  startsAt: number | undefined,
  status: string,
  now: Date = new Date()
): boolean {
  if (!startsAt || status === "cancelada") return false;
  return startsAt - now.getTime() > CANCEL_LIMIT_MS;
}

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function fromDateKey(date: string): Date {
  return parse(date, "yyyy-MM-dd", new Date());
}
