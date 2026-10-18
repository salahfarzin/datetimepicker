"use client";
import {
  KURDISH_YEAR_OFFSET,
  KURMANJI_YEAR_OFFSET,
  dateFormatOf,
  dateObject_default,
  displayValue,
  formatCalendarDate,
  formatValue,
  kurdish,
  kurdishGregorian,
  kurdish_ckb,
  kurdish_kmr,
  parseValue,
  pickerCalendar,
  toBound,
  toIsoString,
  toLatinDigits
} from "./chunk-R3IZDP7X.js";

// src/DatePicker.tsx
import { useEffect as useEffect2, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "react-multi-date-picker";

// src/labels.ts
var DEFAULT_LABELS = {
  selectDate: "Select date",
  selectTime: "Select time",
  date: "Date",
  time: "Time",
  hours: "HH",
  minutes: "MM",
  cancel: "Cancel",
  confirm: "Confirm",
  close: "Close",
  open: "Open calendar"
};
var withDefaults = (labels) => ({ ...DEFAULT_LABELS, ...labels });

// src/TimePicker.tsx
import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var HOURS = Array.from({ length: 24 }, (_, i) => i);
var MINUTES = Array.from({ length: 60 }, (_, i) => i);
function scrollToSelected(ref, val) {
  const list = ref.current;
  const item = list?.children[val];
  if (list && item && typeof list.scrollTo === "function") {
    list.scrollTo({
      top: item.offsetTop - list.offsetTop - list.clientHeight / 2 + item.clientHeight / 2,
      behavior: "smooth"
    });
  }
}
function Column({
  label,
  values,
  selected,
  onSelect,
  columnRef
}) {
  return /* @__PURE__ */ jsxs("div", { className: "dtp-time-column", children: [
    /* @__PURE__ */ jsx("span", { className: "dtp-time-label", children: label }),
    /* @__PURE__ */ jsx("div", { ref: columnRef, className: "dtp-time-list", role: "listbox", "aria-label": label, children: values.map((v) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": selected === v,
        onClick: () => onSelect(v),
        className: `dtp-time-option${selected === v ? " dtp-time-option--selected" : ""}`,
        children: v.toString().padStart(2, "0")
      },
      v
    )) })
  ] });
}
function TimePicker({ hour, minute, onChange, hoursLabel = "HH", minutesLabel = "MM" }) {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  useEffect(() => {
    const id = setTimeout(() => {
      scrollToSelected(hourRef, hour);
      scrollToSelected(minuteRef, minute);
    }, 50);
    return () => clearTimeout(id);
  }, [hour, minute]);
  return /* @__PURE__ */ jsxs("div", { className: "dtp-time", dir: "ltr", children: [
    /* @__PURE__ */ jsx(Column, { label: hoursLabel, values: HOURS, selected: hour, onSelect: (h) => onChange(h, minute), columnRef: hourRef }),
    /* @__PURE__ */ jsx("div", { className: "dtp-time-separator", children: ":" }),
    /* @__PURE__ */ jsx(Column, { label: minutesLabel, values: MINUTES, selected: minute, onSelect: (m) => onChange(hour, m), columnRef: minuteRef })
  ] });
}

// src/DatePicker.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DatePicker({
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
  className = ""
}) {
  const labels = withDefaults(labelOverrides);
  const options = { calendar: calendarType, language, format, valueFormat };
  const { calendar, locale } = pickerCalendar(calendarType, language);
  const initial = () => {
    const parsed = parseValue(value, options);
    if (parsed) return parsed;
    const today = new dateObject_default({ calendar, locale });
    const max = toBound(maxDate, options);
    return max && max.valueOf() < today.valueOf() ? max : today;
  };
  const [activeTab, setActiveTab] = useState(value && showTime ? "time" : "date");
  const [internalDate, setInternalDate] = useState(initial);
  useEffect2(() => {
    const next = parseValue(value, options);
    if (next && next.valueOf() !== internalDate.valueOf()) {
      setInternalDate(next);
    }
  }, [value, calendarType, language, format, valueFormat]);
  useEffect2(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const confirm = () => {
    onChange(formatValue(internalDate, options, showTime));
    onClose();
  };
  const title = activeTab === "date" ? labels.selectDate : labels.selectTime;
  const tab = (id, label) => /* @__PURE__ */ jsx2(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": activeTab === id,
      onClick: () => setActiveTab(id),
      className: `dtp-tab${activeTab === id ? " dtp-tab--active" : ""}`,
      children: label
    }
  );
  const content = /* @__PURE__ */ jsx2("div", { className: "dtp-overlay", role: "presentation", onClick: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ jsxs2("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: `dtp-dialog ${className}`.trim(), children: [
    /* @__PURE__ */ jsxs2("div", { className: "dtp-header", children: [
      /* @__PURE__ */ jsxs2("h3", { className: "dtp-title", children: [
        /* @__PURE__ */ jsx2("span", { className: "dtp-title-mark", "aria-hidden": true }),
        title
      ] }),
      /* @__PURE__ */ jsx2("button", { type: "button", onClick: onClose, "aria-label": labels.close, className: "dtp-close", children: /* @__PURE__ */ jsx2("svg", { width: "20", height: "20", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
    ] }),
    showTime && /* @__PURE__ */ jsxs2("div", { className: "dtp-tabs", role: "tablist", children: [
      tab("date", labels.date),
      tab("time", labels.time)
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "dtp-body", children: activeTab === "date" ? /* @__PURE__ */ jsx2("div", { className: "dtp-calendar", children: /* @__PURE__ */ jsx2(
      Calendar,
      {
        value: internalDate,
        calendar,
        locale,
        onChange: (date) => {
          if (date) {
            date.setHour(internalDate.hour);
            date.setMinute(internalDate.minute);
            setInternalDate(date);
          }
        },
        minDate: toBound(minDate, options),
        maxDate: toBound(maxDate, options),
        className: "shadow-none"
      }
    ) }) : /* @__PURE__ */ jsxs2("div", { className: "dtp-time-panel", children: [
      /* @__PURE__ */ jsx2("div", { className: "dtp-time-box", children: /* @__PURE__ */ jsx2(
        TimePicker,
        {
          hour: internalDate.hour,
          minute: internalDate.minute,
          hoursLabel: labels.hours,
          minutesLabel: labels.minutes,
          onChange: (h, m) => setInternalDate((prev) => {
            const next = new dateObject_default(prev);
            next.setHour(h);
            next.setMinute(m);
            return next;
          })
        }
      ) }),
      /* @__PURE__ */ jsx2("p", { className: "dtp-time-value", dir: "ltr", children: internalDate.format("HH:mm") })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { className: "dtp-actions", children: [
      /* @__PURE__ */ jsx2("button", { type: "button", className: "dtp-button dtp-button--secondary", onClick: onClose, children: labels.cancel }),
      /* @__PURE__ */ jsx2("button", { type: "button", className: "dtp-button dtp-button--primary", onClick: confirm, children: labels.confirm })
    ] })
  ] }) });
  if (portal === false || typeof document === "undefined") return content;
  return createPortal(content, portal === true ? document.body : portal);
}

// src/DatePickerInput.tsx
import { useState as useState2 } from "react";
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function DatePickerInput({
  id,
  className = "",
  placeholder,
  dialogClassName,
  disabled,
  showTime = false,
  ...pickerProps
}) {
  const [open, setOpen] = useState2(false);
  const labels = withDefaults(pickerProps.labels);
  const display = pickerProps.value ? displayValue(pickerProps.value, pickerProps, showTime) : "";
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(
      "button",
      {
        id,
        type: "button",
        disabled,
        onClick: () => setOpen(true),
        "aria-haspopup": "dialog",
        dir: "ltr",
        className: `dtp-input ${className}`.trim(),
        children: [
          /* @__PURE__ */ jsx3("span", { className: display ? "dtp-input-value" : "dtp-input-value dtp-input-value--empty", children: display || (placeholder ?? dateFormatOf(pickerProps)) }),
          /* @__PURE__ */ jsx3("svg", { className: "dtp-input-icon", width: "20", height: "20", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ jsx3("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsx3("span", { className: "dtp-sr-only", children: labels.open })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx3(DatePicker, { ...pickerProps, showTime, className: dialogClassName, onClose: () => setOpen(false) })
  ] });
}
export {
  DEFAULT_LABELS,
  DatePicker,
  DatePickerInput,
  KURDISH_YEAR_OFFSET,
  KURMANJI_YEAR_OFFSET,
  TimePicker,
  dateFormatOf,
  displayValue,
  formatCalendarDate,
  formatValue,
  kurdish,
  kurdishGregorian,
  kurdish_ckb,
  kurdish_kmr,
  parseValue,
  pickerCalendar,
  toBound,
  toIsoString,
  toLatinDigits
};
//# sourceMappingURL=index.js.map