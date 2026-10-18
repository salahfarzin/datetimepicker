/** Every text the pickers show. Pass the ones your app translates; the rest stay English. */
export interface DatePickerLabels {
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

export const DEFAULT_LABELS: DatePickerLabels = {
  selectDate: "Select date",
  selectTime: "Select time",
  date: "Date",
  time: "Time",
  hours: "HH",
  minutes: "MM",
  cancel: "Cancel",
  confirm: "Confirm",
  close: "Close",
  open: "Open calendar",
};

export const withDefaults = (labels?: Partial<DatePickerLabels>): DatePickerLabels => ({ ...DEFAULT_LABELS, ...labels });
