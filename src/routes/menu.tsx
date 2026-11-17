import { pageHead, menuSchema } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MenuBrowser } from "@/components/site/Menu";
import { C } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { SectionLabel } from "@/components/site/Design";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { c?: string } => typeof search["c"] === "string" ? { c: search["c"] } : {},
  head: () => ({ ...pageHead("/menu", "Ēdienkarte — Zelta Pakavs · Rīga", "Zelta Pakavs oficiālā ēdienkarte: 13 kategorijas, ēdieni un cenas. Ogļu grils, Kaukāza un mājas virtuve Rīgā, Imantā."), scripts: [{ type: "application/ld+json", children: JSON.stringify(menuSchema()) }] }),
  component: MenuPage,
});

function MenuPage() {
  const { c } = Route.useSearch();
  const { l } = useI18n();
  return <div className="bg-paper pb-20 text-coal">
    <section className="px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24"><div className="mx-auto max-w-[1320px]"><SectionLabel>{l(C.menu.categories)}</SectionLabel><h1 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] font-light leading-[0.98] tracking-[-0.03em]">{l(C.nav.menu)}</h1></div></section>
    <MenuBrowser {...(c ? { categoryId: c } : {})} />
  </div>;
}
