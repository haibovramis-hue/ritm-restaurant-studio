import { useEffect, useState } from "react";
import { eventDate, rigaToday } from "@/lib/dates";
import { useBooking } from "@/lib/booking-context";
import { Brain, CalendarDays, Music } from "lucide-react";
import { MAIN_PHONE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { IMG } from "@/lib/images";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { ArchPhoto } from "./Design";

export function Events() {
  const { l, lang } = useI18n();
  const E = C.events;
  const [today, setToday] = useState("");
  useEffect(() => { setToday(rigaToday()); }, []);
  const upcoming = today ? E.list.map(([d]) => `2026-11-${String(d).padStart(2, "0")}`).find((x) => x >= today) : undefined;
  const { openBooking } = useBooking();
  const visible = today ? E.list.filter(([d]) => `2026-11-${String(d).padStart(2, "0")}` >= today) : [];
  const cards = [
    { icon: Brain, day: E.fri, t: E.friT, d: E.friD, img: IMG.quizNight },
    { icon: Music, day: E.sat, t: E.satT, d: E.satD, img: IMG.celebrations },
  ];
  return (
    <section id="events" className="scroll-mt-[60px] bg-paper px-5 py-16 text-coal md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr_1.1fr]">
        {cards.map((card, i) => <Reveal key={card.t.en} delay={i * 100}><article className="flex h-full flex-col border-t border-coal/20 pt-4"><ArchPhoto src={card.img} alt={l(card.t)} width={787} height={1400} className="h-64" /><card.icon className="mt-5 h-5 w-5 text-ember" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em]">{l(card.day)}</p><h3 className="poster-type mt-2 text-4xl">{l(card.t)}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l(card.d)}</p></article></Reveal>)}
        <Reveal delay={150}><div className="flex h-full min-w-0 flex-col border border-coal/20 bg-paper-2 p-5"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"><CalendarDays className="h-4 w-4 text-ember" />{l(E.cal)}</p><p className="poster-type mt-3 text-5xl">{l(E.month)}</p><ul className="mt-4 flex-1 divide-y divide-coal/20">{visible.map(([d, t], i) => { const iso = `2026-11-${String(d).padStart(2, "0")}`; const past = today && iso < today; const next = iso === upcoming; return <li key={i} className={`flex items-baseline gap-3 py-2.5 ${past ? "opacity-45" : ""} ${next ? "-ml-3 border-l-2 border-ember pl-2 font-semibold" : ""}`}><span className="w-24 shrink-0 text-sm font-semibold">{eventDate(iso, lang)}</span><p className="min-w-0 flex-1 break-words text-sm">{l(t)}</p></li>; })}</ul>{today && visible.length === 0 && <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{l(E.noDates)} {MAIN_PHONE}</p>}<Button type="button" onClick={openBooking} className="mt-5">{l(E.cta)}</Button></div></Reveal>
      </div>
    </section>
  );
}
