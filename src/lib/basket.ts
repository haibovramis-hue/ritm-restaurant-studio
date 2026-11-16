import { fmtDate } from './dates';
import { findItem } from './menu';
import { C } from './copy';
import type { Lang } from './i18n';

export type Basket = Record<string, number>;
export type OrderDetails = { mode: 'dine' | 'pickup'; date: string; time: string; guests: string; name: string; phone: string; comment: string };
export const priceCents = (price: string) => Math.round(Number(price.replace(' €', '').replace(',', '.')) * 100);
export const money = (cents: number) => `${(cents / 100).toFixed(2).replace('.', ',')} €`;
export function sanitizeBasket(value: unknown): Basket {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, qty]) => findItem(id) && typeof qty === 'number' && Number.isSafeInteger(qty) && qty > 0));
}
export function changeQuantity(basket: Basket, id: string, delta: number): Basket {
  if (!findItem(id)) return basket;
  const next = { ...basket }; const qty = Math.max(0, (next[id] ?? 0) + delta);
  if (qty) next[id] = qty; else delete next[id];
  return next;
}
export const basketTotal = (basket: Basket) => Object.entries(basket).reduce((sum, [id, qty]) => {
  const item = findItem(id); return sum + (item ? priceCents(item.price) * qty : 0);
}, 0);
export function orderMessage(basket: Basket, form: OrderDetails, lang: Lang): string {
  const b = C.basket, w = C.wa;
  const lines = [b.message[lang], `${b.mode[lang]}: ${(form.mode === 'dine' ? b.dine : b.pickup)[lang]}`];
  if (form.mode === 'dine') lines.push(`${w.date[lang]}: ${fmtDate(form.date)}`);
  lines.push(`${(form.mode === 'dine' ? b.arrival : b.pickupTime)[lang]}: ${form.time}`);
  if (form.mode === 'dine') lines.push(`${w.guests[lang]}: ${form.guests}`);
  lines.push(`${b.items[lang]}:`);
  for (const [id, qty] of Object.entries(basket)) {
    const item = findItem(id); if (!item) continue;
    lines.push(`- ${qty} x ${item.name[lang]}: ${item.price} / ${money(priceCents(item.price) * qty)}`);
  }
  lines.push(`${b.total[lang]}: ${money(basketTotal(basket))}`, `${w.name[lang]}: ${form.name}`, `${w.phone[lang]}: ${form.phone}`, `${w.comments[lang]}: ${form.comment.trim() || '-'}`, b.note[lang]);
  return lines.join('\n').replace(/[—–]/g, '-');
}
