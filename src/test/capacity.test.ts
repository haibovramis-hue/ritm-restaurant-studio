import { describe, expect, it } from 'vitest';
import { CAPACITY, C } from '@/lib/copy';
import { B, S } from '@/lib/copy-pages';

/** Guest capacity (100 / 300) is not on the restaurant's own pages, so the site names the places and claims no numbers. */
describe('places instead of unverified capacity', () => {
  it('names the places and states no guest numbers', () => {
    expect(CAPACITY).toEqual({
      lv: 'Zāles, veranda un terases dārzā',
      ru: 'Залы, веранда и террасы в саду',
      en: 'Halls, a veranda and garden terraces',
    });
    expect(C.facts.at(-1)).toEqual(CAPACITY);
    expect(C.gallery.title.lv).toBe('Galerija');
    expect(B.sub.ru).toContain(CAPACITY.ru);
    expect(C.hero.tiles[1]?.d).toEqual(CAPACITY);
  });
  it('carries no unverified claims anywhere in the copy', () => {
    const all = JSON.stringify([C, B, S]);
    expect(all).not.toMatch(/100 (vies|гост|guest)|līdz 300|до 300|up to 300/);
    expect(all).not.toMatch(/malk|дров|wood-fired|apsild|подогрев|heated|kamīn|камин|fireplace|karaoke|караоке|slotas|веник|€15/i);
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
