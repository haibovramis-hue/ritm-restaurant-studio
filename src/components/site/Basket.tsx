import { useEffect, useState, type FormEvent } from "react";
import { nextSlot, rigaToday } from "@/lib/dates";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/lib/basket-context";
import { basketTotal, money, orderMessage, type OrderDetails } from "@/lib/basket";
import { findItem, type MenuItem } from "@/lib/menu";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { ContactActions, contactChannel, openContact } from "./ContactActions";

export function QuantityControl({ item }: { item: MenuItem }) {
  const { basket, bump } = useBasket(); const { l } = useI18n(); const qty = basket[item.id] ?? 0;
  return <div className="flex min-h-11 items-center gap-1">
    {qty > 0 && <><Button type="button" size="icon" variant="outline" aria-label={`${l(C.basket.remove)}: ${l(item.name)}`} onClick={() => bump(item.id, -1)}><Minus strokeWidth={1.5} /></Button><span className="w-6 text-center tabular-nums" aria-live="polite">{qty}</span></>}
    <Button type="button" size="icon" variant={qty ? "default" : "outline"} aria-label={`${l(qty ? C.basket.increase : C.basket.add)}: ${l(item.name)}`} onClick={() => bump(item.id, 1)}><Plus strokeWidth={1.5} /></Button>
  </div>;
}
const inputClass = "mt-2 min-h-[52px] w-full min-w-0 rounded-[2px] border border-coal/20 bg-paper px-4 py-3 text-base text-coal outline-none transition-colors hover:border-coal/40 focus:border-ember";

export function BasketPanel() {
  const { basket, clear } = useBasket(); const { l, lang } = useI18n(); const [open, setOpen] = useState(false);
  const [form, setForm] = useState<OrderDetails>({ mode: "dine", date: "", time: "", guests: "2", name: "", phone: "", comment: "" });
  useEffect(() => { if (open) { const slot = nextSlot(); setForm((p) => ({ ...p, date: p.date || slot.date, time: p.time || slot.time })); } }, [open]);
  const count = Object.values(basket).reduce((sum, qty) => sum + qty, 0); const total = basketTotal(basket);
  const field = (key: keyof OrderDetails) => (event: { target: { value: string } }) => setForm((previous) => ({ ...previous, [key]: event.target.value }));
  const submit = (event: FormEvent) => { event.preventDefault(); if (count) openContact(contactChannel(event), orderMessage(basket, form, lang), l(C.basket.message)); };
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    {count > 0 && <Dialog.Trigger asChild><Button className="basket-floating fixed inset-x-4 z-40 justify-between md:inset-x-auto md:right-6 md:min-w-72"><span className="flex items-center gap-2"><ShoppingBag />{l(C.basket.title)} · {count}</span><span>{money(total)}<ArrowRight className="ml-2 inline" /></span></Button></Dialog.Trigger>}
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[60] bg-coal/75" />
      <Dialog.Content aria-describedby="basket-note" className="fixed inset-x-0 bottom-0 z-[70] max-h-[92dvh] overflow-y-auto border border-coal/25 bg-paper p-4 pb-8 text-coal md:inset-x-auto md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2">
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-coal/20 pb-3"><Dialog.Title className="poster-type text-4xl">{l(C.basket.title)} · {count}</Dialog.Title><div className="flex items-center gap-1"><Button variant="ghost" size="sm" onClick={clear} disabled={!count}>{l(C.basket.clear)}</Button><Dialog.Close asChild><Button size="icon" variant="ghost" aria-label={l(C.basket.close)}><X /></Button></Dialog.Close></div></div>
        {!count ? <div className="space-y-4 py-8"><p>{l(C.basket.empty)}</p><Dialog.Close asChild><Button asChild><Link to="/menu">{l(C.basket.browse)}</Link></Button></Dialog.Close></div> : <>
          <ul className="mb-4 divide-y divide-coal/20">{Object.entries(basket).map(([id, qty]) => { const item = findItem(id); if (!item) return null; return <li key={id} className="flex flex-wrap items-center justify-between gap-2 py-3"><div className="min-w-0 flex-1 basis-40"><p className="text-[17px] leading-snug">{l(item.name)}</p><p className="mt-1 text-sm text-ember">{qty} × {item.price}</p></div><QuantityControl item={item} /></li>; })}</ul>
          <p className="mb-5 flex flex-wrap justify-between gap-2 font-semibold"><span>{l(C.basket.total)}</span><span className="tabular-nums text-ember">{money(total)}</span></p>
          <form onSubmit={submit} className="space-y-4">
            <fieldset><legend className="mb-2 text-sm text-muted-foreground">{l(C.basket.mode)}</legend><div className="grid gap-2">{(["dine", "pickup"] as const).map((mode) => <label key={mode} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-[2px] border p-4 ${form.mode === mode ? "border-coal" : "border-coal/20"}`}><input type="radio" name="order-mode" checked={form.mode === mode} onChange={() => setForm((previous) => ({ ...previous, mode }))} className="accent-ember" /><span>{l(mode === "dine" ? C.basket.dine : C.basket.pickup)}</span></label>)}</div></fieldset>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {form.mode === "dine" && <label className="block min-w-0 text-sm">{l(C.wa.date)}<input required type="date" min={rigaToday()} value={form.date} onChange={field("date")} className={inputClass} /></label>}
              <label className="block min-w-0 text-sm">{l(form.mode === "dine" ? C.basket.arrival : C.basket.pickupTime)}<input required type="time" value={form.time} onChange={field("time")} className={inputClass} /></label>
              {form.mode === "dine" && <label className="block min-w-0 text-sm">{l(C.wa.guests)}<input required type="number" min={1} value={form.guests} onChange={field("guests")} className={inputClass} /></label>}
              <label className="block min-w-0 text-sm">{l(C.wa.name)}<input required autoComplete="name" value={form.name} onChange={field("name")} className={inputClass} /></label>
              <label className="block min-w-0 text-sm">{l(C.wa.phone)}<input required type="tel" autoComplete="tel" value={form.phone} onChange={field("phone")} className={inputClass} /></label>
            </div>
            <label className="block text-sm">{l(C.wa.comments)}<textarea value={form.comment} onChange={field("comment")} className={`${inputClass} min-h-20`} /></label>
            <div id="basket-note"><ContactActions note={l(C.basket.note)} /></div>
          </form>
        </>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

export function OrderIntro() {
  const { l } = useI18n();
  return <div className="flex h-full flex-col justify-center gap-6 py-6"><h3 className="poster-type text-4xl">{l(C.basket.intro)}</h3><ol className="space-y-3">{C.basket.steps.map((step, index) => <li key={step.en} className="flex items-center gap-3"><span className="text-sm font-semibold tabular-nums text-ember">0{index + 1}</span>{l(step)}</li>)}</ol><Button asChild className="self-start"><Link to="/menu">{l(C.basket.browse)}<ArrowRight /></Link></Button></div>;
}
