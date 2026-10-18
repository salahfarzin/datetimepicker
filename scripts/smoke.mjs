// Loads the built package the way an app's test runner does - Node's own
// ESM and CommonJS loaders, no bundler - and runs a date through it. The
// unit tests run the source through Vite, which hides interop problems
// with the CommonJS dependencies.
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const entries = {
  "esm index": await import("../dist/index.js"),
  "esm calendars": await import("../dist/calendars.js"),
  "cjs index": require("../dist/index.cjs"),
  "cjs calendars": require("../dist/calendars.cjs"),
};

for (const [name, m] of Object.entries(entries)) {
  const parsed = m.parseValue("2026-10-18", { calendar: "jalali" });
  assert.ok(parsed, `${name}: parseValue`);
  assert.equal(m.formatValue(parsed, { calendar: "jalali", valueFormat: "calendar" }), "1405/07/26", `${name}: formatValue`);
  assert.equal(m.formatCalendarDate("2026-10-18", "kurdish", "YYYY/MM/DD", "ckb"), "٢٧٢٦/٠٧/٢٦", `${name}: formatCalendarDate`);
  if (name.endsWith("index")) assert.equal(typeof m.DatePicker, "function", `${name}: DatePicker`);
}
console.log("smoke ok:", Object.keys(entries).join(", "));
