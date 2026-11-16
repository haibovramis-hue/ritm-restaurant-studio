import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { IMG } from "@/lib/images";
import { GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL } from "@/lib/config";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/Section";
import { InstagramStrip } from "@/components/site/InstagramStrip";
import { PosterHeading, SectionLabel } from "@/components/site/Design";

export const Route = createFileRoute("/gallery")({
  head: () => ({ ...pageHead("/gallery", "Galerija un mūsu stāsts — Zelta Pakavs", "Īstas Zelta Pakavs fotogrāfijas: zāles, terase, svinības un ogļu grils. Ģimenes restorāna stāsts kopš 1999. gada un viesu atsauksmes.") }),
  component: Gallery,
});

function Gallery() {
  const { l, lang } = useI18n();
  const q = (t: string) => lang === "lv" ? `„${t}”` : lang === "ru" ? `«${t}»` : `“${t}”`;
  return (
    <>
      <section className="bg-paper px-5 py-16 text-coal md:py-24"><div className="mx-auto max-w-6xl"><SectionLabel number="01">{l(C.story.eyebrow)}</SectionLabel><PosterHeading as="h1" className="mb-10 mt-4">{l(C.gallery.title)}</PosterHeading><div className="columns-2 gap-3 md:columns-3 md:gap-4">{[IMG.terrace, IMG.hallWedding, IMG.shashlikCoals, IMG.courtyardOven, IMG.banquetTables, IMG.gazebo, IMG.verandaLong, IMG.courtyardFountain, IMG.zpPirts, IMG.banyaCabin, IMG.merchantBeef, IMG.quizNight].map((src) => <Reveal key={src} className="mb-3 break-inside-avoid md:mb-4"><img src={src} alt={l(C.gallery.title)} loading="lazy" decoding="async" className="photo-grade w-full" /></Reveal>)}</div></div></section>
      <section id="about" className="scroll-mt-[60px] bg-coal px-5 py-16 text-paper md:py-24"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2"><div><SectionLabel number="02">{l(C.story.eyebrow)}</SectionLabel><h2 className="poster-type mt-5 text-5xl md:text-7xl">{l(C.story.title)}</h2><p className="mt-6 leading-relaxed text-paper/70">{l(C.story.text)}</p></div><ol className="space-y-8 border-l border-brass/50 pl-7">{C.story.timeline.map((s) => <li key={s.y.en}><p className="font-display text-6xl font-black text-brass">{l(s.y)}</p><p className="mt-2 text-lg">{l(s.t)}</p></li>)}</ol></div></section>
      <section className="bg-paper px-5 py-16 text-coal"><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="mx-auto mb-6 flex min-h-12 w-fit items-center gap-3 hover:text-ember"><span className="font-display text-4xl font-black text-ember">{GOOGLE_RATING} ★</span><span className="text-sm">{GOOGLE_REVIEWS} {l(C.reviews.badge)} →</span></a><div className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none]">{C.reviews.items.map((r) => <blockquote key={r.en} className="w-[82%] shrink-0 snap-start border-t border-coal/20 py-5 font-voice text-lg italic sm:w-72">{q(l(r))}<footer className="mt-3 font-sans text-xs font-semibold uppercase not-italic tracking-[0.12em] text-muted-foreground">{l(C.reviews.source)}</footer></blockquote>)}</div></section>
      <InstagramStrip />
    </>
  );
}
