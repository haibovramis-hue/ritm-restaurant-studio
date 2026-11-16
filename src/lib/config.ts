// Single place to change contact numbers, links and confirmed booking channels.
export const WHATSAPP_NUMBER = "+37167403313";
export const MAIN_PHONE = "+371 67403313";
export const SAUNA_PHONE = "+371 22509999";
export const SAUNA_CONTACT_PHONE = "+371 25997750";
export const SAUNA_CONTACT = "Sergejs";
// Set to true only once the owner confirms a WhatsApp number.
export const WHATSAPP_CONFIRMED = false;
export const SAUNA_WHATSAPP_CONFIRMED = false;
export const INSTAGRAM_URL = "https://www.instagram.com/zeltapakavs/";
export const EMAIL = "zeltapakavs@gmail.com";
export const ADDRESS = "Jūrmalas gatve 80, Rīga";
export const INSTAGRAM = "https://instagram.com/zeltapakavs";
export const FACEBOOK = "https://www.facebook.com/restorans.zeltapakavs";
export const GOOGLE_RATING = "4,3";
export const GOOGLE_REVIEWS = "1 455";
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Zelta+pakavs+J%C5%ABrmalas+gatve+80+R%C4%ABga";
export const MAPS_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=J%C5%ABrmalas+gatve+80%2C+R%C4%ABga";
export const WAZE_URL = "https://waze.com/ul?q=J%C5%ABrmalas%20gatve%2080%2C%20R%C4%ABga&navigate=yes";
/** Opening hours by JS weekday (0 = Sunday), in Riga time. */
export const HOURS: Record<number, [number, number]> = { 0: [12, 22], 1: [12, 22], 2: [12, 22], 3: [12, 22], 4: [12, 22], 5: [12, 23], 6: [12, 23] };
export const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
export const waLink = (text?: string, number = WHATSAPP_NUMBER) => `https://wa.me/${number.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const mailLink = (subject: string, body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export function openingStatusAt(date: Date): { open: boolean; close: string; next: string } {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(date);
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find((p) => p.type === "weekday")!.value);
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  const [o, c] = HOURS[wd]!;
  const now = h + m / 60;
  return { open: now >= o && now < c, close: `${String(c).padStart(2, "0")}:00`, next: `${String(o).padStart(2, "0")}:00` };
}

/** Is the restaurant open at the given moment (evaluated in Europe/Riga)? */
export const isOpenAt = (date: Date) => openingStatusAt(date).open;
