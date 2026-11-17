import { useEffect, useState } from "react";
import { eventDate, rigaToday } from "@/lib/dates";
import { useBooking } from "@/lib/booking-context";
import { MAIN_PHONE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { IMG } from "@/lib/images";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";
import { ArchPhoto, SectionLabel } from "./Design";
import { gutterCls, wrapCls } from "./Section";

export function Events() {
  const { l, lang } = useI18n();
  const E = C.events;
  const [today, setToday] = useState("");
  useEffect(() => { setToday(rigaToday()); }, []);
  const upcoming = today ? E.list.map(([d]) => `2026-11-${String(d).padStart(2, "0")}`).find((x) => x >= today) : undefined;
  const { openBooking } = useBooking();
  const visible = today ? E.list.filter(([d]) => `2026-11-${String(d).padStart(2, "0")}` >= today) : [];
  const cards = [
    { day: E.fri, t: E.friT, d: E.friD, img: IMG.quizNight },
    { day: E.sat, t: E.satT, d: E.satD, img: IMG.celebrations },
  ];
  return (
    <section id="events" className={`section-pad scroll-mt-[var(--header-h)] bg-paper text-coal ${gutterCls}`}>
      <div className={`${wrapCls} grid gap-x-8 gap-y-14 lg:grid-cols-3`}>
        {cards.map((card, i) => <Reveal key={card.t.en} delay={i * 100}><article><ArchPhoto src={card.img} alt={l(card.t)} width={787} height={1400} className="aspect-[4/5]" /><SectionLabel className="mt-6">{l(card.day)}</SectionLabel><h3 className="poster-type mt-3 text-[2rem]">{l(card.t)}</h3><p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{l(card.d)}</p></article></Reveal>)}
        <Reveal delay={150}>
          <div className="flex h-full min-w-0 flex-col">
            <SectionLabel>{l(E.cal)}</SectionLabel>
            <p className="poster-type mt-3 text-[2.5rem]">{l(E.month)}</p>
            <ul className="mt-6 flex-1 border-t border-coal/15">{visible.map(([d, t], i) => { const iso = `2026-11-${String(d).padStart(2, "0")}`; const next = iso === upcoming; return <li key={i} className={`flex items-baseline gap-4 border-b border-coal/15 py-4 ${next ? "text-coal" : "text-coal/60"}`}><span className="w-24 shrink-0 text-sm tabular-nums">{eventDate(iso, lang)}</span><p className="min-w-0 flex-1 break-words text-[15px]">{l(t)}</p>{next && <span className="h-2 w-2 shrink-0 self-center rounded-full bg-ember" aria-hidden="true" />}</li>; })}</ul>
            {today && visible.length === 0 && <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">{l(E.noDates)} {MAIN_PHONE}</p>}
            <Button type="button" onClick={openBooking} className="mt-8 self-start">{l(E.cta)}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
