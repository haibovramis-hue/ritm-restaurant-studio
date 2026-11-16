import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Car, Phone, Sun, Users } from "lucide-react";
import { tr, useI18n } from "@/lib/i18n";
import { B } from "@/lib/copy-pages";
import { C, CAPACITY, SIMPLE } from "@/lib/copy";
import { MAIN_PHONE, mailLink, tel } from "@/lib/config";
import { fmtDate, rigaToday } from "@/lib/dates";
import { Field, PhotoBlock, inputCls, pillBtn } from "@/components/site/Section";
import { ContactActions, ContactLinks, contactChannel, openContact } from "@/components/site/ContactActions";
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
  const factIcons = [Users, Sun, Car];
  return (
    <>
      <PhotoBlock img={IMG.banquetTables} title={l(B.title)} line={l(SIMPLE.banqD)} h1 tall compact><ContactLinks subject={l(B.form.msg)} /></PhotoBlock>
      <ol className="mx-auto grid max-w-6xl gap-3 px-5 pt-8 sm:grid-cols-3">{STEPS.map((s, i) => <li key={s.en} className="flex items-center gap-3 border-t-2 border-ember pt-3"><span className="font-display text-3xl font-black text-ember tabular-nums">0{i + 1}</span><span className="text-sm font-semibold">{l(s)}</span></li>)}</ol>
      <ul className="mx-auto grid max-w-6xl gap-x-8 px-5 py-8 text-sm sm:grid-cols-3">{B.facts.map((x, i) => { const I = factIcons[i]!; return <li key={x.en} className="flex min-h-14 items-center gap-3 border-b border-coal/20"><I className="h-5 w-5 shrink-0 text-ember" />{l(x)}</li>; })}</ul>
      <section className="relative h-[42svh] min-h-[260px] overflow-hidden bg-coal text-paper md:h-[56vh]">
        <img src={IMG.hallWedding} alt={l(B.title)} width={1400} height={788} loading="lazy" decoding="async" className="photo-grade absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-coal/20 to-transparent" aria-hidden="true" />
        <p className="poster-type relative mx-auto flex h-full max-w-6xl items-end px-5 pb-7 text-[clamp(1.6rem,5vw,3rem)]">{l(B.hallCaption)}</p>
      </section>
      <section id="request" className="scroll-mt-[60px] bg-paper-2 px-4 py-12 md:py-20">
        <h2 className="poster-type mx-auto max-w-3xl text-5xl md:text-7xl">{l(F.title)}</h2>
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap gap-2" role="group" aria-label={l(F.occasion)}>{B.occasions.map((o, i) => <button key={o.en} type="button" aria-pressed={f.occasion === i} onClick={() => setF({ ...f, occasion: i })} className={`min-h-11 border-[1.5px] px-4 text-sm font-medium transition ${f.occasion === i ? "border-ember bg-ember text-paper" : "border-coal/30 bg-paper hover:border-coal"}`}>{l(o)}</button>)}</div>
        <a href="#memorial" className="mx-auto mt-3 block max-w-3xl text-sm font-semibold underline underline-offset-4">{l(B.memorial.title)} →</a>
        <p className="mx-auto mb-6 mt-3 max-w-3xl text-muted-foreground">{l(B.promise)}</p>
        <form onSubmit={submit} className="mx-auto grid max-w-3xl gap-4 border border-coal/20 bg-paper p-5 text-coal sm:grid-cols-2 md:p-8">
          <Field label={l(F.date)}><input required type="date" min={today || undefined} className={inputCls} value={f.date} onChange={set("date")} /></Field>
          <Field label={l(F.guests)}><input required type="number" min={1} max={300} inputMode="numeric" className={inputCls} value={f.guests} onChange={set("guests")} /></Field>
          <div className="sm:col-span-2"><Field label={l(F.occasion)}><select className={inputCls} value={f.occasion} onChange={(e) => setF({ ...f, occasion: Number(e.target.value) })}>{B.occasions.map((o, i) => <option key={o.en} value={i}>{l(o)}</option>)}</select></Field></div>
          <Field label={l(F.name)}><input required autoComplete="name" className={inputCls} value={f.name} onChange={set("name")} /></Field>
          <Field label={l(F.phone)}><input required type="tel" autoComplete="tel" className={inputCls} value={f.phone} onChange={set("phone")} /></Field>
          <div className="sm:col-span-2"><Field label={l(F.comment)}><textarea rows={3} className={inputCls} value={f.comment} onChange={set("comment")} /></Field></div>
          <ContactActions />
        </form>
      </section>
      <section id="memorial" className="scroll-mt-[60px] bg-paper px-4 py-12 text-coal md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <img src={IMG.memorialPoster} alt={l(B.memorial.title)} loading="lazy" decoding="async" width={1058} height={1400} className="mx-auto w-full max-w-sm border border-coal/20" />
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{l(B.memorial.eyebrow)}</p><h2 className="poster-type mt-3 text-5xl">{l(B.memorial.title)}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{l(B.memorial.text)}</p><p className="mt-6 font-display text-3xl font-bold">{l(B.memorial.price)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={tel(MAIN_PHONE)} className={pillBtn}><Phone />{l(B.memorial.call)}</a><a href={mailLink(l(B.memorial.msg), l(B.memorial.msg))} className="inline-flex min-h-[52px] items-center justify-center border-[1.5px] border-coal px-5 py-3 text-xs font-semibold uppercase tracking-[0.09em]">{l(B.memorial.write)}</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
