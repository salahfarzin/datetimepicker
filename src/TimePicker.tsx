import React, { useEffect, useRef } from "react";

export interface TimePickerProps {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
  /** Column headings; "HH" and "MM" by default. */
  hoursLabel?: string;
  minutesLabel?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function scrollToSelected(ref: React.RefObject<HTMLDivElement | null>, val: number) {
  const list = ref.current;
  const item = list?.children[val] as HTMLElement | undefined;
  // jsdom has no scrollTo.
  if (list && item && typeof list.scrollTo === "function") {
    list.scrollTo({
      top: item.offsetTop - list.offsetTop - list.clientHeight / 2 + item.clientHeight / 2,
      behavior: "smooth",
    });
  }
}

function Column({
  label,
  values,
  selected,
  onSelect,
  columnRef,
}: Readonly<{
  label: string;
  values: number[];
  selected: number;
  onSelect: (v: number) => void;
  columnRef: React.RefObject<HTMLDivElement | null>;
}>) {
  return (
    <div className="dtp-time-column">
      <span className="dtp-time-label">{label}</span>
      <div ref={columnRef} className="dtp-time-list" role="listbox" aria-label={label}>
        {values.map((v) => (
          <button
            type="button"
            key={v}
            role="option"
            aria-selected={selected === v}
            onClick={() => onSelect(v)}
            className={`dtp-time-option${selected === v ? " dtp-time-option--selected" : ""}`}
          >
            {v.toString().padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Two scrolling columns, hours (0-23) and minutes. */
export function TimePicker({ hour, minute, onChange, hoursLabel = "HH", minutesLabel = "MM" }: Readonly<TimePickerProps>) {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // Scroll on mount and when the time changes from outside.
  useEffect(() => {
    const id = setTimeout(() => {
      scrollToSelected(hourRef, hour);
      scrollToSelected(minuteRef, minute);
    }, 50);
    return () => clearTimeout(id);
  }, [hour, minute]);

  return (
    <div className="dtp-time" dir="ltr">
      <Column label={hoursLabel} values={HOURS} selected={hour} onSelect={(h) => onChange(h, minute)} columnRef={hourRef} />
      <div className="dtp-time-separator">:</div>
      <Column label={minutesLabel} values={MINUTES} selected={minute} onSelect={(m) => onChange(hour, m)} columnRef={minuteRef} />
    </div>
  );
}

export default TimePicker;
