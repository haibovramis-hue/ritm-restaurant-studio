import { useEffect, useState, type FormEvent } from "react";
import { fmtDate, rigaToday } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { ContactActions, contactChannel, openContact } from "./ContactActions";
import { Field, inputCls } from "./Section";

export function BookingForm() {
  const { l } = useI18n();
  const b = C.booking, W = C.wa;
  const [f, setF] = useState({ date: "", time: "19:00", guests: "2", name: "", phone: "" });
  const [today, setToday] = useState("");
  useEffect(() => { const t = rigaToday(); setToday(t); setF((p) => (p.date ? p : { ...p, date: t })); }, []);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const message = () => [l(b.msg), `${l(W.date)}: ${fmtDate(f.date)}`, `${l(W.time)}: ${f.time}`, `${l(W.guests)}: ${f.guests}`, `${l(W.name)}: ${f.name}`, `${l(W.phone)}: ${f.phone}`].join("\n");
  const submit = (e: FormEvent) => { e.preventDefault(); openContact(contactChannel(e), message(), l(b.msg)); };
  return (
    <form onSubmit={submit} className="grid h-full gap-4 border border-coal/20 bg-paper p-5 text-coal sm:grid-cols-3 sm:p-6">
      <div className="sm:col-span-3">
        <h3 className="poster-type text-4xl">{l(b.eyebrow)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l(b.sub)}</p>
      </div>
      <Field label={l(b.date)}><input required type="date" min={today || undefined} className={inputCls} value={f.date} onChange={set("date")} /></Field>
      <Field label={l(b.time)}><input required type="time" className={inputCls} value={f.time} onChange={set("time")} /></Field>
      <Field label={l(b.guests)}><input required type="number" min={1} max={300} inputMode="numeric" className={inputCls} value={f.guests} onChange={set("guests")} /></Field>
      <div className="grid gap-4 sm:col-span-3 sm:grid-cols-2">
        <Field label={l(b.name)}><input required autoComplete="name" className={inputCls} value={f.name} onChange={set("name")} /></Field>
        <Field label={l(b.phone)}><input required type="tel" autoComplete="tel" className={inputCls} value={f.phone} onChange={set("phone")} /></Field>
      </div>
      <div className="sm:col-span-3"><ContactActions /></div>
    </form>
  );
}
