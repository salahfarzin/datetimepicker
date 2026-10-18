# Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow
[SemVer](https://semver.org/).

## v1.0.2 — 2026-10-18

First release on the npm registry: `npm install @salahfarzin/datetimepicker`. No code changes;
the README shows the npm install and its screenshots load on npmjs.com too.

## v1.0.1 — 2026-10-18

### Fixes

- A selected day in the calendar's last column is no longer clipped at the panel's edge: the
  day grid was 16px wider than the calendar (its padding came on top of `width: 100%`).

## v1.0.0 — 2026-10-18

First release, extracted from the date pickers in rawej and the psychometrist dashboard so
both share one.

### Features

- `DatePicker`: modal date and time picker for the Gregorian, Jalali and Kurdish calendars
  (Sorani and Kurmanji).
- `DatePickerInput`: a field that shows the value in the visitor's calendar and opens the picker.
- `TimePicker`: hour and minute columns.
- `valueFormat`: `"iso"` keeps values Gregorian `YYYY-MM-DD` whatever the calendar shown;
  `"calendar"` reads and writes strings in the shown calendar and `format`.
- String `minDate`/`maxDate` are read like `value`, so a Gregorian bound stays Gregorian in
  the Jalali and Kurdish calendars.
- Translatable labels, plain CSS themed with `--dtp-*` custom properties.
- Calendar helpers: `parseValue`, `formatValue`, `displayValue`, `formatCalendarDate` and more.
