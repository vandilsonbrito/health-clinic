import {
  bookingsOutsideAgenda,
  confirmedAppointmentsOn,
  countAppointmentsByMonth,
  doctorKeyFromName,
  generateTimeOptions,
  statsByPatient,
} from "@/utils/functions/adminStats";
import { AppointmentFormatType } from "@/utils/types";

const now = new Date(2026, 10, 14, 10, 0); // 14/11/2026 10:00

const appt = (overrides: Partial<AppointmentFormatType>): AppointmentFormatType => ({
  id: Math.random().toString(36).slice(2),
  specialty: "Cardiologia",
  professionalName: "Dr. Thiago Silva",
  date: "2026-11-14",
  time: "09:00",
  status: "confirmada",
  patientId: "p1",
  patientName: "Paciente",
  ...overrides,
});

describe("countAppointmentsByMonth", () => {
  it("conta consultas não canceladas pelos últimos 6 meses, inclusive o atual", () => {
    const result = countAppointmentsByMonth(
      [
        appt({ date: "2026-11-20", status: "pendente" }),
        appt({ date: "2026-11-02" }),
        appt({ date: "2026-11-03", status: "cancelada" }),
        appt({ date: "2026-06-10" }),
        appt({ date: "2026-05-31" }), // fora da janela
      ],
      now
    );
    expect(result).toEqual([
      { month: "2026-06", count: 1 },
      { month: "2026-07", count: 0 },
      { month: "2026-08", count: 0 },
      { month: "2026-09", count: 0 },
      { month: "2026-10", count: 0 },
      { month: "2026-11", count: 2 },
    ]);
  });
});

describe("confirmedAppointmentsOn", () => {
  it("filtra pela data completa (não só pelo dia do mês) e ordena por horário", () => {
    const result = confirmedAppointmentsOn(
      [
        appt({ date: "2026-11-14", time: "11:00" }),
        appt({ date: "2026-11-14", time: "08:00" }),
        appt({ date: "2026-10-14", time: "09:00" }),
        appt({ date: "2026-11-14", time: "10:00", status: "pendente" }),
      ],
      "2026-11-14"
    );
    expect(result.map((a) => a.time)).toEqual(["08:00", "11:00"]);
  });
});

describe("statsByPatient", () => {
  it("conta confirmadas e usa como última a mais recente que já aconteceu", () => {
    const result = statsByPatient(
      [
        appt({ patientId: "p1", date: "2026-10-01" }),
        appt({ patientId: "p1", date: "2026-11-14", time: "09:00" }),
        appt({ patientId: "p1", date: "2026-12-01" }), // futura: conta, mas não é "última"
        appt({ patientId: "p1", date: "2026-11-01", status: "cancelada" }),
        appt({ patientId: "p2", date: "2026-11-20", status: "pendente" }),
      ],
      now
    );
    expect(result).toEqual({ p1: { totalConfirmed: 3, lastAppointmentDate: "2026-11-14" } });
  });
});

describe("generateTimeOptions", () => {
  it("gera horários de 30 em 30 minutos", () => {
    expect(generateTimeOptions("07:00", "09:00")).toEqual(["07:00", "07:30", "08:00", "08:30", "09:00"]);
  });
});

describe("doctorKeyFromName", () => {
  it("remove título e acentos e usa hífens", () => {
    expect(doctorKeyFromName("Dra. Ana Lúcia  Melo ")).toBe("ana-lucia-melo");
    expect(doctorKeyFromName("Dr João Pedro")).toBe("joao-pedro");
    expect(doctorKeyFromName("Carla Souza")).toBe("carla-souza");
  });
});

describe("bookingsOutsideAgenda", () => {
  it("aponta reservas cuja data ou horário saíram da agenda", () => {
    const booked = { "2026-11-16": ["08:00", "09:00"], "2026-11-18": ["08:00"] };
    expect(bookingsOutsideAgenda(booked, { date: ["2026-11-16"], time: ["08:00"] })).toEqual([
      { date: "2026-11-16", time: "09:00" },
      { date: "2026-11-18", time: "08:00" },
    ]);
  });
});
