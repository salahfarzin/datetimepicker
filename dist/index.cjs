"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEFAULT_LABELS: () => DEFAULT_LABELS,
  DatePicker: () => DatePicker,
  DatePickerInput: () => DatePickerInput,
  KURDISH_YEAR_OFFSET: () => KURDISH_YEAR_OFFSET,
  KURMANJI_YEAR_OFFSET: () => KURMANJI_YEAR_OFFSET,
  TimePicker: () => TimePicker,
  dateFormatOf: () => dateFormatOf,
  displayValue: () => displayValue,
  formatCalendarDate: () => formatCalendarDate,
  formatValue: () => formatValue,
  kurdish: () => kurdish,
  kurdishGregorian: () => kurdishGregorian,
  kurdish_ckb: () => kurdish_ckb,
  kurdish_kmr: () => kurdish_kmr,
  parseValue: () => parseValue,
  pickerCalendar: () => pickerCalendar,
  toBound: () => toBound,
  toIsoString: () => toIsoString,
  toLatinDigits: () => toLatinDigits
});
module.exports = __toCommonJS(src_exports);

// src/DatePicker.tsx
var import_react2 = require("react");
var import_react_dom = require("react-dom");

// src/dateObject.ts
var import_react_date_object = __toESM(require("react-date-object"), 1);
var DateObject = import_react_date_object.default.default ?? import_react_date_object.default;
var dateObject_default = DateObject;

// src/DatePicker.tsx
var import_react_multi_date_picker = require("react-multi-date-picker");

// src/calendars.ts
var import_gregorian = __toESM(require("react-date-object/calendars/gregorian.js"), 1);
var import_persian = __toESM(require("react-date-object/calendars/persian.js"), 1);
var import_gregorian_en = __toESM(require("react-date-object/locales/gregorian_en.js"), 1);
var import_persian_fa = __toESM(require("react-date-object/locales/persian_fa.js"), 1);
function withYearOffset(base, name, offset, overrides = {}) {
  const shift = (date) => ({ year: date.year - offset, month: date.month, day: date.day });
  return {
    ...base,
    ...overrides,
    name,
    isLeap: (year) => base.isLeap(year - offset),
    getLeaps: (year) => base.getLeaps(year - offset)?.map((leap) => leap + offset),
    getDayOfYear: (date) => base.getDayOfYear(shift(date)),
    // Days since the base epoch, so convert() and toDate() line up with it.
    getAllDays: (date) => base.getAllDays(shift(date)),
    guessYear: (days, currentYear) => base.guessYear(days, currentYear - offset) + offset
  };
}
var KURDISH_YEAR_OFFSET = 1321;
var kurdish = withYearOffset(import_persian.default, "kurdish", KURDISH_YEAR_OFFSET);
var KURMANJI_YEAR_OFFSET = 700;
var kurdishGregorian = withYearOffset(import_gregorian.default, "kurdish_gregorian", KURMANJI_YEAR_OFFSET, {
  weekStartDayIndex: 2
});
var kurdish_ckb = {
  name: "kurdish_ckb",
  months: [
    ["\u062E\u0627\u06A9\u06D5\u0644\u06CE\u0648\u06D5", "\u062E\u0627\u06A9"],
    ["\u06AF\u0648\u06B5\u0627\u0646", "\u06AF\u0648\u06B5"],
    ["\u062C\u06C6\u0632\u06D5\u0631\u062F\u0627\u0646", "\u062C\u06C6\u0632"],
    ["\u067E\u0648\u0648\u0634\u067E\u06D5\u0695", "\u067E\u0648\u0648\u0634"],
    ["\u06AF\u06D5\u0644\u0627\u0648\u06CE\u0698", "\u06AF\u06D5\u0644"],
    ["\u062E\u06D5\u0631\u0645\u0627\u0646\u0627\u0646", "\u062E\u06D5\u0631"],
    ["\u0695\u06D5\u0632\u0628\u06D5\u0631", "\u0695\u06D5\u0632"],
    ["\u06AF\u06D5\u06B5\u0627\u0695\u06CE\u0632\u0627\u0646", "\u06AF\u06D5\u06B5\u0627"],
    ["\u0633\u06D5\u0631\u0645\u0627\u0648\u06D5\u0632", "\u0633\u06D5\u0631"],
    ["\u0628\u06D5\u0641\u0631\u0627\u0646\u0628\u0627\u0631", "\u0628\u06D5\u0641"],
    ["\u0695\u06CE\u0628\u06D5\u0646\u062F\u0627\u0646", "\u0695\u06CE\u0628"],
    ["\u0695\u06D5\u0634\u06D5\u0645\u06CE", "\u0695\u06D5\u0634"]
  ],
  weekDays: [
    ["\u0634\u06D5\u0645\u0645\u06D5", "\u0634"],
    ["\u06CC\u06D5\u06A9\u0634\u06D5\u0645\u0645\u06D5", "\u06CC"],
    ["\u062F\u0648\u0648\u0634\u06D5\u0645\u0645\u06D5", "\u062F"],
    ["\u0633\u06CE\u0634\u06D5\u0645\u0645\u06D5", "\u0633"],
    ["\u0686\u0648\u0627\u0631\u0634\u06D5\u0645\u0645\u06D5", "\u0686"],
    ["\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645\u0645\u06D5", "\u067E"],
    ["\u0647\u06D5\u06CC\u0646\u06CC", "\u0647\u0640"]
  ],
  digits: ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"],
  meridiems: [
    ["\u067E\u06CE\u0634 \u0646\u06CC\u0648\u06D5\u0695\u06C6", "\u067E.\u0646"],
    ["\u062F\u0648\u0627\u06CC \u0646\u06CC\u0648\u06D5\u0695\u06C6", "\u062F.\u0646"]
  ]
};
var kurdish_kmr = {
  name: "kurdish_kmr",
  months: [
    ["Kan\xFBna duyem", "Kdu"],
    ["Sibat", "Sib"],
    ["Adar", "Ada"],
    ["N\xEEsan", "N\xEEs"],
    ["Gulan", "Gul"],
    ["Hez\xEEran", "Hez"],
    ["T\xEErmeh", "T\xEEr"],
    ["Tebax", "Teb"],
    ["\xCElon", "\xCElo"],
    ["Cotmeh", "Cot"],
    ["Mijdar", "Mij"],
    ["Kan\xFBn", "Kan"]
  ],
  weekDays: [
    ["\u015Eem\xEE", "\u015Ee"],
    ["Yek\u015Fem", "Ye"],
    ["Du\u015Fem", "Du"],
    ["S\xEA\u015Fem", "S\xEA"],
    ["\xC7ar\u015Fem", "\xC7a"],
    ["P\xEAnc\u015Fem", "P\xEA"],
    ["\xCEn", "\xCEn"]
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["Ber\xEE n\xEEvro", "BN"],
    ["Pi\u015Ft\xEE n\xEEvro", "PN"]
  ]
};
function pickerCalendar(type = "gregorian", language) {
  if (type === "jalali") return { calendar: import_persian.default, locale: import_persian_fa.default };
  if (type === "kurdish") {
    return language === "kmr" ? { calendar: kurdishGregorian, locale: kurdish_kmr } : { calendar: kurdish, locale: kurdish_ckb };
  }
  return { calendar: import_gregorian.default, locale: import_gregorian_en.default };
}
var toLatinDigits = (str) => str.replaceAll(/[۰-۹]/g, (d) => String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(d))).replaceAll(/[٠-٩]/g, (d) => String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(d)));
var ISO_DATE = /^\d{4}-\d{2}-\d{2}/;
var LATIN_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var pad = (n) => String(n).padStart(2, "0");
function dateFormatOf({ calendar = "gregorian", format }) {
  if (format) return format.replaceAll("j", "");
  return calendar === "gregorian" ? "YYYY-MM-DD" : "YYYY/MM/DD";
}
var readsCalendarStrings = ({ calendar = "gregorian", valueFormat = "iso" }) => valueFormat === "calendar" && calendar !== "gregorian";
function toIsoString(date, withTime = false) {
  const iso = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return withTime ? `${iso}T${pad(date.getHours())}:${pad(date.getMinutes())}` : iso;
}
function localDate(iso) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}
function isGregorianLooking(datePart, format, { calendar }) {
  if (!format.includes("-")) return true;
  const year = Number(datePart.slice(0, 4));
  if (calendar === "jalali") return year > 1700;
  if (calendar === "kurdish") return year < 2500;
  return false;
}
function parseValue(value, options = {}) {
  if (!value) return null;
  const { calendar, locale } = pickerCalendar(options.calendar, options.language);
  const normalized = toLatinDigits(value.trim());
  const [datePart, timePart] = normalized.split("T");
  const format = dateFormatOf(options);
  let parsed;
  const looksIso = ISO_DATE.test(datePart);
  if (readsCalendarStrings(options) && !(looksIso && isGregorianLooking(datePart, format, options))) {
    parsed = new dateObject_default({ date: datePart, format, calendar, locale });
  } else if (looksIso) {
    parsed = new dateObject_default({ date: localDate(datePart), calendar, locale });
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
function toBound(bound, options = {}) {
  if (!bound) return void 0;
  if (typeof bound === "string") return parseValue(bound, options) ?? void 0;
  const { calendar, locale } = pickerCalendar(options.calendar, options.language);
  return new dateObject_default({ date: bound, calendar, locale });
}
function formatValue(date, options = {}, withTime = false) {
  if (readsCalendarStrings(options)) {
    const copy = new dateObject_default(date);
    copy.digits = LATIN_DIGITS;
    const format = dateFormatOf(options);
    return copy.format(withTime ? `${format}THH:mm` : format);
  }
  return toIsoString(date.toDate(), withTime);
}
function displayValue(value, options = {}, withTime = false) {
  const parsed = parseValue(value, options);
  if (!parsed) return value;
  const format = dateFormatOf(options);
  return parsed.format(withTime && value.includes("T") ? `${format} HH:mm` : format);
}
function formatCalendarDate(value, type, format, language) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? localDate(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const gregorianDate = new dateObject_default({ date, calendar: import_gregorian.default, locale: import_gregorian_en.default });
  const clean = format?.replaceAll("j", "");
  if (type === "gregorian") return gregorianDate.format(clean);
  const { calendar, locale } = pickerCalendar(type, language);
  return gregorianDate.convert(calendar, locale).format(clean);
}

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
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dtp-time-column", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dtp-time-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: columnRef, className: "dtp-time-list", role: "listbox", "aria-label": label, children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const hourRef = (0, import_react.useRef)(null);
  const minuteRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const id = setTimeout(() => {
      scrollToSelected(hourRef, hour);
      scrollToSelected(minuteRef, minute);
    }, 50);
    return () => clearTimeout(id);
  }, [hour, minute]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dtp-time", dir: "ltr", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, { label: hoursLabel, values: HOURS, selected: hour, onSelect: (h) => onChange(h, minute), columnRef: hourRef }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dtp-time-separator", children: ":" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, { label: minutesLabel, values: MINUTES, selected: minute, onSelect: (m) => onChange(hour, m), columnRef: minuteRef })
  ] });
}

// src/DatePicker.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const [activeTab, setActiveTab] = (0, import_react2.useState)(value && showTime ? "time" : "date");
  const [internalDate, setInternalDate] = (0, import_react2.useState)(initial);
  (0, import_react2.useEffect)(() => {
    const next = parseValue(value, options);
    if (next && next.valueOf() !== internalDate.valueOf()) {
      setInternalDate(next);
    }
  }, [value, calendarType, language, format, valueFormat]);
  (0, import_react2.useEffect)(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const confirm = () => {
    onChange(formatValue(internalDate, options, showTime));
    onClose();
  };
  const title = activeTab === "date" ? labels.selectDate : labels.selectTime;
  const tab = (id, label) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  const content = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dtp-overlay", role: "presentation", onClick: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: `dtp-dialog ${className}`.trim(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dtp-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h3", { className: "dtp-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dtp-title-mark", "aria-hidden": true }),
        title
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: onClose, "aria-label": labels.close, className: "dtp-close", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "20", height: "20", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
    ] }),
    showTime && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dtp-tabs", role: "tablist", children: [
      tab("date", labels.date),
      tab("time", labels.time)
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dtp-body", children: activeTab === "date" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dtp-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_react_multi_date_picker.Calendar,
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
    ) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dtp-time-panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dtp-time-box", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dtp-time-value", dir: "ltr", children: internalDate.format("HH:mm") })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dtp-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dtp-button dtp-button--secondary", onClick: onClose, children: labels.cancel }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dtp-button dtp-button--primary", onClick: confirm, children: labels.confirm })
    ] })
  ] }) });
  if (portal === false || typeof document === "undefined") return content;
  return (0, import_react_dom.createPortal)(content, portal === true ? document.body : portal);
}

// src/DatePickerInput.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function DatePickerInput({
  id,
  className = "",
  placeholder,
  dialogClassName,
  disabled,
  showTime = false,
  ...pickerProps
}) {
  const [open, setOpen] = (0, import_react3.useState)(false);
  const labels = withDefaults(pickerProps.labels);
  const display = pickerProps.value ? displayValue(pickerProps.value, pickerProps, showTime) : "";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: display ? "dtp-input-value" : "dtp-input-value dtp-input-value--empty", children: display || (placeholder ?? dateFormatOf(pickerProps)) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "dtp-input-icon", width: "20", height: "20", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dtp-sr-only", children: labels.open })
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DatePicker, { ...pickerProps, showTime, className: dialogClassName, onClose: () => setOpen(false) })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map