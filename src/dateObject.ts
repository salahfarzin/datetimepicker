import ReactDateObject from "react-date-object";

/**
 * react-date-object's class. It's CommonJS with an ES "module" build:
 * bundlers pick the module and get the class, but Node's ESM loader (Vitest
 * in an app, which runs node_modules natively) gets the CommonJS exports
 * object, { default: DateObject }.
 */
const DateObject: typeof ReactDateObject =
  (ReactDateObject as unknown as { default?: typeof ReactDateObject }).default ?? ReactDateObject;
type DateObject = ReactDateObject;

export default DateObject;
