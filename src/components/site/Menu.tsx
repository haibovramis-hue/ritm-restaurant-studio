import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectedCategory, searchMenu } from "@/lib/menu-browsing";
import { useI18n } from "@/lib/i18n";
import { C, P } from "@/lib/copy";
import { BADGES, MENU, SIGNATURE_IDS, findItem, type MenuCat, type MenuItem } from "@/lib/menu";
import { IMG } from "@/lib/images";
import { QuantityControl } from "./Basket";
import { ArchPhoto, PosterHeading } from "./Design";

/** Only honest category photography; categories without a real photo stay typographic. */
const catImg: Record<string, string> = {
  meat: IMG.porkKnuckle, fish: IMG.seafoodPasta, grill: IMG.shashlikCoals, pasta: IMG.seafoodPasta,
  platters: IMG.dishesMix, sides: IMG.dishesMix, desserts: IMG.fondant,
};
/** Only dish photos whose identity is known. No generated or misleading substitutes. */
const dishImg: Record<string, string> = {
  lamb: IMG.shashlikCoals, plate4: IMG.dishesMix, knuckle: IMG.porkKnuckle, merchant: IMG.merchantBeef, fondant: IMG.fondant,
  ribs: IMG.scRibs, "julienne-ch": IMG.scJulienne, solyanka: IMG.scSolyanka, homepot: IMG.scHomepot, octosalad: IMG.scOctosalad, cutlets: IMG.scCutlets, greek: IMG.scGreek, draniki: IMG.scDraniki, cheesecake: IMG.scCheesecake,
};

function Card({ it }: { it: MenuItem }) {
  const { l } = useI18n();
  const own = dishImg[it.id];
  const desc = l(it.desc);
  return (
    <li className="flex gap-3 border-b border-coal/20 py-4">
      {own && <img src={own} alt={l(it.name)} loading="lazy" decoding="async" width={64} height={64} className="h-16 w-14 shrink-0 object-cover" />}
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-[19px] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-coal">{l(it.name)}</h4>
        {desc && <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{desc}</p>}
        {it.badges.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{it.badges.map((b) => <span key={b} className="border border-coal/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">{l(BADGES[b])}</span>)}</div>}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row"><span className="whitespace-nowrap pt-1 text-[15px] font-semibold tabular-nums text-ember">{it.price}</span><QuantityControl item={it} /></div>
    </li>
  );
}

export function MenuSection({ tiles = true }: { tiles?: boolean }) {
  const { l } = useI18n();
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(380, rail.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="relative">
        <div ref={rail} className="snap-pad -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {SIGNATURE_IDS.map((id) => {
            const it = findItem(id); if (!it) return null;
            const photo = dishImg[id];
            return (
              <figure key={id} className="w-[78vw] max-w-[310px] shrink-0 snap-start border border-paper/20 bg-coal-2 sm:w-[46%] lg:w-[31%]">
                {photo ? <ArchPhoto src={photo} alt={l(it.name)} width={787} height={854} className="h-60 p-2" /> : (
                  <div className="m-2 flex h-56 flex-col justify-end bg-paper p-5 text-coal">
                    <span className="text-xs font-semibold tabular-nums text-ember">{it.price}</span>
                    <p className="poster-type mt-2 text-4xl">{l(it.name)}</p>
                  </div>
                )}
                <figcaption className="p-4 pt-2">
                  <p className="min-h-12 font-display text-2xl font-extrabold uppercase leading-[0.95]">{l(it.name)}</p>
                  <div className="mt-3 flex items-center justify-between gap-2"><span className="whitespace-nowrap font-semibold tabular-nums text-brass">{it.price}</span><QuantityControl item={it} /></div>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="mt-2 hidden justify-end gap-2 md:flex"><Button variant="outline" size="icon" className="border-paper/40" onClick={() => scroll(-1)} aria-label={l(P.previous)}><ArrowLeft /></Button><Button variant="outline" size="icon" className="border-paper/40" onClick={() => scroll(1)} aria-label={l(P.next)}><ArrowRight /></Button></div>
      </div>
      {tiles && <div className="mt-8 grid grid-cols-2 border-l border-t border-current/20 md:grid-cols-3 lg:grid-cols-4">{MENU.map((category) => <Button key={category.id} asChild variant="ghost" className="h-auto min-h-24 justify-start whitespace-normal border-b border-r border-current/20 p-4 text-left"><Link to="/menu" search={{ c: category.id }}><span className="font-display text-2xl uppercase leading-none">{l(category.name)}</span><span className="ml-2 text-xs tabular-nums text-ember">{category.items.length}</span></Link></Button>)}</div>}
      <div className="mt-7"><Button asChild variant="outline" className="border-paper/50"><Link to="/menu">{l(C.menu.all)}<ArrowRight /></Link></Button></div>
    </div>
  );
}

function CategoryDishes({ category }: { category: MenuCat }) {
  const { l } = useI18n();
  const photo = catImg[category.id];
  return (
    <section aria-label={l(category.name)}>
      <div className="mb-6 flex items-end justify-between gap-5 border-b border-coal/20 pb-5">
        <PosterHeading className="!text-[clamp(2.8rem,9vw,5.5rem)]">{l(category.name)}</PosterHeading>
        {photo && <ArchPhoto src={photo} alt={l(category.name)} width={787} height={854} className="hidden h-36 w-28 shrink-0 sm:block" />}
      </div>
      {category.compact ? (
        <ul className="grid grid-cols-2 gap-x-5 md:grid-cols-3">{category.items.map((it) => <li key={it.id} className="min-w-0 border-b border-coal/20 py-3 text-sm"><span className="block min-h-10 font-medium">{l(it.name)}</span><div className="flex items-center justify-between gap-1"><span className="shrink-0 font-semibold tabular-nums text-ember">{it.price}</span><QuantityControl item={it} /></div></li>)}</ul>
      ) : <ul className="grid md:grid-cols-2 md:gap-x-10">{category.items.map((it) => <Card key={it.id} it={it} />)}</ul>}
    </section>
  );
}

export function MenuBrowser({ categoryId }: { categoryId?: string }) {
  const { l, lang } = useI18n();
  const [q, setQ] = useState("");
  const category = selectedCategory(categoryId);
  const tabs = useRef<HTMLDivElement>(null);
  const groups = useMemo(() => searchMenu(q, lang), [q, lang]);
  useEffect(() => {
    setQ("");
    const tab = tabs.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (tab && tabs.current) tabs.current.scrollTo({ behavior: "smooth", left: tab.offsetLeft - tabs.current.clientWidth / 2 + tab.offsetWidth / 2 });
  }, [categoryId]);
  if (!category) return null;
  return (
    <>
      <div className="sticky top-[60px] z-30 border-y border-coal/20 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <label className="relative mb-3 block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={l(C.menu.search)} aria-label={l(C.menu.search)} className="min-h-12 w-full rounded-[2px] border-[1.5px] border-coal/30 bg-paper py-2.5 pl-10 pr-4 text-base outline-none focus:border-ember" />
          </label>
          <div ref={tabs} className="relative flex gap-1 overflow-x-auto [scrollbar-width:none]" aria-label={l(C.menu.categories)}>
            {MENU.map((c) => <Button key={c.id} asChild variant={category.id === c.id && !q.trim() ? "default" : "ghost"} size="sm" className="shrink-0"><Link to="/menu" search={{ c: c.id }} resetScroll={false} aria-current={category.id === c.id && !q.trim() ? "page" : undefined} onClick={() => setQ("")}>{l(c.name)}</Link></Button>)}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {q.trim() ? <div className="space-y-12">{groups.length ? groups.map((group) => <CategoryDishes key={group.id} category={group} />) : <p className="py-8 text-center text-muted-foreground">{l(C.menu.none)}</p>}</div> : <CategoryDishes category={category} />}
      </div>
    </>
  );
}

