import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "../DatePicker";
import { DatePickerInput } from "../DatePickerInput";

describe("DatePickerInput", () => {
  it("shows a Gregorian value in the Jalali calendar", () => {
    render(<DatePickerInput value="1990-03-21" onChange={vi.fn()} calendar="jalali" format="YYYY/MM/DD" />);
    // 1 Farvardin 1369, in Persian digits.
    expect(screen.getByText("۱۳۶۹/۰۱/۰۱")).toBeInTheDocument();
  });

  it("shows the Kurdish year for Sorani (solar months) and Kurmanji (Gregorian months)", () => {
    const { unmount } = render(<DatePickerInput value="2026-10-18" onChange={vi.fn()} calendar="kurdish" language="ckb" format="YYYY/MM/DD" />);
    expect(screen.getByText("٢٧٢٦/٠٧/٢٦")).toBeInTheDocument();
    unmount();

    render(<DatePickerInput value="2026-03-21" onChange={vi.fn()} calendar="kurdish" language="kmr" format="YYYY-MM-DD" />);
    expect(screen.getByText("2726-03-21")).toBeInTheDocument();
  });

  it("picks in the Kurmanji calendar and still hands back a Gregorian ISO date", () => {
    const onChange = vi.fn();
    render(<DatePickerInput value="2026-10-18" onChange={onChange} calendar="kurdish" language="kmr" />);

    fireEvent.click(screen.getByRole("button", { name: /Open calendar/ }));
    expect(screen.getAllByText(/Cotmeh/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    // 1 Cotmeh 2726 = 1 October 2026.
    expect(onChange).toHaveBeenCalledWith("2026-10-01");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("reads a Gregorian max date as Gregorian in the Kurdish calendar", () => {
    render(<DatePickerInput value="2026-10-18" maxDate="2026-10-18" onChange={vi.fn()} calendar="kurdish" language="ckb" />);
    fireEvent.click(screen.getByRole("button", { name: /Open calendar/ }));

    // 26 Rezber 2726: earlier days stay open, later ones are disabled.
    expect(screen.getByText("٢٥").closest(".rmdp-day")).not.toHaveClass("rmdp-disabled");
    expect(screen.getByText("٢٧").closest(".rmdp-day")).toHaveClass("rmdp-disabled");
  });

  it("shows the placeholder, else the format, while empty", () => {
    const { rerender } = render(<DatePickerInput value="" onChange={vi.fn()} calendar="jalali" format="jYYYY/jMM/jDD" />);
    expect(screen.getByText("YYYY/MM/DD")).toBeInTheDocument();
    rerender(<DatePickerInput value="" onChange={vi.fn()} placeholder="Birthday" />);
    expect(screen.getByText("Birthday")).toBeInTheDocument();
  });
});

describe("DatePicker", () => {
  it("returns a Jalali string with time in calendar mode", () => {
    const onChange = vi.fn();
    render(
      <DatePicker value="1405/07/26T10:30" onChange={onChange} onClose={vi.fn()} calendar="jalali" valueFormat="calendar" format="jYYYY/jMM/jDD" />,
    );
    // A value with time opens on the time tab.
    expect(screen.getByRole("dialog", { name: "Select time" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Date" }));
    fireEvent.click(screen.getByText("۲۰"));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onChange).toHaveBeenCalledWith("1405/07/20T10:30");
  });

  it("reads calendar-mode string bounds in the shown calendar", () => {
    render(<DatePicker value="1405/07/26" onChange={vi.fn()} onClose={vi.fn()} calendar="jalali" valueFormat="calendar" minDate="1405/07/10" showTime={false} />);
    expect(screen.getByText("۹").closest(".rmdp-day")).toHaveClass("rmdp-disabled");
    expect(screen.getByText("۱۰").closest(".rmdp-day")).not.toHaveClass("rmdp-disabled");
  });

  it("opens an empty picker on the latest allowed day when that's in the past", () => {
    render(<DatePicker value="" onChange={vi.fn()} onClose={vi.fn()} maxDate="2000-06-15" showTime={false} />);
    expect(document.querySelector(".rmdp-header-values")).toHaveTextContent(/June.*2000/);
  });

  it("closes on Escape, cancel and a click outside, without a value", () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(<DatePicker value="" onChange={onChange} onClose={onClose} />);

    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(screen.getByRole("presentation"));
    expect(onClose).toHaveBeenCalledTimes(3);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("uses the labels it's given", () => {
    render(<DatePicker value="" onChange={vi.fn()} onClose={vi.fn()} labels={{ selectDate: "انتخاب تاریخ", confirm: "تأیید" }} />);
    expect(screen.getByRole("dialog", { name: "انتخاب تاریخ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "تأیید" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders in place with portal={false}", () => {
    const { container } = render(<DatePicker value="" onChange={vi.fn()} onClose={vi.fn()} portal={false} />);
    expect(container.querySelector(".dtp-dialog")).toBeInTheDocument();
  });

  it("picks a time", () => {
    const onChange = vi.fn();
    render(<DatePicker value="2026-10-18T08:00" onChange={onChange} onClose={vi.fn()} />);
    fireEvent.click(within(screen.getByRole("listbox", { name: "HH" })).getByRole("option", { name: "14" }));
    fireEvent.click(within(screen.getByRole("listbox", { name: "MM" })).getByRole("option", { name: "45" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith("2026-10-18T14:45");
  });
});
