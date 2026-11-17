import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { tr, useI18n } from "@/lib/i18n";
import { C, P } from "@/lib/copy";
import { IMG } from "@/lib/images";
import { GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL } from "@/lib/config";
import { Reveal } from "@/components/site/Reveal";
import { PhotoBlock, gutterCls, wrapCls } from "@/components/site/Section";
import { InstagramStrip } from "@/components/site/InstagramStrip";
import { SectionLabel } from "@/components/site/Design";

export const Route = createFileRoute("/gallery")({
  head: () => ({ ...pageHead("/gallery", "Galerija un mūsu stāsts — Zelta Pakavs", "Īstas Zelta Pakavs fotogrāfijas: zāles, terase, svinības un ogļu grils. Ģimenes restorāna stāsts kopš 1999. gada un viesu atsauksmes.") }),
  component: Gallery,
});

/** The story as the restaurant tells it on zeltapakavs.lv: the 1999 café on a former farm, the places it grew into, the flowers in summer. */
const T = {
  lead: tr(
    "Neliela kafejnīca bijušās fermas teritorijā, kas izaugusi par savu mazo pilsētu.",
    "Маленькое кафе на бывшей ферме, которое выросло в свой небольшой городок.",
    "A small café on a former farm that grew into a little town of its own.",
  ),
  body: tr(
    "1999. gadā viss sākās ar nelielu kafejnīcu. Šodien tās ir zāles, verandas, terases, telšu namiņi un mājiņas dārzā, bērnu laukums, grils pagalmā un pirts ar baseinu. Vasarā dārzā zied mūsu puķes.",
    "В 1999 году всё началось с маленького кафе. Сегодня это залы, веранды, террасы, шатры и домики в саду, детская площадка, мангал во дворе и баня с бассейном. Летом в саду цветут наши цветы.",
    "It began in 1999 with a small café. Today it is halls, verandas, terraces, garden tents and cabins, a playground, a grill in the yard and a banya with a pool. In summer our flowers bloom in the garden.",
  ),
  photosTitle: tr("Pagalms, zāles un galds", "Двор, залы и стол", "The yard, the halls and the table"),
};

function Gallery() {
  const { l, lang } = useI18n();
  const q = (t: string) => lang === "lv" ? `„${t}”` : lang === "ru" ? `«${t}»` : `“${t}”`;
  const photos = [IMG.courtyardFountain, IMG.verandaLong, IMG.shashlikCoals, IMG.banyaCabin, IMG.terrace, IMG.hallWedding, IMG.merchantBeef, IMG.courtyardOven, IMG.banquetTables];
  return (
    <>
      <PhotoBlock img={IMG.terrace} title={l(P.about)} line={l(C.gallery.sub)} h1 />

      <section id="about" className={`section-pad scroll-mt-[var(--header-h)] bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-8 md:grid-cols-12`}>
          <SectionLabel className="md:col-span-3 md:pt-4">{l(C.story.eyebrow)}</SectionLabel>
          <div className="md:col-span-9">
            <p className="max-w-[24ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] font-light leading-[1.08] tracking-[-0.025em]">{l(T.lead)}</p>
            <p className="mt-8 max-w-[58ch] text-[18px] leading-relaxed text-muted-foreground">{l(T.body)}</p>
          </div>
        </div>
      </section>

      <section className={`bg-paper pb-[clamp(4.5rem,10vw,9rem)] text-coal ${gutterCls}`}>
        <div className={wrapCls}>
          <h2 className="eyebrow opacity-60">{l(T.photosTitle)}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{photos.map((src) => <Reveal key={src}><div className="aspect-[4/5] overflow-hidden bg-coal-2"><img src={src} alt={l(C.gallery.title)} loading="lazy" decoding="async" className="photo-grade h-full w-full object-cover" /></div></Reveal>)}</div>
        </div>
      </section>

      <section className={`section-pad bg-paper-2 text-coal ${gutterCls}`}>
        <div className={wrapCls}>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="group inline-flex items-baseline gap-4"><span className="font-display text-6xl font-light tracking-[-0.03em] md:text-7xl">{GOOGLE_RATING}</span><span className="text-[15px] text-muted-foreground transition-colors group-hover:text-ember">{GOOGLE_REVIEWS} {l(C.reviews.badge)}</span></a>
          <div className="snap-pad -mx-5 mt-12 flex snap-x snap-mandatory gap-10 overflow-x-auto px-5 md:-mx-10 md:px-10">{C.reviews.items.map((r) => <blockquote key={r.en} className="w-[80%] shrink-0 snap-start sm:w-80"><p className="font-voice text-[1.5rem] font-light italic leading-[1.3]">{q(l(r))}</p><footer className="eyebrow mt-5 opacity-50">{l(C.reviews.source)}</footer></blockquote>)}</div>
        </div>
      </section>
      <InstagramStrip />
    </>
  );
}
