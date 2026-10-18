// src/dateObject.ts
import ReactDateObject from "react-date-object";
var DateObject = ReactDateObject.default ?? ReactDateObject;
var dateObject_default = DateObject;

// src/calendars.ts
import gregorian from "react-date-object/calendars/gregorian.js";
import persian from "react-date-object/calendars/persian.js";
import gregorian_en from "react-date-object/locales/gregorian_en.js";
import persian_fa from "react-date-object/locales/persian_fa.js";
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
var kurdish = withYearOffset(persian, "kurdish", KURDISH_YEAR_OFFSET);
var KURMANJI_YEAR_OFFSET = 700;
var kurdishGregorian = withYearOffset(gregorian, "kurdish_gregorian", KURMANJI_YEAR_OFFSET, {
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
  if (type === "jalali") return { calendar: persian, locale: persian_fa };
  if (type === "kurdish") {
    return language === "kmr" ? { calendar: kurdishGregorian, locale: kurdish_kmr } : { calendar: kurdish, locale: kurdish_ckb };
  }
  return { calendar: gregorian, locale: gregorian_en };
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
  const gregorianDate = new dateObject_default({ date, calendar: gregorian, locale: gregorian_en });
  const clean = format?.replaceAll("j", "");
  if (type === "gregorian") return gregorianDate.format(clean);
  const { calendar, locale } = pickerCalendar(type, language);
  return gregorianDate.convert(calendar, locale).format(clean);
}

export {
  dateObject_default,
  KURDISH_YEAR_OFFSET,
  kurdish,
  KURMANJI_YEAR_OFFSET,
  kurdishGregorian,
  kurdish_ckb,
  kurdish_kmr,
  pickerCalendar,
  toLatinDigits,
  dateFormatOf,
  toIsoString,
  parseValue,
  toBound,
  formatValue,
  displayValue,
  formatCalendarDate
};
//# sourceMappingURL=chunk-R3IZDP7X.js.map