import { describe, expect, it } from 'vitest';
import { CAPACITY, C } from '@/lib/copy';
import { B } from '@/lib/copy-pages';

describe('combined summer capacity', () => {
  it('states 300 including the terrace, not on the terrace alone', () => {
    expect(CAPACITY).toEqual({
      lv: 'Zāles līdz 100 viesiem · vasarā kopā ar terasi līdz 300',
      ru: 'Залы до 100 гостей · летом вместе с террасой до 300',
      en: 'Halls for up to 100 guests · up to 300 in summer including the terrace',
    });
    expect(C.facts.at(-1)).toEqual(CAPACITY);
    expect(C.gallery.title.lv).toBe('Galerija');
    expect(B.sub.lv).toContain(CAPACITY.lv);
    expect(B.sub.ru).toContain(CAPACITY.ru);
    expect(B.sub.en).toContain(CAPACITY.en);
  });
  it('uses the requested short hero capacity', () => {
    expect(C.hero.tiles[1]?.d).toEqual({ lv: '10–100 viesi, vasarā līdz 300', ru: '10–100 гостей, летом до 300', en: '10–100 guests, up to 300 in summer' });
  });
});
describe('banquet form copy', () => {
  it('offers exactly the seven agreed occasions and preselects Christmas for ?occasion=xmas', () => {
    expect(B.occasions.map((o) => o.lv)).toEqual(['Kāzas', 'Jubileja', 'Kristības', 'Korporatīvais pasākums', 'Bērnu svētki', 'Ziemassvētki / Jaungads', 'Bēru mielasts']);
    expect(B.occasions[B.xmasIndex]?.lv).toBe('Ziemassvētki / Jaungads');
  });
  it('makes no unverified call-back promise', () => {
    expect(B.promise.lv).toBe('Sazināsimies ar jums, lai precizētu detaļas.');
    expect(JSON.stringify(B)).not.toMatch(/1 stund|1 часа|1 hour/);
  });
});
