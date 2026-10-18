import * as ReactDateObject from 'react-date-object';
import ReactDateObject__default from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

/**
 * react-date-object's class. It's CommonJS with an ES "module" build:
 * bundlers pick the module and get the class, but Node's ESM loader (Vitest
 * in an app, which runs node_modules natively) gets the CommonJS exports
 * object, { default: DateObject }.
 */
declare const DateObject: typeof ReactDateObject__default;
type DateObject = ReactDateObject__default;

/** The calendar dates are shown and picked in. */
type CalendarType = "gregorian" | "jalali" | "kurdish";
/**
 * How `value`, `onChange` and string `minDate`/`maxDate` are written:
 * - "iso": Gregorian "YYYY-MM-DD" (plus "THH:mm" with time), whatever the
 *   calendar shown. What an API usually stores.
 * - "calendar": in the shown calendar and `format`, e.g. "1405/07/26" for
 *   Jalali. Same as "iso" for the Gregorian calendar.
 */
type ValueFormat = "iso" | "calendar";
type Calendar = typeof persian;
type Locale = typeof persian_fa;
/** What the calendar helpers need to read and write a value. */
interface CalendarOptions {
    calendar?: CalendarType;
    /** UI language. Only picks the Kurdish variant today: "kmr" is Kurmanji, anything else Sorani. */
    language?: string;
    /** Date format for "calendar" values and display, e.g. "YYYY/MM/DD". moment-jalaali's "j" prefixes (jYYYY) are ignored. */
    format?: string;
    valueFormat?: ValueFormat;
}
/**
 * Sorani: the solar calendar Persian uses (the year starts at Newroz, same
 * month lengths and leap years), counted from the Median era:
 * Kurdish year = Solar Hijri year + 1321, so 1405 is 2726.
 */
declare const KURDISH_YEAR_OFFSET = 1321;
declare const kurdish: Omit<ReactDateObject.Calendar, "leapsLength">;
/**
 * Kurmanji: Gregorian months under their Kurmanji names, with the Kurdish
 * year as Gregorian + 700 (2026 is 2726). Weeks start on Monday.
 */
declare const KURMANJI_YEAR_OFFSET = 700;
declare const kurdishGregorian: Omit<ReactDateObject.Calendar, "leapsLength">;
/** Sorani: Kurdish month names, Saturday-first week, Eastern Arabic digits. */
declare const kurdish_ckb: Locale;
/** Kurmanji: the Gregorian months' Kurmanji names, Latin digits. */
declare const kurdish_kmr: Locale;
interface PickerCalendar {
    calendar: Calendar;
    locale: Locale;
}
/** The react-date-object calendar and locale a calendar type (and, for Kurdish, a language) picks dates in. */
declare function pickerCalendar(type?: CalendarType, language?: string): PickerCalendar;
/** Western digits from Persian (۰-۹) or Arabic-Indic (٠-٩) ones. */
declare const toLatinDigits: (str: string) => string;
/** `format` without moment-jalaali's "j" prefixes, or the calendar's default. */
declare function dateFormatOf({ calendar, format }: CalendarOptions): string;
/** "YYYY-MM-DD" (and "THH:mm") of a native Date, in local time. */
declare function toIsoString(date: Date, withTime?: boolean): string;
/**
 * Reads a value in the picker's calendar. "iso" values are Gregorian;
 * "calendar" values are in `format`, except an ISO-looking value that is
 * plainly Gregorian (see isGregorianLooking). Returns null when it can't be read.
 */
declare function parseValue(value: string, options?: CalendarOptions): DateObject | null;
/** A min/max bound in the picker's calendar: a Date, or a string read like a value. */
declare function toBound(bound: Date | string | null | undefined, options?: CalendarOptions): DateObject | undefined;
/** The string `onChange` gets for a picked date. */
declare function formatValue(date: DateObject, options?: CalendarOptions, withTime?: boolean): string;
/**
 * A value as the visitor reads it: in the shown calendar and `format`, with
 * the locale's digits (1405/07/26 in Persian digits, 2726-10-18 for Kurmanji...).
 * Returns the value unchanged when it can't be read.
 */
declare function displayValue(value: string, options?: CalendarOptions, withTime?: boolean): string;
/**
 * A Gregorian date (ISO "YYYY-MM-DD" or a full timestamp) in the calendar
 * and format: 1405/07/26 for Persian, 2726-10-18 for Kurmanji...
 * Date-only strings are read as local days.
 */
declare function formatCalendarDate(value: string, type: CalendarType, format?: string, language?: string): string;

export { type CalendarOptions, type CalendarType, KURDISH_YEAR_OFFSET, KURMANJI_YEAR_OFFSET, type PickerCalendar, type ValueFormat, dateFormatOf, displayValue, formatCalendarDate, formatValue, kurdish, kurdishGregorian, kurdish_ckb, kurdish_kmr, parseValue, pickerCalendar, toBound, toIsoString, toLatinDigits };
