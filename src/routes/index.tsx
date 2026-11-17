import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { OpenStatus } from "@/components/site/OpenStatus";
import { useI18n } from "@/lib/i18n";
import { C, P } from "@/lib/copy";
import { ADDRESS, EMAIL, FACEBOOK, INSTAGRAM, GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL, MAIN_PHONE, MAPS_DIRECTIONS_URL, WAZE_URL, tel } from "@/lib/config";
import { useBooking } from "@/lib/booking-context";
import { ArchPhoto, PosterHeading, SectionLabel } from "@/components/site/Design";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";
import { DOOR, EVENING, HomeIntro } from "@/components/site/HomeIntro";
import { MENU, findItem } from "@/lib/menu";
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

/** One of the three doors into the house: a tall photograph, then a title and a line underneath. Nothing is printed over the picture. */
function Door({ title, detail, img, to, onClick }: { title: string; detail?: ReactNode; img: string; to?: "/banquets" | "/sauna"; onClick?: () => void }) {
  const inner = <>
    <span className="block aspect-[4/5] overflow-hidden bg-coal-2"><img src={img} alt="" width={1200} height={1500} loading="lazy" decoding="async" className="photo-grade zoom-img h-full w-full object-cover" /></span>
    <span className="mt-5 flex items-start justify-between gap-4">
      <span className="min-w-0"><span className="poster-type block text-[1.75rem] md:text-[2rem]">{title}</span>{detail && <span className="mt-2 block text-[15px] leading-snug text-paper/55">{detail}</span>}</span>
      <ArrowUpRight strokeWidth={1.25} className="mt-2 h-6 w-6 shrink-0 text-paper/45 transition-colors group-hover:text-ember" aria-hidden="true" />
    </span>
  </>;
  const cls = "group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-coal";
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  return <Link to={to!} className={cls}>{inner}</Link>;
}

/** What people come here for, as a plain price list. No carousel, no giant plates. */
const SIGNATURE = ["plate4", "pork", "lamb", "lula-lamb", "ribs", "khinkali", "solyanka", "kharcho", "fondant"];
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
  const dishes = SIGNATURE.map((id) => findItem(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const wrap = "mx-auto w-full max-w-[1320px]";
  const quiet = "group flex min-h-[88px] items-center justify-between gap-4 border-b border-paper/12 py-5 md:border-b-0";
  return (
    <>
      {/* 1. One photograph, the name, one line, one action. */}
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-var(--bar-h))] items-end overflow-hidden bg-coal text-paper md:min-h-[min(calc(100svh-var(--header-h)),880px)]">
        <img src={IMG.shashlikCoals} alt={l(C.menu.title)} width={1600} height={900} fetchPriority="high" decoding="async" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/45 to-coal/5" aria-hidden="true" />
        <div className={`${wrap} relative px-5 pb-10 pt-28 md:px-10 md:pb-16`}>
          <p className="eyebrow hero-fade text-paper/70">{l(C.hero.eyebrow)}</p>
          <h1 aria-label={l(P.heroA11y)} className="mt-5 font-display text-[clamp(3.5rem,11.5vw,9.5rem)] font-light leading-[0.92] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-[0.08em]"><span className="hero-line block">Zelta Pakavs</span></span>
          </h1>
          <div className="hero-fade mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[30ch] text-[17px] leading-relaxed text-paper/85 md:text-xl">{l(C.hero.line)}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button type="button" onClick={openBooking}>{l(P.bookTable)}</Button>
              <Link to="/menu" className="line-link">{l(C.nav.menu)}<ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-paper/15 pt-5 text-[13px] text-paper/65">
            <OpenStatus className="!text-[13px] !font-normal text-paper/85" />
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center hover:text-paper">{GOOGLE_RATING} ★ · {GOOGLE_REVIEWS} Google</a>
            <span>{ADDRESS}, Imanta</span>
          </div>
        </div>
      </section>

      <HomeIntro />

      {/* 2. Three doors. */}
      <section className="section-pad bg-coal px-5 text-paper md:px-10">
        <div className={wrap}>
          {seasonal && <Link to="/banquets" search={{ occasion: "xmas" }} hash="request" className="line-link mb-12 text-ember md:mb-16">{l(P.season)}<ArrowRight aria-hidden="true" /></Link>}
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            <Door title={l(P.intents[0]!.title)} img={IMG.shashlikPlate} onClick={openBooking} detail={l(DOOR[0]!)} />
            <Door title={l(P.intents[1]!.title)} img={IMG.banquetTables} to="/banquets" detail={l(DOOR[1]!)} />
            <Door title={l(P.intents[2]!.title)} img={IMG.zpPirts} to="/sauna" detail={l(DOOR[2]!)} />
          </div>
          <div className="mt-16 grid gap-x-8 border-t border-paper/12 md:mt-20 md:grid-cols-3">
            <Link to="/banquets" hash="memorial" className={quiet}><span><span className="block text-[17px]">{l(P.intents[3]!.title)}</span><span className="mt-1 block text-sm text-paper/50">{l(P.intents[3]!.detail!)}</span></span><ArrowUpRight strokeWidth={1.25} className="h-5 w-5 shrink-0 text-paper/40 transition-colors group-hover:text-ember" aria-hidden="true" /></Link>
            <Link to="/menu" className={quiet}><span><span className="block text-[17px]">{l(P.intents[4]!.title)}</span><span className="mt-1 block text-sm text-paper/50">{l(P.intents[4]!.detail!)}</span></span><ArrowUpRight strokeWidth={1.25} className="h-5 w-5 shrink-0 text-paper/40 transition-colors group-hover:text-ember" aria-hidden="true" /></Link>
            {event && <Link to="/events" className={quiet}><span><span className="block text-[17px]">{l(P.tonight)}</span><span className="mt-1 block text-sm text-paper/50">{l(event[1])}</span></span><ArrowUpRight strokeWidth={1.25} className="h-5 w-5 shrink-0 text-paper/40 transition-colors group-hover:text-ember" aria-hidden="true" /></Link>}
          </div>
        </div>
      </section>

      {/* 3. The table: a price list, not a slideshow. */}
      <section className="section-pad bg-paper px-5 text-coal md:px-10">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <SectionLabel>{l(P.menuCaption)}</SectionLabel>
            <PosterHeading className="mt-5">{l(P.chefTitle)}</PosterHeading>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-relaxed text-muted-foreground">{l(P.chefSub)}</p>
            <Link to="/menu" className="line-link mt-8">{l(P.fullMenu)} · {dishCount} {l(P.dishesWord)}<ArrowRight aria-hidden="true" /></Link>
          </div>
          <ul className="border-t border-coal/15">
            {dishes.map((d) => (
              <li key={d.id} className="flex items-baseline justify-between gap-6 border-b border-coal/15 py-[18px]">
                <span className="min-w-0"><span className="block text-[17px] leading-snug">{l(d.name)}</span>{l(d.desc) && <span className="mt-1 block text-sm text-muted-foreground">{l(d.desc)}</span>}</span>
                <span className="shrink-0 whitespace-nowrap text-[17px] tabular-nums">{d.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. The place. */}
      <section className="section-pad bg-paper px-5 !pt-0 text-coal md:px-10">
        <div className={wrap}>
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <ArchPhoto src={IMG.terrace} alt={l(C.gallery.title)} width={1600} height={900} className="aspect-[4/3] md:col-span-7 md:aspect-[16/10]" />
            <ArchPhoto src={IMG.verandaLong} alt={l(C.nav.banquets)} width={1400} height={1050} className="hidden aspect-[4/5] md:col-span-5 md:block" />
          </div>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
            <SectionLabel className="md:col-span-3 md:pt-3">{l(P.storyCaption)}</SectionLabel>
            <div className="md:col-span-8">
              <PosterHeading>{l(P.storyHeading)}</PosterHeading>
              <p className="mt-7 max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground">{l(P.storyText)}</p>
              <Link to="/gallery" className="line-link mt-7">{l(P.about)}<ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Guests. */}
      <section className="section-pad bg-paper-2 px-5 text-coal md:px-10">
        <div className={wrap}>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="group inline-flex items-baseline gap-4"><span className="font-display text-6xl font-light tracking-[-0.03em] md:text-7xl">{GOOGLE_RATING}</span><span className="text-[15px] text-muted-foreground transition-colors group-hover:text-ember">{GOOGLE_REVIEWS} {l(C.reviews.badge)}</span></a>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">{reviews.map((review) => <blockquote key={review.en}><p className="font-voice text-[1.6rem] font-light italic leading-[1.3]">{quote(l(review))}</p><footer className="eyebrow mt-5 opacity-50">{l(C.reviews.source)}</footer></blockquote>)}</div>
        </div>
      </section>

      {/* 6. An evening here: a quiet strip of real corners of the house. */}
      <section className="section-pad bg-coal text-paper">
        <div className={`${wrap} px-5 md:px-10`}><PosterHeading>{l(P.eveningTitle)}</PosterHeading></div>
        <div className="snap-pad mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mt-14 md:gap-6 md:px-10">
          {[IMG.grillCoals2, IMG.hallWedding, IMG.gazebo, IMG.courtyardOven, IMG.banyaCabin].map((src, i) => (
            <figure key={src} className="w-[74vw] max-w-[400px] shrink-0 snap-start md:w-[30%]">
              <div className="aspect-[4/5] overflow-hidden bg-coal-2"><img src={src} alt="" loading="lazy" decoding="async" className="photo-grade h-full w-full object-cover" /></div>
              <figcaption className="mt-4 text-[15px] text-paper/60">{l(EVENING[i]!)}</figcaption>
            </figure>
          ))}
          <div className="w-1 shrink-0" aria-hidden="true" />
        </div>
      </section>

      {/* 7. Come over. */}
      <section id="contacts" className="section-pad scroll-mt-[var(--header-h)] border-t border-paper/10 bg-coal px-5 text-paper md:px-10">
        <div className={`${wrap} grid gap-14 md:grid-cols-2 md:gap-20`}>
          <div>
            <SectionLabel>{l(P.visitCaption)}</SectionLabel>
            <PosterHeading className="mt-5">{l(C.contacts.title)}</PosterHeading>
            <p className="mt-8 text-xl">{ADDRESS}, Imanta</p>
            <p className="mt-2 text-paper/55">{l(P.freeParking)}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button asChild><a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer">{l(C.contacts.route)}</a></Button>
              <a href={tel(MAIN_PHONE)} className="line-link">{MAIN_PHONE}</a>
              <a href={WAZE_URL} target="_blank" rel="noreferrer" className="line-link">Waze</a>
            </div>
          </div>
          <div className="self-end">
            <OpenStatus className="mb-5 !text-[15px] !font-normal text-paper" />
            <div className="border-t border-paper/15">{hoursRows.map((row) => <div key={row.days.en} className={`flex min-h-[60px] items-center justify-between gap-4 border-b border-paper/15 py-4 text-[15px] ${row.active ? "text-paper" : "text-paper/50"}`}><span>{l(row.days)}</span><span className="whitespace-nowrap tabular-nums">{row.hours}</span></div>)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
