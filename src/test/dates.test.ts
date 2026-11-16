import { describe, expect, it } from "vitest";
import { eventDate, fmtDate, nextSlot, rigaToday } from "@/lib/dates";

describe("dates", () => {
  it("formats WhatsApp dates as DD.MM.YYYY", () => { expect(fmtDate("2026-11-14")).toBe("14.11.2026"); });
  it("uses the Riga calendar day", () => { expect(rigaToday(new Date("2026-11-12T22:30:00Z"))).toBe("2026-11-13"); });
  it("defaults to the next full hour inside opening hours", () => {
    expect(nextSlot(new Date("2026-11-12T16:20:00Z"))).toEqual({ date: "2026-11-12", time: "19:00" }); // Thu 18:20 Riga
    expect(nextSlot(new Date("2026-11-12T07:00:00Z"))).toEqual({ date: "2026-11-12", time: "12:00" }); // 09:00 Riga
    expect(nextSlot(new Date("2026-11-12T19:30:00Z"))).toEqual({ date: "2026-11-13", time: "12:00" }); // Thu 21:30, closes 22
  });
  it("localizes event weekdays", () => {
    expect(eventDate("2026-11-06", "lv")).toBe("Pk 6.11.");
    expect(eventDate("2026-11-07", "ru")).toBe("Сб, 7 ноября");
    expect(eventDate("2026-11-06", "en")).toBe("Fri 6 Nov");
  });
});
