import { describe, expect, it } from 'vitest';
import { basketTotal, changeQuantity, money, orderMessage, sanitizeBasket } from '@/lib/basket';
const basket = { plate4: 1, penovani: 2, solyanka: 1 };
const form = { mode: 'dine' as const, date: '2026-11-20', time: '18:30', guests: '3', name: 'Test Guest', phone: '20000000', comment: 'No onions' };
describe('universal order basket', () => {
  it('totals official prices exactly in cents including quantities', () => { expect(basketTotal(basket)).toBe(6800); expect(money(basketTotal(basket))).toBe('68,00 €'); });
  it('increments and removes an item when its quantity reaches zero', () => { expect(changeQuantity({ penovani: 1 }, 'penovani', 1)).toEqual({ penovani: 2 }); expect(changeQuantity({ penovani: 1 }, 'penovani', -1)).toEqual({}); });
  it('restores valid quantities and discards removed dishes and invalid stored data', () => { expect(sanitizeBasket({ plate4: 1, fake: 2, penovani: -1, solyanka: 1.5 })).toEqual({ plate4: 1 }); });
  it.each(['lv', 'ru', 'en'] as const)('includes all dine-in details and item quantities in %s', (lang) => { const message = orderMessage(basket, form, lang); for (const value of ['20.11.2026', '18:30', '3', 'Test Guest', '20000000', 'No onions', '68,00 €', '49,00 €', '2 x', '12,00 €']) expect(message).toContain(value); expect(message).not.toMatch(/[✔•×😀]/u); });
  it('takeaway omits table-only fields and includes pickup time', () => { const message = orderMessage(basket, { ...form, mode: 'pickup' }, 'lv'); expect(message).toContain('Līdzņemšanai'); expect(message).toContain('Saņemšanas laiks: 18:30'); expect(message).not.toContain('20.11.2026'); expect(message).not.toContain('Viesi:'); });
});
