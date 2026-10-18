import React, { useState } from "react";
import { DatePicker, type DatePickerProps } from "./DatePicker";
import { dateFormatOf, displayValue } from "./calendars";
import { withDefaults } from "./labels";

export interface DatePickerInputProps extends Omit<DatePickerProps, "onClose" | "className"> {
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
export function DatePickerInput({
  id,
  className = "",
  placeholder,
  dialogClassName,
  disabled,
  showTime = false,
  ...pickerProps
}: Readonly<DatePickerInputProps>) {
  const [open, setOpen] = useState(false);
  const labels = withDefaults(pickerProps.labels);
  const display = pickerProps.value ? displayValue(pickerProps.value, pickerProps, showTime) : "";

  return (
    <>
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        dir="ltr"
        className={`dtp-input ${className}`.trim()}
      >
        <span className={display ? "dtp-input-value" : "dtp-input-value dtp-input-value--empty"}>
          {display || (placeholder ?? dateFormatOf(pickerProps))}
        </span>
        <svg className="dtp-input-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="dtp-sr-only">{labels.open}</span>
      </button>
      {open && <DatePicker {...pickerProps} showTime={showTime} className={dialogClassName} onClose={() => setOpen(false)} />}
    </>
  );
}

export default DatePickerInput;
