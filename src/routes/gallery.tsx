import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { IMG } from "@/lib/images";
import { GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL } from "@/lib/config";
import { Reveal } from "@/components/site/Reveal";
import { PhotoBlock, gutterCls, wrapCls } from "@/components/site/Section";
import { InstagramStrip } from "@/components/site/InstagramStrip";
import { PosterHeading, SectionLabel } from "@/components/site/Design";

export const Route = createFileRoute("/gallery")({
  head: () => ({ ...pageHead("/gallery", "Galerija un mūsu stāsts — Zelta Pakavs", "Īstas Zelta Pakavs fotogrāfijas: zāles, terase, svinības un ogļu grils. Ģimenes restorāna stāsts kopš 1999. gada un viesu atsauksmes.") }),
  component: Gallery,
});

function Gallery() {
  const { l, lang } = useI18n();
  const q = (t: string) => lang === "lv" ? `„${t}”` : lang === "ru" ? `«${t}»` : `“${t}”`;
  const photos = [IMG.terrace, IMG.hallWedding, IMG.shashlikCoals, IMG.courtyardOven, IMG.banquetTables, IMG.gazebo, IMG.verandaLong, IMG.courtyardFountain, IMG.zpPirts, IMG.banyaCabin, IMG.merchantBeef, IMG.quizNight];
  return (
    <>
      <PhotoBlock img={IMG.courtyardOven} title={l(C.gallery.title)} line={l(C.gallery.sub)} h1 />

      <section id="about" className={`section-pad scroll-mt-[var(--header-h)] bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionLabel>{l(C.story.eyebrow)}</SectionLabel>
            <PosterHeading className="mt-5">{l(C.story.title)}</PosterHeading>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">{l(C.story.text)}</p>
          </div>
          <ol className="self-end border-t border-coal/15">{C.story.timeline.map((s) => <li key={s.y.en} className="grid grid-cols-1 items-baseline gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6 border-b border-coal/15 py-6"><span className="font-display text-4xl font-light tracking-[-0.03em]">{l(s.y)}</span><span className="text-[17px] leading-snug">{l(s.t)}</span></li>)}</ol>
        </div>
      </section>

      <section className={`bg-paper pb-[clamp(4.5rem,10vw,9rem)] text-coal ${gutterCls}`}>
        <div className={`${wrapCls} columns-2 gap-4 md:columns-3 md:gap-6`}>{photos.map((src) => <Reveal key={src} className="mb-4 break-inside-avoid md:mb-6"><img src={src} alt={l(C.gallery.title)} loading="lazy" decoding="async" className="photo-grade w-full" /></Reveal>)}</div>
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
