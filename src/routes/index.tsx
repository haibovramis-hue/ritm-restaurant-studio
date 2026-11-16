import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Navigation, Phone } from "lucide-react";
import { OpenStatus } from "@/components/site/OpenStatus";
import { useI18n } from "@/lib/i18n";
import { C, P, SIMPLE } from "@/lib/copy";
import { ADDRESS, EMAIL, FACEBOOK, INSTAGRAM, GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL, MAIN_PHONE, MAPS_DIRECTIONS_URL, WAZE_URL, tel } from "@/lib/config";
import { useBooking } from "@/lib/booking-context";
import { DishShowcase } from "@/components/site/DishShowcase";
import { ArchPhoto, PosterHeading, SectionLabel } from "@/components/site/Design";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";
import { MENU } from "@/lib/menu";
import { SHARE_IMAGE, SITE_URL } from "@/lib/seo";
import { rigaToday } from "@/lib/dates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zelta Pakavs — ģimenes restorāns Rīgā kopš 1999 · Grils, banketi, pirts" },
      { name: "description", content: "Šašliks uz īstām oglēm, Kaukāza un mājas virtuve Imantā. Banketi līdz 100 viesiem, vasarā ar terasi līdz 300, un ZP Pirts ar baseinu." },
      { property: "og:title", content: "Zelta Pakavs — ikdienai, svētkiem un banketiem" },
      { property: "og:description", content: "Šašliks uz oglēm, Kaukāza un mājas virtuve — pie viena liela galda. Jūrmalas gatve 80, Rīga." },
      { property: "og:url", content: `${SITE_URL}/` }, { property: "og:type", content: "website" }, { property: "og:locale", content: "lv_LV" },
      { property: "og:image", content: SHARE_IMAGE },
      { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: "Zelta Pakavs — ģimenes restorāns Rīgā kopš 1999" },
      { name: "twitter:description", content: "Šašliks uz oglēm, banketi un krievu pirts. Jūrmalas gatve 80, Rīga." },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }, { rel: "preload", as: "image", href: IMG.shashlikCoals, fetchPriority: "high" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Restaurant", "@id": `${SITE_URL}/#restaurant`, url: `${SITE_URL}/`, name: "Zelta Pakavs", foundingDate: "1999", image: SHARE_IMAGE, hasMenu: `${SITE_URL}/menu`, sameAs: [INSTAGRAM, FACEBOOK], legalName: "SIA Zp Plus", servesCuisine: ["Grill", "Caucasian", "Latvian"],
      address: { "@type": "PostalAddress", streetAddress: "Jūrmalas gatve 80", addressLocality: "Rīga", addressCountry: "LV" }, telephone: "+37167403313", email: EMAIL,
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], opens: "12:00", closes: "22:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "12:00", closes: "23:00" },
      ], acceptsReservations: true, hasMap: MAPS_DIRECTIONS_URL,
    }) }],
  }),
  component: Index,
});

function EntryCard({ title, detail, img, to, onClick }: { title: string; detail?: ReactNode; img: string; to?: "/banquets" | "/sauna"; onClick?: () => void }) {
  const inner = <>
    <img src={img} alt="" width={1600} height={900} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <span className="absolute inset-0 bg-gradient-to-t from-coal/90 via-coal/30 to-transparent" aria-hidden="true" />
    <span className="relative flex w-full items-end justify-between gap-3 p-5 text-paper"><span className="min-w-0"><span className="poster-type block text-[clamp(2rem,7vw,3rem)]">{title}</span>{detail && <span className="mt-2 block text-[13px] leading-snug text-paper/80">{detail}</span>}</span><ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
  </>;
  const cls = "group relative flex min-h-[240px] w-full items-end overflow-hidden bg-coal text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember md:min-h-[360px]";
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  return <Link to={to!} className={cls}>{inner}</Link>;
}
function IntentRow({ title, detail, thumb, to, hash, onClick }: { title: string; detail?: ReactNode; thumb?: string; to?: "/banquets" | "/sauna" | "/menu"; hash?: string; onClick?: () => void }) {
  const inner = <>
    <span className="min-w-0 flex-1"><span className="poster-type block text-[clamp(1.7rem,6vw,2.6rem)]">{title}</span>{detail && <span className="mt-2 block max-w-xl text-[13px] leading-snug opacity-75">{detail}</span>}</span>
    {thumb && <ArchPhoto src={thumb} alt={title} width={787} height={854} className="h-24 w-20 shrink-0 self-center sm:h-28 sm:w-24" />}
    <ArrowRight className="h-6 w-6 shrink-0 self-center transition-transform group-hover:translate-x-1" aria-hidden="true" />
  </>;
  const cls = "group flex min-h-[112px] w-full items-center gap-3 border-b border-coal/20 px-1 py-4 text-left transition-colors hover:bg-coal hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember sm:px-4";
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  return <Link to={to!} {...(hash ? { hash } : {})} className={cls}>{inner}</Link>;
}

const dishCount = MENU.reduce((n, c) => n + c.items.length, 0);

function Index() {
  const { l, lang } = useI18n();
  const { openBooking } = useBooking();
  const [today, setToday] = useState("");
  const [weekday, setWeekday] = useState<number | null>(null);
  useEffect(() => {
    const now = new Date(); setToday(rigaToday(now));
    const wd = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", weekday: "short" }).format(now);
    setWeekday(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd));
  }, []);
  const month = Number(today.slice(5, 7)), day = Number(today.slice(8, 10));
  const seasonal = Boolean(today) && (month === 11 || month === 12 || (month === 1 && day <= 10));
  const event = today.startsWith("2026-11") ? C.events.list.find(([date]) => date === day) : undefined;
  const hoursRows = [
    { days: C.contacts.days[0]!, hours: "12:00–22:00", active: weekday !== null && weekday >= 1 && weekday <= 4 },
    { days: C.contacts.days[1]!, hours: "12:00–23:00", active: weekday === 5 || weekday === 6 },
    { days: C.contacts.days[2]!, hours: "12:00–22:00", active: weekday === 0 },
  ];
  const reviews = [C.reviews.items[0]!, C.reviews.items[1]!, C.reviews.items[4]!];
  const quote = (text: string) => lang === "lv" ? `„${text}”` : lang === "ru" ? `«${text}»` : `“${text}”`;
  return (
    <>
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-var(--bar-h))] items-end overflow-hidden bg-coal text-paper lg:min-h-[min(100svh,860px)]">
        <img src={IMG.shashlikCoals} alt={l(C.menu.title)} width={1600} height={900} fetchPriority="high" decoding="async" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/55 to-coal/10" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-8 pt-24 lg:pb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass sm:text-xs">{l(C.hero.eyebrow)}</p>
          <h1 aria-label={l(P.heroA11y)} className="mt-3 font-display text-[clamp(3.6rem,17vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.04em]">
            <span className="block overflow-hidden"><span className="hero-line block">Zelta</span></span><span className="block overflow-hidden"><span className="hero-line block">Pakavs</span></span>
          </h1>
          <p className="mt-4 max-w-2xl font-voice text-lg italic leading-snug text-paper/90 md:text-2xl">{l(C.hero.line)}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md"><Button type="button" onClick={openBooking} className="px-2 text-xs">{l(P.bookTable)}</Button><Button asChild variant="outline" className="border-paper/70 px-2 text-xs"><Link to="/menu">{l(C.nav.menu)}</Link></Button></div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center text-[13px] font-medium text-paper/85 hover:text-paper">{GOOGLE_RATING} ★ · {GOOGLE_REVIEWS} Google · Imanta · {lang === "lv" ? "kopš" : lang === "ru" ? "с" : "since"} 1999</a>
        </div>
      </section>
      <section className="bg-coal px-5 pb-14 pt-6 text-paper md:pb-20 md:pt-10">
        <div className="mx-auto max-w-[1440px]">
          {seasonal && <Link to="/banquets" search={{ occasion: "xmas" }} hash="request" className="mb-5 flex min-h-14 items-center justify-between gap-3 border border-ember/60 px-4 py-3 text-sm font-semibold text-ember transition-colors hover:bg-ember hover:text-paper"><span>{l(P.season)}</span><ArrowRight className="shrink-0" /></Link>}
          <div className="grid gap-3 md:grid-cols-3">
            <EntryCard title={l(P.intents[0]!.title)} img={IMG.shashlikPlate} onClick={openBooking} detail={<OpenStatus />} />
            <EntryCard title={l(P.intents[1]!.title)} img={IMG.banquetTables} to="/banquets" detail={l(P.intents[1]!.detail!)} />
            <EntryCard title={l(P.intents[2]!.title)} img={IMG.zpPirts} to="/sauna" detail={l(P.intents[2]!.detail!)} />
          </div>
          <div className="mt-4 border-t border-paper/15">
            <IntentRow title={l(P.intents[3]!.title)} detail={l(P.intents[3]!.detail!)} to="/banquets" hash="memorial" />
            <IntentRow title={l(P.intents[4]!.title)} detail={l(P.intents[4]!.detail!)} to="/menu" />
          </div>
          {event && <Link to="/events" className="mt-5 flex min-h-12 items-center gap-2 font-semibold text-ember">{l(P.tonight)}: {l(event[1])}<ArrowRight className="h-5 w-5" /></Link>}
        </div>
      </section>

      <section className="section-pad bg-coal px-5 text-paper">
        <div className="mx-auto mb-8 max-w-5xl">
          <SectionLabel number="">{l(P.menuCaption)}</SectionLabel>
          <PosterHeading className="mt-4">{l(P.chefTitle)}</PosterHeading>
          <p className="mt-4 max-w-xl font-voice text-lg italic leading-snug text-paper/75 md:text-xl">{l(P.chefSub)}</p>
        </div>
        <DishShowcase />
        <div className="mx-auto mt-10 max-w-5xl">
          <Link to="/menu" className="group flex min-h-[72px] w-full items-center justify-between gap-4 border-2 border-brass px-6 py-4 transition-colors hover:bg-brass hover:text-coal">
            <span className="min-w-0"><span className="poster-type block text-[clamp(1.6rem,5.5vw,2.4rem)]">{l(P.fullMenu)}</span><span className="mt-1 block text-[13px] text-paper/70 group-hover:text-coal/70">{dishCount} {l(P.dishesWord)} · {MENU.length} {l(P.categoriesWord)}</span></span>
            <ArrowRight className="h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden bg-paper px-5 text-coal">
        <div className="relative mx-auto max-w-6xl">
          <SectionLabel number="">{l(P.storyCaption)}</SectionLabel>
          <div className="mt-5 grid items-center gap-10 md:grid-cols-[1.15fr_.85fr]">
            <div><PosterHeading>{l(P.storyHeading)}</PosterHeading><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{l(P.storyText)}</p><Button asChild variant="outline" className="mt-7"><Link to="/gallery">{l(P.about)}<ArrowRight /></Link></Button></div>
            <div className="grid grid-cols-2 items-start gap-3"><ArchPhoto src={IMG.terrace} alt={l(C.gallery.title)} width={788} height={840} className="aspect-[3/4]" /><ArchPhoto src={IMG.hallEmpty} alt={l(C.nav.banquets)} width={787} height={1400} className="mt-8 aspect-[3/4]" /></div>
          </div>
          <div className="mt-16 border-t border-coal/20 pt-7">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 font-semibold hover:text-ember"><span className="font-display text-4xl font-black text-ember">{GOOGLE_RATING} ★</span><span>{GOOGLE_REVIEWS} {l(C.reviews.badge)}</span><ArrowRight /></a>
            <div className="mt-5 grid md:grid-cols-3 md:gap-x-8">{reviews.map((review) => <blockquote key={review.en} className="border-t border-coal/20 py-5"><p className="font-voice text-lg italic leading-relaxed">{quote(l(review))}</p><footer className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{l(C.reviews.source)}</footer></blockquote>)}</div>
          </div>
        </div>
      </section>

      <section className="bg-coal px-5 py-14 text-paper md:py-20"><div className="mx-auto max-w-[1440px]"><PosterHeading className="mb-8">{l(P.eveningTitle)}</PosterHeading><div className="snap-pad -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3">{[IMG.shashlikCoals, IMG.hallWedding, IMG.gazebo, IMG.banquetTables, IMG.zpPirts].map((src, i) => <figure key={src} className="relative aspect-[4/5] w-[72vw] max-w-[360px] shrink-0 snap-start overflow-hidden bg-coal-2 md:w-[26%]"><img src={src} alt="" loading="lazy" decoding="async" className="photo-grade h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent" aria-hidden="true" /><figcaption className="poster-type absolute bottom-4 left-4 text-3xl">{l(P.evening[i]!)}</figcaption></figure>)}</div></div></section>

      <section className="border-t border-paper/15 bg-coal px-5 py-12 text-paper md:py-16"><dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-paper/15 text-center">{P.stats.map((s) => <div key={s.n} className="px-2"><dt className="font-display text-[clamp(2.5rem,9vw,5.5rem)] font-black leading-none tabular-nums text-brass">{s.n}</dt><dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] md:text-sm">{l(s.t)}</dd></div>)}</dl></section>

      <section id="contacts" className="section-pad scroll-mt-[60px] bg-coal px-5 text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div><SectionLabel number="">{l(P.visitCaption)}</SectionLabel><PosterHeading className="mt-4">{l(C.contacts.title)}</PosterHeading><p className="mt-6 text-xl">{ADDRESS} (Imanta)</p><p className="mt-2 text-paper/70">{l(P.freeParking)}</p><OpenStatus className="mt-4 text-paper" />
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild><a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer"><Navigation />{l(C.contacts.route)}</a></Button><Button asChild variant="outline" className="border-paper/50"><a href={WAZE_URL} target="_blank" rel="noreferrer">Waze</a></Button><Button asChild variant="outline" className="border-paper/50"><a href={tel(MAIN_PHONE)}><Phone />{MAIN_PHONE}</a></Button></div>
          </div>
          <div className="self-end border-t border-paper/20">{hoursRows.map((row) => <div key={row.days.en} className={`flex min-h-16 items-center justify-between gap-4 border-b border-paper/20 px-3 py-4 text-sm ${row.active ? "border-l-2 border-l-ember bg-coal-2 font-semibold" : ""}`}><span>{l(row.days)}</span><span className="whitespace-nowrap tabular-nums">{row.hours}</span></div>)}</div>
        </div>
      </section>
    </>
  );
}



