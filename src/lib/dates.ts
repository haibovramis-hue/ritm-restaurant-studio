import { HOURS } from "./config";
import type { Lang } from "./i18n";

/** Calendar parts of a moment in Europe/Riga. */
function riga(d: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short", hour12: false }).formatToParts(d).map((x) => [x.type, x.value]));
  return { iso: `${p['year']}-${p['month']}-${p['day']}`, hour: Number(p['hour']) % 24, minute: Number(p['minute']), wd: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p['weekday']!) };
}
const addDay = (iso: string) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };

/** Today's date (YYYY-MM-DD) in Riga. */
export const rigaToday = (now = new Date()) => riga(now).iso;

/** Next full hour within opening hours; rolls to the next day's opening when it's too late today. */
export function nextSlot(now = new Date()): { date: string; time: string } {
  const r = riga(now);
  const [open, close] = HOURS[r.wd] ?? [12, 22];
  const h = Math.max(open, r.hour + 1);
  if (h <= close - 1) return { date: r.iso, time: `${String(h).padStart(2, "0")}:00` };
  const next = addDay(r.iso); const wd = (r.wd + 1) % 7;
  return { date: next, time: `${String((HOURS[wd] ?? [12, 22])[0]).padStart(2, "0")}:00` };
}

/** "2026-11-14" → "14.11.2026" for WhatsApp messages. */
export const fmtDate = (iso: string) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso); return m ? `${m[3]}.${m[2]}.${m[1]}` : iso; };

/** Localized short event date: LV "Pk 6.11.", RU "Пт, 6 ноября", EN "Fri 6 Nov". */
export function eventDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T12:00:00Z`); const wd = d.getUTCDay(); const day = d.getUTCDate(); const mo = d.getUTCMonth();
  if (lang === "lv") return `${["Sv", "P", "O", "T", "C", "Pk", "S"][wd]} ${day}.${mo + 1}.`;
  if (lang === "ru") return `${["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][wd]}, ${day} ${["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][mo]}`;
  return `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][wd]} ${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mo]}`;
}
