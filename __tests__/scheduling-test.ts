import {
  canPatientCancel,
  getAvailableDates,
  getAvailableTimes,
  toStartsAt,
} from "@/utils/functions/scheduling";

const now = new Date(2026, 10, 14, 10, 0); // 14/11/2026 10:00 (horário local)

describe("getAvailableTimes", () => {
  const agendaTimes = ["09:30", "08:00", "11:00", "10:30", "08:00"];

  it("ordena, remove duplicados e esconde horários reservados", () => {
    expect(getAvailableTimes(agendaTimes, ["10:30"], "2026-11-20", now)).toEqual([
      "08:00",
      "09:30",
      "11:00",
    ]);
  });

  it("no dia de hoje esconde horários que já passaram", () => {
    expect(getAvailableTimes(agendaTimes, [], "2026-11-14", now)).toEqual(["10:30", "11:00"]);
  });

  it("em data passada não sobra nenhum horário", () => {
    expect(getAvailableTimes(agendaTimes, [], "2026-11-13", now)).toEqual([]);
  });
});

describe("getAvailableDates", () => {
  it("mantém só datas com algum horário no futuro, em ordem", () => {
    const dates = ["2026-11-20", "2026-11-13", "2026-11-14", "2026-11-20"];
    expect(getAvailableDates(dates, ["08:00", "11:00"], now)).toEqual(["2026-11-14", "2026-11-20"]);
  });

  it("hoje some quando o último horário já passou", () => {
    expect(getAvailableDates(["2026-11-14"], ["08:00", "09:30"], now)).toEqual([]);
  });

  it("sem horários na agenda não há datas", () => {
    expect(getAvailableDates(["2026-11-20"], [], now)).toEqual([]);
  });
});

describe("canPatientCancel", () => {
  it("permite com mais de 24h de antecedência", () => {
    expect(canPatientCancel(toStartsAt("2026-11-15", "10:01"), "pendente", now)).toBe(true);
  });

  it("bloqueia com 24h ou menos", () => {
    expect(canPatientCancel(toStartsAt("2026-11-15", "10:00"), "pendente", now)).toBe(false);
    expect(canPatientCancel(toStartsAt("2026-11-14", "15:00"), "confirmada", now)).toBe(false);
  });

  it("bloqueia consulta já cancelada ou sem horário (registros antigos)", () => {
    expect(canPatientCancel(toStartsAt("2026-12-01", "10:00"), "cancelada", now)).toBe(false);
    expect(canPatientCancel(undefined, "pendente", now)).toBe(false);
  });
});
