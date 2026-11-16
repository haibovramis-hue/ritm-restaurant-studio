import { describe, expect, it } from "vitest";
import { contactHref } from "@/components/site/ContactActions";
import { EMAIL, MAIN_PHONE, SAUNA_CONTACT_PHONE, SAUNA_WHATSAPP_CONFIRMED, WHATSAPP_CONFIRMED } from "@/lib/config";

describe("verified booking channels", () => {
  it("keeps WhatsApp hidden until the owner confirms a number", () => {
    expect(WHATSAPP_CONFIRMED).toBe(false);
    expect(SAUNA_WHATSAPP_CONFIRMED).toBe(false);
  });
  it("calls the restaurant landline for table bookings", () => {
    expect(contactHref("call", "details", "subject")).toBe("tel:+37167403313");
    expect(MAIN_PHONE).toBe("+371 67403313");
  });
  it("uses the official Gmail address and preserves the filled-in message", () => {
    const href = contactHref("email", "Datums: 13.11.2026\nViesi: 2", "Galdiņa rezervācija");
    expect(href).toBe(`mailto:${EMAIL}?subject=${encodeURIComponent("Galdiņa rezervācija")}&body=${encodeURIComponent("Datums: 13.11.2026\nViesi: 2")}`);
    expect(EMAIL).toBe("zeltapakavs@gmail.com");
  });
  it("routes sauna booking calls to Sergejs", () => {
    expect(contactHref("call", "details", "subject", SAUNA_CONTACT_PHONE)).toBe("tel:+37125997750");
  });
});
