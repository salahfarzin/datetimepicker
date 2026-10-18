import { describe, expect, it } from "vitest";
import { displayValue, formatCalendarDate, formatValue, parseValue, toBound, toIsoString, toLatinDigits } from "../calendars";

describe("parseValue / formatValue", () => {
  it("round-trips an ISO value through every calendar", () => {
    for (const calendar of ["gregorian", "jalali", "kurdish"] as const) {
      for (const language of ["fa", "ckb", "kmr"]) {
        const parsed = parseValue("2026-10-18", { calendar, language });
        expect(parsed && formatValue(parsed, { calendar, language })).toBe("2026-10-18");
      }
    }
  });

  it("keeps the time", () => {
    const parsed = parseValue("2026-10-18T09:05", { calendar: "jalali" })!;
    expect(formatValue(parsed, { calendar: "jalali" }, true)).toBe("2026-10-18T09:05");
  });

  it("reads and writes Jalali strings in calendar mode, in Latin digits", () => {
    const options = { calendar: "jalali", valueFormat: "calendar", format: "jYYYY/jMM/jDD" } as const;
    const parsed = parseValue("۱۴۰۵/۰۷/۲۶", options)!;
    expect(toIsoString(parsed.toDate())).toBe("2026-10-18");
    expect(formatValue(parsed, options)).toBe("1405/07/26");
    expect(formatValue(parsed, options, true)).toBe("1405/07/26T00:00");
  });

  it("reads a dashed Jalali value as Jalali when the format is dashed too", () => {
    const parsed = parseValue("1405-07-26", { calendar: "jalali", valueFormat: "calendar", format: "YYYY-MM-DD" })!;
    expect(toIsoString(parsed.toDate())).toBe("2026-10-18");
  });

  it("reads a dashed value with a Gregorian year as Gregorian, even with a dashed calendar format", () => {
    const jalali = parseValue("2026-10-18", { calendar: "jalali", valueFormat: "calendar", format: "YYYY-MM-DD" })!;
    expect(toIsoString(jalali.toDate())).toBe("2026-10-18");
    const kurmanji = parseValue("2026-10-18", { calendar: "kurdish", language: "kmr", valueFormat: "calendar", format: "YYYY-MM-DD" })!;
    expect(toIsoString(kurmanji.toDate())).toBe("2026-10-18");
    const kurmanjiYear = parseValue("2726-10-18", { calendar: "kurdish", language: "kmr", valueFormat: "calendar", format: "YYYY-MM-DD" })!;
    expect(toIsoString(kurmanjiYear.toDate())).toBe("2026-10-18");
  });

  it("still reads an ISO value as Gregorian when the calendar format uses slashes", () => {
    const parsed = parseValue("2026-10-18", { calendar: "jalali", valueFormat: "calendar", format: "YYYY/MM/DD" })!;
    expect(toIsoString(parsed.toDate())).toBe("2026-10-18");
  });

  it("returns null for what it can't read", () => {
    expect(parseValue("", {})).toBeNull();
    expect(parseValue("not a date", {})).toBeNull();
    expect(parseValue("1405/07/26", { calendar: "jalali" })).toBeNull(); // ISO mode expects ISO
  });

  it("writes Gregorian values as ISO even in calendar mode", () => {
    const parsed = parseValue("2026-10-18", { valueFormat: "calendar", format: "DD.MM.YYYY" })!;
    expect(formatValue(parsed, { valueFormat: "calendar", format: "DD.MM.YYYY" })).toBe("2026-10-18");
  });
});

describe("toBound", () => {
  it("reads Date, ISO and (in calendar mode) calendar strings", () => {
    const iso = toBound("2026-10-18", { calendar: "kurdish", language: "ckb" })!;
    expect(toIsoString(iso.toDate())).toBe("2026-10-18");
    const jalali = toBound("1405/07/26", { calendar: "jalali", valueFormat: "calendar" })!;
    expect(toIsoString(jalali.toDate())).toBe("2026-10-18");
    const date = toBound(new Date(2026, 9, 18), { calendar: "jalali" })!;
    expect(date.format("YYYY/MM/DD")).toBe("۱۴۰۵/۰۷/۲۶");
    expect(toBound(undefined)).toBeUndefined();
    expect(toBound("")).toBeUndefined();
  });
});

describe("display", () => {
  it("shows a value in the calendar and locale digits", () => {
    expect(displayValue("1990-03-21", { calendar: "jalali" })).toBe("۱۳۶۹/۰۱/۰۱");
    expect(displayValue("2026-10-18", { calendar: "kurdish", language: "ckb" })).toBe("٢٧٢٦/٠٧/٢٦");
    expect(displayValue("2026-03-21", { calendar: "kurdish", language: "kmr", format: "YYYY-MM-DD" })).toBe("2726-03-21");
    expect(displayValue("2026-10-18", { format: "DD.MM.YYYY" })).toBe("18.10.2026");
    expect(displayValue("garbage", {})).toBe("garbage");
  });

  it("formatCalendarDate converts Gregorian dates and timestamps", () => {
    expect(formatCalendarDate("2026-10-18", "jalali", "YYYY/MM/DD", "fa")).toBe("۱۴۰۵/۰۷/۲۶");
    expect(formatCalendarDate("2026-10-18", "gregorian", "DD/MM/YYYY")).toBe("18/10/2026");
    expect(formatCalendarDate("nope", "jalali", "YYYY/MM/DD")).toBe("nope");
  });

  it("toLatinDigits handles Persian and Arabic-Indic digits", () => {
    expect(toLatinDigits("۱۴۰۵/٠٧/26")).toBe("1405/07/26");
  });
});

describe("formatCalendarDate without a format", () => {
  it("falls back to react-date-object's default", () => {
    expect(formatCalendarDate("2026-10-18", "jalali")).toBe("۱۴۰۵/۰۷/۲۶");
  });
});
