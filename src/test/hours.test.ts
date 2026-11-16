import { describe, expect, it } from "vitest";
import { isOpenAt, openingStatusAt } from "@/lib/config";

// Riga is UTC+2 in November (EET).
describe("opening hours (Riga time)", () => {
  it("open Thursday 21:30", () => expect(isOpenAt(new Date("2026-11-12T19:30:00Z"))).toBe(true));
  it("closed Thursday 22:30", () => expect(isOpenAt(new Date("2026-11-12T20:30:00Z"))).toBe(false));
  it("open Friday 22:30 (closes 23:00)", () => expect(isOpenAt(new Date("2026-11-13T20:30:00Z"))).toBe(true));
  it("closed Saturday 23:10", () => expect(isOpenAt(new Date("2026-11-14T21:10:00Z"))).toBe(false));
  it("closed before noon", () => expect(isOpenAt(new Date("2026-11-15T09:00:00Z"))).toBe(false));
  it("gives the exact closing and next opening times for the header", () => {
    expect(openingStatusAt(new Date("2026-11-13T20:30:00Z"))).toEqual({ open: true, close: "23:00", next: "12:00" });
    expect(openingStatusAt(new Date("2026-11-15T09:00:00Z"))).toEqual({ open: false, close: "22:00", next: "12:00" });
  });
});
