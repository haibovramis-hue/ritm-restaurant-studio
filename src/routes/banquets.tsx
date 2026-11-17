import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { tr, useI18n } from "@/lib/i18n";
import { B } from "@/lib/copy-pages";
import { C, SIMPLE } from "@/lib/copy";
import { MAIN_PHONE, mailLink, tel } from "@/lib/config";
import { fmtDate, rigaToday } from "@/lib/dates";
import { Field, PhotoBlock, gutterCls, inputCls, pillBtn, wrapCls } from "@/components/site/Section";
import { ContactActions, ContactLinks, contactChannel, openContact } from "@/components/site/ContactActions";
import { PosterHeading, SectionLabel } from "@/components/site/Design";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/banquets")({
  head: () => ({ ...pageHead("/banquets", "Banketi un svinības Rīgā — Zelta Pakavs", "Kāzas, jubilejas un ģimenes svinības Zelta Pakavā. Zāles līdz 100 viesiem, vasarā kopā ar terasi līdz 300. Pieteikumi pa tālruni vai e-pastā.") }),
  validateSearch: (s: Record<string, unknown>): { occasion?: string } => (typeof s["occasion"] === "string" ? { occasion: s["occasion"] } : {}),
  component: Banquets,
});

/** Capacity comes from the restaurant’s banquet facts; the places are the ones on zeltapakavs.lv/terases. Nothing here promises service. */
const T = {
  label: tr("Banketi", "Банкеты", "Banquets"),
  lead: tr("Viens liels galds visiem, kurus vēlaties redzēt blakus.", "Один большой стол для всех, кого вы хотите видеть рядом.", "One big table for everyone you want beside you."),
  body: tr(
    "Kāzas, jubileja, kristības, korporatīvais vakars vai bērnu svētki. Zāles uzņem līdz 100 viesiem, vasarā kopā ar terasi — līdz 300. Galdu klājam no mūsu ēdienkartes: grils, uzkodas, siltie ēdieni. Stāvvieta ir sava un bezmaksas.",
    "Свадьба, юбилей, крестины, корпоратив или детский праздник. Залы принимают до 100 гостей, летом вместе с террасой — до 300. Стол накрываем из нашего меню: мангал, закуски, горячее. Парковка своя и бесплатная.",
    "A wedding, an anniversary, a christening, a company evening or a kids’ party. The halls take up to 100 guests, up to 300 in summer with the terrace. The table is laid from our own menu: the grill, starters, hot dishes. Parking is ours and free.",
  ),
  placesTitle: tr("Kur klāt galdu", "Где накрыть стол", "Where to lay the table"),
  places: [
    { img: "hallWedding" as const, t: tr("Zāle", "Зал", "The hall"), d: tr("Slēgta zāle kāzām vai jubilejai — līdz 100 viesiem.", "Закрытый зал для свадьбы или юбилея — до 100 гостей.", "A closed hall for a wedding or an anniversary, up to 100 guests.") },
    { img: "verandaLong" as const, t: tr("Veranda", "Веранда", "The veranda"), d: tr("Iestiklota veranda ar skatu uz dārzu: garš galds ģimenei un draugiem.", "Застеклённая веранда с видом в сад: длинный стол для семьи и друзей.", "A glazed veranda looking onto the garden: one long table for family and friends.") },
    { img: "gazebo" as const, t: tr("Dārzs", "Сад", "The garden"), d: tr("Vasarā — teltis un terases dārzā. Kopā ar zālēm uzņemam līdz 300 viesiem.", "Летом — шатры и террасы в саду. Вместе с залами принимаем до 300 гостей.", "In summer, tents and terraces in the garden. With the halls, up to 300 guests.") },
  ],
  stepsTitle: tr("Kā tas notiek", "Как это происходит", "How it works"),
  steps: [
    { n: "01", t: tr("Pieteikums", "Заявка", "Your request"), d: tr("Atstājiet datumu, viesu skaitu un notikumu — vai vienkārši piezvaniet.", "Оставьте дату, число гостей и повод — или просто позвоните.", "Leave the date, the headcount and the occasion, or simply call.") },
    { n: "02", t: tr("Atbilde", "Ответ", "Our reply"), d: tr("Sazināsimies, ieteiksim zāli un piedāvāsim ēdienkarti.", "Свяжемся, подскажем зал и предложим меню.", "We get back to you, suggest a hall and propose a menu.") },
    { n: "03", t: tr("Svētki", "Праздник", "The day"), d: tr("Saskaņojam datumu un galdu. Par pārējo parūpēsimies mēs.", "Согласуем дату и стол. Об остальном позаботимся мы.", "We agree on the date and the table. The rest is on us.") },
  ],
};

function Banquets() {
  const { l } = useI18n();
  const F = B.form, W = C.wa;
  const { occasion: preset } = Route.useSearch();
  const [today, setToday] = useState("");
  const [f, setF] = useState({ date: "", guests: "", occasion: 0, name: "", phone: "", comment: "" });
  useEffect(() => { const date = rigaToday(); setToday(date); setF((p) => ({ ...p, date: p.date || date })); }, []);
  useEffect(() => { if (preset === "xmas") setF((p) => ({ ...p, occasion: B.xmasIndex })); }, [preset]);
  const set = (k: "date" | "guests" | "name" | "phone" | "comment") => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const message = () => [l(F.msg), `${l(W.date)}: ${fmtDate(f.date)}`, `${l(W.guests)}: ${f.guests}`, `${l(W.occasion)}: ${l(B.occasions[f.occasion]!)}`, `${l(W.name)}: ${f.name}`, `${l(W.phone)}: ${f.phone}`, `${l(W.comments)}: ${f.comment.trim() || "-"}`].join("\n");
  const submit = (e: FormEvent) => { e.preventDefault(); openContact(contactChannel(e), message(), l(F.msg)); };
  return (
    <>
      <PhotoBlock img={IMG.banquetTables} title={l(B.title)} line={l(SIMPLE.banqD)} h1><ContactLinks subject={l(B.form.msg)} /></PhotoBlock>

      {/* What we offer, said plainly. */}
      <section className={`section-pad bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-8 md:grid-cols-12`}>
          <SectionLabel className="md:col-span-3 md:pt-4">{l(T.label)}</SectionLabel>
          <div className="md:col-span-9">
            <p className="max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] font-light leading-[1.08] tracking-[-0.025em]">{l(T.lead)}</p>
            <p className="mt-8 max-w-[58ch] text-[18px] leading-relaxed text-muted-foreground">{l(T.body)}</p>
          </div>
        </div>
      </section>

      {/* Three places to sit. */}
      <section className={`bg-paper pb-[clamp(4.5rem,10vw,9rem)] text-coal ${gutterCls}`}>
        <div className={wrapCls}>
          <h2 className="eyebrow opacity-60">{l(T.placesTitle)}</h2>
          <div className="mt-6 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {T.places.map((p) => (
              <figure key={p.img}>
                <div className="aspect-[4/5] overflow-hidden bg-coal-2"><img src={IMG[p.img]} alt={l(p.t)} width={1200} height={1500} loading="lazy" decoding="async" className="photo-grade h-full w-full object-cover" /></div>
                <figcaption className="mt-5"><span className="poster-type block text-[2rem]">{l(p.t)}</span><span className="mt-2 block max-w-[34ch] text-[16px] leading-relaxed text-muted-foreground">{l(p.d)}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How it works. */}
      <section className={`section-pad bg-paper-2 text-coal ${gutterCls}`}>
        <div className={wrapCls}>
          <h2 className="eyebrow opacity-60">{l(T.stepsTitle)}</h2>
          <ol className="mt-6 grid border-t border-coal/15 md:grid-cols-3">
            {T.steps.map((p, i) => (
              <li key={p.n} className={`border-b border-coal/15 py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:border-coal/15 md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}>
                <span className="text-sm tabular-nums text-ember">{p.n}</span>
                <h3 className="poster-type mt-4 text-[2.25rem]">{l(p.t)}</h3>
                <p className="mt-4 max-w-[34ch] text-[17px] leading-relaxed text-muted-foreground">{l(p.d)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The request. */}
      <section id="request" className={`section-pad scroll-mt-[var(--header-h)] bg-coal text-paper ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <PosterHeading>{l(F.title)}</PosterHeading>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-relaxed text-paper/60">{l(B.promise)}</p>
            <a href={tel(MAIN_PHONE)} className="mt-8 block font-display text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.03em] transition-colors hover:text-ember">{MAIN_PHONE}</a>
          </div>
          <div className="rounded-[2px] bg-paper p-6 text-coal md:p-10">
            <div className="flex flex-wrap gap-2" role="group" aria-label={l(F.occasion)}>{B.occasions.map((o, i) => <button key={o.en} type="button" aria-pressed={f.occasion === i} onClick={() => setF({ ...f, occasion: i })} className={`min-h-11 rounded-full border px-5 text-[15px] transition-colors ${f.occasion === i ? "border-coal bg-coal text-paper" : "border-coal/20 hover:border-coal/50"}`}>{l(o)}</button>)}</div>
            <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label={l(F.date)}><input required type="date" min={today || undefined} className={inputCls} value={f.date} onChange={set("date")} /></Field>
              <Field label={l(F.guests)}><input required type="number" min={1} max={300} inputMode="numeric" className={inputCls} value={f.guests} onChange={set("guests")} /></Field>
              <Field label={l(F.name)}><input required autoComplete="name" className={inputCls} value={f.name} onChange={set("name")} /></Field>
              <Field label={l(F.phone)}><input required type="tel" autoComplete="tel" className={inputCls} value={f.phone} onChange={set("phone")} /></Field>
              <div className="sm:col-span-2"><Field label={l(F.comment)}><textarea rows={3} className={inputCls} value={f.comment} onChange={set("comment")} /></Field></div>
              <ContactActions />
            </form>
          </div>
        </div>
      </section>

      {/* The memorial meal: quiet, separate. */}
      <section id="memorial" className={`section-pad scroll-mt-[var(--header-h)] bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid items-center gap-12 md:grid-cols-2 md:gap-20`}>
          <img src={IMG.memorialPoster} alt={l(B.memorial.title)} loading="lazy" decoding="async" width={1058} height={1400} className="mx-auto w-full max-w-md" />
          <div>
            <SectionLabel>{l(B.memorial.eyebrow)}</SectionLabel>
            <PosterHeading className="mt-5">{l(B.memorial.title)}</PosterHeading>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-muted-foreground">{l(B.memorial.text)}</p>
            <p className="mt-8 font-display text-3xl font-light tracking-[-0.02em]">{l(B.memorial.price)}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"><a href={tel(MAIN_PHONE)} className={pillBtn}>{l(B.memorial.call)}</a><a href={mailLink(l(B.memorial.msg), l(B.memorial.msg))} className="line-link">{l(B.memorial.write)}<ArrowRight aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>
    </>
  );
}
