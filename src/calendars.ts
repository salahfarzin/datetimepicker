import DateObject from "./dateObject";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";

/** The calendar dates are shown and picked in. */
export type CalendarType = "gregorian" | "jalali" | "kurdish";

/**
 * How `value`, `onChange` and string `minDate`/`maxDate` are written:
 * - "iso": Gregorian "YYYY-MM-DD" (plus "THH:mm" with time), whatever the
 *   calendar shown. What an API usually stores.
 * - "calendar": in the shown calendar and `format`, e.g. "1405/07/26" for
 *   Jalali. Same as "iso" for the Gregorian calendar.
 */
export type ValueFormat = "iso" | "calendar";

type Calendar = typeof persian;
type Locale = typeof persian_fa;

/** What the calendar helpers need to read and write a value. */
export interface CalendarOptions {
  calendar?: CalendarType;
  /** UI language. Only picks the Kurdish variant today: "kmr" is Kurmanji, anything else Sorani. */
  language?: string;
  /** Date format for "calendar" values and display, e.g. "YYYY/MM/DD". moment-jalaali's "j" prefixes (jYYYY) are ignored. */
  format?: string;
  valueFormat?: ValueFormat;
}

/**
 * A base calendar counted from another year zero: same months, leap years
 * and days, only the year number moves by `offset`.
 */
function withYearOffset(base: Calendar, name: string, offset: number, overrides: Partial<Calendar> = {}): Calendar {
  type DateParts = Parameters<Calendar["getAllDays"]>[0];
  const shift = (date: DateParts) => ({ year: date.year - offset, month: date.month, day: date.day }) as DateParts;
  return {
    ...base,
    ...overrides,
    name,
    isLeap: (year: number) => base.isLeap(year - offset),
    getLeaps: (year: number) => base.getLeaps(year - offset)?.map((leap: number) => leap + offset),
    getDayOfYear: (date: DateParts) => base.getDayOfYear(shift(date)),
    // Days since the base epoch, so convert() and toDate() line up with it.
    getAllDays: (date: DateParts) => base.getAllDays(shift(date)),
    guessYear: (days: number, currentYear: number) => base.guessYear(days, currentYear - offset) + offset,
  };
}

/**
 * Sorani: the solar calendar Persian uses (the year starts at Newroz, same
 * month lengths and leap years), counted from the Median era:
 * Kurdish year = Solar Hijri year + 1321, so 1405 is 2726.
 */
export const KURDISH_YEAR_OFFSET = 1321;
export const kurdish = withYearOffset(persian, "kurdish", KURDISH_YEAR_OFFSET);

/**
 * Kurmanji: Gregorian months under their Kurmanji names, with the Kurdish
 * year as Gregorian + 700 (2026 is 2726). Weeks start on Monday.
 */
export const KURMANJI_YEAR_OFFSET = 700;
export const kurdishGregorian = withYearOffset(gregorian as unknown as Calendar, "kurdish_gregorian", KURMANJI_YEAR_OFFSET, {
  weekStartDayIndex: 2,
});

/** Sorani: Kurdish month names, Saturday-first week, Eastern Arabic digits. */
export const kurdish_ckb: Locale = {
  name: "kurdish_ckb",
  months: [
    ["خاکەلێوە", "خاک"],
    ["گوڵان", "گوڵ"],
    ["جۆزەردان", "جۆز"],
    ["پووشپەڕ", "پووش"],
    ["گەلاوێژ", "گەل"],
    ["خەرمانان", "خەر"],
    ["ڕەزبەر", "ڕەز"],
    ["گەڵاڕێزان", "گەڵا"],
    ["سەرماوەز", "سەر"],
    ["بەفرانبار", "بەف"],
    ["ڕێبەندان", "ڕێب"],
    ["ڕەشەمێ", "ڕەش"],
  ],
  weekDays: [
    ["شەممە", "ش"],
    ["یەکشەممە", "ی"],
    ["دووشەممە", "د"],
    ["سێشەممە", "س"],
    ["چوارشەممە", "چ"],
    ["پێنجشەممە", "پ"],
    ["هەینی", "هـ"],
  ],
  digits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
  meridiems: [
    ["پێش نیوەڕۆ", "پ.ن"],
    ["دوای نیوەڕۆ", "د.ن"],
  ],
};

/** Kurmanji: the Gregorian months' Kurmanji names, Latin digits. */
export const kurdish_kmr: Locale = {
  name: "kurdish_kmr",
  months: [
    ["Kanûna duyem", "Kdu"],
    ["Sibat", "Sib"],
    ["Adar", "Ada"],
    ["Nîsan", "Nîs"],
    ["Gulan", "Gul"],
    ["Hezîran", "Hez"],
    ["Tîrmeh", "Tîr"],
    ["Tebax", "Teb"],
    ["Îlon", "Îlo"],
    ["Cotmeh", "Cot"],
    ["Mijdar", "Mij"],
    ["Kanûn", "Kan"],
  ],
  weekDays: [
    ["Şemî", "Şe"],
    ["Yekşem", "Ye"],
    ["Duşem", "Du"],
    ["Sêşem", "Sê"],
    ["Çarşem", "Ça"],
    ["Pêncşem", "Pê"],
    ["În", "În"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["Berî nîvro", "BN"],
    ["Piştî nîvro", "PN"],
  ],
};

export interface PickerCalendar {
  calendar: Calendar;
  locale: Locale;
}

/** The react-date-object calendar and locale a calendar type (and, for Kurdish, a language) picks dates in. */
export function pickerCalendar(type: CalendarType = "gregorian", language?: string): PickerCalendar {
  if (type === "jalali") return { calendar: persian, locale: persian_fa };
  if (type === "kurdish") {
    return language === "kmr" ? { calendar: kurdishGregorian, locale: kurdish_kmr } : { calendar: kurdish, locale: kurdish_ckb };
  }
  return { calendar: gregorian as unknown as Calendar, locale: gregorian_en as unknown as Locale };
}

/** Western digits from Persian (۰-۹) or Arabic-Indic (٠-٩) ones. */
export const toLatinDigits = (str: string) =>
  str.replaceAll(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replaceAll(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;
const LATIN_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const pad = (n: number) => String(n).padStart(2, "0");

/** `format` without moment-jalaali's "j" prefixes, or the calendar's default. */
export function dateFormatOf({ calendar = "gregorian", format }: CalendarOptions): string {
  if (format) return format.replaceAll("j", "");
  return calendar === "gregorian" ? "YYYY-MM-DD" : "YYYY/MM/DD";
}

/** Whether strings are in the shown calendar (only meaningful off Gregorian). */
const readsCalendarStrings = ({ calendar = "gregorian", valueFormat = "iso" }: CalendarOptions) =>
  valueFormat === "calendar" && calendar !== "gregorian";

/** "YYYY-MM-DD" (and "THH:mm") of a native Date, in local time. */
export function toIsoString(date: Date, withTime = false): string {
  const iso = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return withTime ? `${iso}T${pad(date.getHours())}:${pad(date.getMinutes())}` : iso;
}

/** Local midnight of an ISO date ("YYYY-MM-DD..."): new Date("YYYY-MM-DD") is UTC and can land on the previous day west of Greenwich. */
function localDate(iso: string): Date {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * In "calendar" mode, whether an ISO-looking "YYYY-MM-DD" is really a
 * Gregorian date (a default from an API, say): the format uses another
 * separator, or the year can't be one of the calendar's - Jalali years are
 * around 1300-1500 and Sorani Kurdish ones around 2700 today.
 */
function isGregorianLooking(datePart: string, format: string, { calendar }: CalendarOptions): boolean {
  if (!format.includes("-")) return true;
  const year = Number(datePart.slice(0, 4));
  if (calendar === "jalali") return year > 1700;
  // Kurmanji counts Gregorian years + 700, Sorani Solar Hijri + 1321: both 2600+.
  if (calendar === "kurdish") return year < 2500;
  return false;
}

/**
 * Reads a value in the picker's calendar. "iso" values are Gregorian;
 * "calendar" values are in `format`, except an ISO-looking value that is
 * plainly Gregorian (see isGregorianLooking). Returns null when it can't be read.
 */
export function parseValue(value: string, options: CalendarOptions = {}): DateObject | null {
  if (!value) return null;
  const { calendar, locale } = pickerCalendar(options.calendar, options.language);
  const normalized = toLatinDigits(value.trim());
  const [datePart, timePart] = normalized.split("T");
  const format = dateFormatOf(options);

  let parsed: DateObject;
  const looksIso = ISO_DATE.test(datePart);
  if (readsCalendarStrings(options) && !(looksIso && isGregorianLooking(datePart, format, options))) {
    parsed = new DateObject({ date: datePart, format, calendar, locale });
  } else if (looksIso) {
    parsed = new DateObject({ date: localDate(datePart), calendar, locale });
  } else {
    return null;
  }

  if (!parsed.isValid) return null;
  if (timePart) {
    const [h, m] = timePart.split(":").map(Number);
    parsed.setHour(h || 0);
    parsed.setMinute(m || 0);
  }
  return parsed;
}

/** A min/max bound in the picker's calendar: a Date, or a string read like a value. */
export function toBound(bound: Date | string | null | undefined, options: CalendarOptions = {}): DateObject | undefined {
  if (!bound) return undefined;
  if (typeof bound === "string") return parseValue(bound, options) ?? undefined;
  const { calendar, locale } = pickerCalendar(options.calendar, options.language);
  return new DateObject({ date: bound, calendar, locale });
}

/** The string `onChange` gets for a picked date. */
export function formatValue(date: DateObject, options: CalendarOptions = {}, withTime = false): string {
  if (readsCalendarStrings(options)) {
    const copy = new DateObject(date);
    // Standard digits for storage, whatever the display locale.
    copy.digits = LATIN_DIGITS;
    const format = dateFormatOf(options);
    return copy.format(withTime ? `${format}THH:mm` : format);
  }
  // .format() never converts calendars - go through the native Date so a
  // Jalali or Kurdish pick still comes out as a Gregorian ISO date.
  return toIsoString(date.toDate(), withTime);
}

/**
 * A value as the visitor reads it: in the shown calendar and `format`, with
 * the locale's digits (1405/07/26 in Persian digits, 2726-10-18 for Kurmanji...).
 * Returns the value unchanged when it can't be read.
 */
export function displayValue(value: string, options: CalendarOptions = {}, withTime = false): string {
  const parsed = parseValue(value, options);
  if (!parsed) return value;
  const format = dateFormatOf(options);
  return parsed.format(withTime && value.includes("T") ? `${format} HH:mm` : format);
}

/**
 * A Gregorian date (ISO "YYYY-MM-DD" or a full timestamp) in the calendar
 * and format: 1405/07/26 for Persian, 2726-10-18 for Kurmanji...
 * Date-only strings are read as local days.
 */
export function formatCalendarDate(value: string, type: CalendarType, format?: string, language?: string): string {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? localDate(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const gregorianDate = new DateObject({ date, calendar: gregorian, locale: gregorian_en });
  // No format: react-date-object's default (YYYY/MM/DD).
  const clean = format?.replaceAll("j", "");
  if (type === "gregorian") return gregorianDate.format(clean);
  const { calendar, locale } = pickerCalendar(type, language);
  return gregorianDate.convert(calendar, locale).format(clean);
}
