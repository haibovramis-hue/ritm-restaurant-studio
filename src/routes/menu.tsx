import { pageHead, menuSchema } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MenuBrowser } from "@/components/site/Menu";
import { C, P } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { DishShowcase } from "@/components/site/DishShowcase";
import { PosterHeading, SectionLabel } from "@/components/site/Design";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { c?: string } => typeof search["c"] === "string" ? { c: search["c"] } : {},
  head: () => ({ ...pageHead("/menu", "Ēdienkarte — Zelta Pakavs · Rīga", "Zelta Pakavs oficiālā ēdienkarte: 13 kategorijas, ēdieni un cenas. Ogļu grils, Kaukāza un mājas virtuve Rīgā, Imantā."), scripts: [{ type: "application/ld+json", children: JSON.stringify(menuSchema()) }] }),
  component: MenuPage,
});

function MenuPage() {
  const { c } = Route.useSearch();
  const { l } = useI18n();
  return <div className="bg-paper pb-20 text-coal">
    <section className="border-b border-coal/20 px-5 py-10"><div className="mx-auto flex max-w-6xl items-center justify-between gap-6"><div><SectionLabel number="13">{l(C.menu.categories)}</SectionLabel><PosterHeading as="h1" className="mt-3">{l(C.nav.menu)}</PosterHeading></div></div></section>
    <section className="bg-coal px-5 py-10 text-paper md:py-14"><p className="mx-auto mb-5 max-w-5xl text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">{l(P.chefTitle)}</p><DishShowcase /></section>
    <MenuBrowser {...(c ? { categoryId: c } : {})} />
  </div>;
}
