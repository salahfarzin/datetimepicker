import React from 'react';
import { CalendarType, ValueFormat } from './calendars.js';
export { CalendarOptions, KURDISH_YEAR_OFFSET, KURMANJI_YEAR_OFFSET, PickerCalendar, dateFormatOf, displayValue, formatCalendarDate, formatValue, kurdish, kurdishGregorian, kurdish_ckb, kurdish_kmr, parseValue, pickerCalendar, toBound, toIsoString, toLatinDigits } from './calendars.js';
import 'react-date-object';
import 'react-date-object/calendars/persian';
import 'react-date-object/locales/persian_fa';

/** Every text the pickers show. Pass the ones your app translates; the rest stay English. */
interface DatePickerLabels {
    selectDate: string;
    selectTime: string;
    date: string;
    time: string;
    hours: string;
    minutes: string;
    cancel: string;
    confirm: string;
    close: string;
    /** DatePickerInput's button, for screen readers. */
    open: string;
}
declare const DEFAULT_LABELS: DatePickerLabels;

interface DatePickerProps {
    /** The current value, written as `valueFormat` says; "" for none. */
    value: string;
    onChange: (value: string) => void;
    /** Called on cancel, Escape, a click outside, and after a confirmed pick. */
    onClose: () => void;
    /** Calendar dates are shown and picked in. Default "gregorian". */
    calendar?: CalendarType;
    /** UI language; picks Sorani or Kurmanji ("kmr") for the Kurdish calendar. */
    language?: string;
    /** Date format of "calendar" values, e.g. "YYYY/MM/DD" (moment's "j" prefixes are ignored). */
    format?: string;
    /** "iso" (default): Gregorian YYYY-MM-DD in and out. "calendar": strings in the shown calendar and `format`. */
    valueFormat?: ValueFormat;
    /** Adds a time tab, and "THH:mm" to the value. Default true. */
    showTime?: boolean;
    /** Earliest/latest pickable day: a Date, or a string written like `value`. */
    minDate?: Date | string | null;
    maxDate?: Date | string | null;
    labels?: Partial<DatePickerLabels>;
    /** Where the dialog mounts: document.body (default), another element, or false to render in place. */
    portal?: boolean | HTMLElement;
    /** Extra class on the dialog, e.g. for app-specific theming. */
    className?: string;
}
/**
 * A modal date (and time) picker for the Gregorian, Jalali and Kurdish
 * calendars. Opens on the current value, else today - or the latest
 * allowed day when that's earlier (a birth date for adults opens 18 years back).
 */
declare function DatePicker({ value, onChange, onClose, calendar: calendarType, language, format, valueFormat, showTime, minDate, maxDate, labels: labelOverrides, portal, className, }: Readonly<DatePickerProps>): React.JSX.Element;

interface DatePickerInputProps extends Omit<DatePickerProps, "onClose" | "className"> {
    id?: string;
    /** Classes for the field button; it also gets "dtp-input". */
    className?: string;
    /** Shown while empty; the date format by default. */
    placeholder?: string;
    /** Classes for the picker dialog. */
    dialogClassName?: string;
    disabled?: boolean;
}
/**
 * A field showing the value in the visitor's calendar and format (1405/07/26
 * in Persian digits for Jalali, 2726-10-18 for Kurmanji...) that opens the
 * picker. Dates read left to right in every language.
 */
declare function DatePickerInput({ id, className, placeholder, dialogClassName, disabled, showTime, ...pickerProps }: Readonly<DatePickerInputProps>): React.JSX.Element;

interface TimePickerProps {
    hour: number;
    minute: number;
    onChange: (hour: number, minute: number) => void;
    /** Column headings; "HH" and "MM" by default. */
    hoursLabel?: string;
    minutesLabel?: string;
}
/** Two scrolling columns, hours (0-23) and minutes. */
declare function TimePicker({ hour, minute, onChange, hoursLabel, minutesLabel }: Readonly<TimePickerProps>): React.JSX.Element;

export { CalendarType, DEFAULT_LABELS, DatePicker, DatePickerInput, type DatePickerInputProps, type DatePickerLabels, type DatePickerProps, TimePicker, type TimePickerProps, ValueFormat };
