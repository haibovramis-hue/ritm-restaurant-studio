import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { selectedCategory, searchMenu } from "@/lib/menu-browsing";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { BADGES, MENU, type MenuCat, type MenuItem } from "@/lib/menu";
import { QuantityControl } from "./Basket";
import { gutterCls, wrapCls } from "./Section";

/** A dish is a line of type: name, a quiet description, the price. No thumbnails. */
function Row({ it }: { it: MenuItem }) {
  const { l } = useI18n();
  const desc = l(it.desc);
  const badges = it.badges.map((b) => l(BADGES[b])).join(" · ");
  return (
    <li className="flex items-center gap-4 border-b border-coal/12 py-4">
      <div className="min-w-0 flex-1">
        <h4 className="font-sans text-[17px] font-normal leading-snug tracking-normal text-coal">{l(it.name)}</h4>
        {(desc || badges) && <p className="mt-1 text-sm leading-snug text-muted-foreground">{desc}{desc && badges ? " · " : ""}{badges && <span className="text-ember">{badges}</span>}</p>}
      </div>
      <span className="shrink-0 whitespace-nowrap text-[17px] tabular-nums">{it.price}</span>
      <QuantityControl item={it} />
    </li>
  );
}

function CategoryDishes({ category }: { category: MenuCat }) {
  const { l } = useI18n();
  return (
    <section aria-label={l(category.name)} className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-[calc(var(--header-h)+150px)] lg:self-start">
        <h2 className="poster-type text-[clamp(2rem,4vw,3rem)]">{l(category.name)}</h2>
        <p className="mt-3 text-sm text-muted-foreground tabular-nums">{category.items.length}</p>
      </div>
      <ul className={`border-t border-coal/12 ${category.compact ? "grid sm:grid-cols-2 sm:gap-x-12" : ""}`}>{category.items.map((it) => <Row key={it.id} it={it} />)}</ul>
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
      <div className="sticky top-[var(--header-h)] z-30 border-b border-coal/12 bg-paper">
        <div className={`${wrapCls} ${gutterCls} flex flex-col gap-1 py-3 lg:flex-row lg:items-center lg:gap-10`}>
          <label className="relative block lg:w-72 lg:shrink-0">
            <Search strokeWidth={1.5} className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={l(C.menu.search)} aria-label={l(C.menu.search)} className="min-h-11 w-full border-b border-coal/20 bg-transparent py-2 pl-7 pr-2 text-base outline-none placeholder:text-coal/40 focus:border-ember" />
          </label>
          <div ref={tabs} className="-mx-5 flex gap-7 overflow-x-auto px-5 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:px-0" aria-label={l(C.menu.categories)}>
            {MENU.map((c) => {
              const active = category.id === c.id && !q.trim();
              return <Link key={c.id} to="/menu" search={{ c: c.id }} resetScroll={false} aria-current={active ? "page" : undefined} onClick={() => setQ("")} className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap border-b text-[15px] transition-colors ${active ? "border-ember text-coal" : "border-transparent text-coal/50 hover:text-coal"}`}>{l(c.name)}</Link>;
            })}
          </div>
        </div>
      </div>
      <div className={`${wrapCls} ${gutterCls} py-12 md:py-20`}>
        {q.trim() ? <div className="space-y-20">{groups.length ? groups.map((group) => <CategoryDishes key={group.id} category={group} />) : <p className="py-8 text-muted-foreground">{l(C.menu.none)}</p>}</div> : <CategoryDishes category={category} />}
      </div>
    </>
  );
}
