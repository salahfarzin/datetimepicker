import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DateObject from "./dateObject";
// Calendar only: react-multi-date-picker is CommonJS, and Node's ESM loader
// can't see its DateObject re-export (the same class as react-date-object's).
import { Calendar } from "react-multi-date-picker";
import { type CalendarOptions, type CalendarType, type ValueFormat, formatValue, parseValue, pickerCalendar, toBound } from "./calendars";
import { type DatePickerLabels, withDefaults } from "./labels";
import { TimePicker } from "./TimePicker";

export interface DatePickerProps {
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
export function DatePicker({
  value,
  onChange,
  onClose,
  calendar: calendarType = "gregorian",
  language,
  format,
  valueFormat = "iso",
  showTime = true,
  minDate,
  maxDate,
  labels: labelOverrides,
  portal = true,
  className = "",
}: Readonly<DatePickerProps>) {
  const labels = withDefaults(labelOverrides);
  const options: CalendarOptions = { calendar: calendarType, language, format, valueFormat };
  const { calendar, locale } = pickerCalendar(calendarType, language);

  const initial = () => {
    const parsed = parseValue(value, options);
    if (parsed) return parsed;
    const today = new DateObject({ calendar, locale });
    const max = toBound(maxDate, options);
    return max && max.valueOf() < today.valueOf() ? max : today;
  };

  // Start on the time tab when a date is already chosen.
  const [activeTab, setActiveTab] = useState<"date" | "time">(value && showTime ? "time" : "date");
  const [internalDate, setInternalDate] = useState<DateObject>(initial);

  // Follow external value changes (form reset, async defaults).
  useEffect(() => {
    const next = parseValue(value, options);
    if (next && next.valueOf() !== internalDate.valueOf()) {
      setInternalDate(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, calendarType, language, format, valueFormat]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const confirm = () => {
    onChange(formatValue(internalDate, options, showTime));
    onClose();
  };

  const title = activeTab === "date" ? labels.selectDate : labels.selectTime;
  const tab = (id: "date" | "time", label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
      className={`dtp-tab${activeTab === id ? " dtp-tab--active" : ""}`}
    >
      {label}
    </button>
  );

  const content = (
    <div className="dtp-overlay" role="presentation" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className={`dtp-dialog ${className}`.trim()}>
        <div className="dtp-header">
          <h3 className="dtp-title">
            <span className="dtp-title-mark" aria-hidden />
            {title}
          </h3>
          <button type="button" onClick={onClose} aria-label={labels.close} className="dtp-close">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showTime && (
          <div className="dtp-tabs" role="tablist">
            {tab("date", labels.date)}
            {tab("time", labels.time)}
          </div>
        )}

        <div className="dtp-body">
          {activeTab === "date" ? (
            <div className="dtp-calendar">
              <Calendar
                value={internalDate}
                calendar={calendar}
                locale={locale}
                onChange={(date: DateObject) => {
                  if (date) {
                    // Keep the chosen time when picking another day.
                    date.setHour(internalDate.hour);
                    date.setMinute(internalDate.minute);
                    setInternalDate(date);
                  }
                }}
                minDate={toBound(minDate, options)}
                maxDate={toBound(maxDate, options)}
                className="shadow-none"
              />
            </div>
          ) : (
            <div className="dtp-time-panel">
              <div className="dtp-time-box">
                <TimePicker
                  hour={internalDate.hour}
                  minute={internalDate.minute}
                  hoursLabel={labels.hours}
                  minutesLabel={labels.minutes}
                  onChange={(h, m) =>
                    setInternalDate((prev) => {
                      const next = new DateObject(prev);
                      next.setHour(h);
                      next.setMinute(m);
                      return next;
                    })
                  }
                />
              </div>
              <p className="dtp-time-value" dir="ltr">
                {internalDate.format("HH:mm")}
              </p>
            </div>
          )}
        </div>

        <div className="dtp-actions">
          <button type="button" className="dtp-button dtp-button--secondary" onClick={onClose}>
            {labels.cancel}
          </button>
          <button type="button" className="dtp-button dtp-button--primary" onClick={confirm}>
            {labels.confirm}
          </button>
        </div>
      </div>
    </div>
  );

  if (portal === false || typeof document === "undefined") return content;
  return createPortal(content, portal === true ? document.body : portal);
}

export default DatePicker;
