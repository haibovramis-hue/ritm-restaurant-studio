import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { tr, useI18n } from "@/lib/i18n";
import { B } from "@/lib/copy-pages";
import { C, SIMPLE } from "@/lib/copy";
import { MAIN_PHONE, mailLink, tel } from "@/lib/config";
import { fmtDate, rigaToday } from "@/lib/dates";
import { CaptionPhoto, Field, PhotoBlock, gutterCls, inputCls, pillBtn, wrapCls } from "@/components/site/Section";
import { ContactActions, ContactLinks, contactChannel, openContact } from "@/components/site/ContactActions";
import { PosterHeading, SectionLabel } from "@/components/site/Design";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/banquets")({
  head: () => ({ ...pageHead("/banquets", "Banketi un svinības Rīgā — Zelta Pakavs", "Kāzas, jubilejas un ģimenes svinības Zelta Pakavā. Zāles līdz 100 viesiem, vasarā kopā ar terasi līdz 300. Pieteikumi pa tālruni vai e-pastā.") }),
  validateSearch: (s: Record<string, unknown>): { occasion?: string } => (typeof s["occasion"] === "string" ? { occasion: s["occasion"] } : {}),
  component: Banquets,
});

const STEPS = [tr("Iesniedziet pieteikumu", "Оставьте заявку", "Send your request"), tr("Mēs atbildam", "Мы отвечаем", "We reply"), tr("Saskaņojam datumu un ēdienkarti", "Согласуем дату и меню", "We agree on the date and menu")];
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

      <section className={`section-pad bg-paper text-coal ${gutterCls}`}>
        <div className={wrapCls}>
          <ul className="grid gap-x-12 border-t border-coal/15 md:grid-cols-3">{B.facts.map((x) => <li key={x.en} className="border-b border-coal/15 py-6 font-display text-[1.6rem] font-light leading-tight tracking-[-0.02em] md:border-b-0 md:py-8 md:text-[2rem]">{l(x)}</li>)}</ul>
          <ol className="mt-14 grid gap-x-12 gap-y-6 md:mt-20 md:grid-cols-3">{STEPS.map((s, i) => <li key={s.en} className="flex items-baseline gap-4"><span className="text-sm tabular-nums text-ember">0{i + 1}</span><span className="text-[17px]">{l(s)}</span></li>)}</ol>
        </div>
      </section>

      <section className={`bg-paper pb-[clamp(4.5rem,10vw,9rem)] text-coal ${gutterCls}`}><CaptionPhoto src={IMG.hallWedding} alt={l(B.title)} caption={l(B.hallCaption)} /></section>

      <section id="request" className={`section-pad scroll-mt-[var(--header-h)] bg-paper-2 text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <PosterHeading>{l(F.title)}</PosterHeading>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-relaxed text-muted-foreground">{l(B.promise)}</p>
            <a href="#memorial" className="line-link mt-6">{l(B.memorial.title)}<ArrowRight aria-hidden="true" /></a>
          </div>
          <div>
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

      <section id="memorial" className={`section-pad scroll-mt-[var(--header-h)] bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid items-center gap-12 md:grid-cols-2 md:gap-20`}>
          <img src={IMG.memorialPoster} alt={l(B.memorial.title)} loading="lazy" decoding="async" width={1058} height={1400} className="photo-grade mx-auto w-full max-w-md" />
          <div>
            <SectionLabel>{l(B.memorial.eyebrow)}</SectionLabel>
            <PosterHeading className="mt-5">{l(B.memorial.title)}</PosterHeading>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-muted-foreground">{l(B.memorial.text)}</p>
            <p className="mt-8 font-display text-3xl font-light tracking-[-0.02em]">{l(B.memorial.price)}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"><a href={tel(MAIN_PHONE)} className={pillBtn}>{l(B.memorial.call)}</a><a href={mailLink(l(B.memorial.msg), l(B.memorial.msg))} className="line-link">{l(B.memorial.write)}</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
