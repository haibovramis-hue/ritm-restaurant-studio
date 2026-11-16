import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { C, P, SIMPLE } from "@/lib/copy";
import { useBooking } from "@/lib/booking-context";
import { ADDRESS, MAIN_PHONE, tel } from "@/lib/config";
import { Horseshoe } from "./Horseshoe";
import { OpenStatus } from "./OpenStatus";
import { Button } from "@/components/ui/button";

export function Header() {
  const { l, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  useEffect(() => { if (!open) return; const old = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = old; }; }, [open]);
  const links = [
    { to: "/menu", label: C.nav.menu }, { to: "/banquets", label: C.nav.banquets },
    { to: "/sauna", label: C.nav.sauna }, { to: "/gallery", label: P.about },
  ] as const;
  const mobileLinks = [...links, { to: "/events", label: C.nav.events }, { to: "/", hash: "contacts", label: C.nav.contacts }] as const;
  const languages = (["lv", "ru", "en"] as Lang[]).map((code) => (
    <Button key={code} variant="ghost" type="button" onClick={() => setLang(code)} aria-pressed={lang === code} className={`h-11 min-w-11 px-1 text-[11px] font-semibold uppercase underline-offset-4 ${lang === code ? "text-ember underline decoration-2" : "text-current hover:text-ember"}`}>{code}</Button>
  ));
  return (
    <>
      <header className="sticky top-0 z-40 h-[60px] border-b border-coal/20 bg-paper text-coal">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-2 px-3 sm:px-5">
          <Link to="/" className="flex min-h-11 shrink-0 items-center gap-2 text-brass" aria-label="Zelta Pakavs">
            <Horseshoe className="h-7 w-7" /><span className="font-display text-[22px] font-black uppercase tracking-[-0.02em] text-coal">Zelta Pakavs</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label={l(C.nav.main)}>
            {links.map((x) => <Link key={x.to} to={x.to} className="inline-flex min-h-11 min-w-11 items-center border-b-2 border-transparent hover:border-ember">{l(x.label)}</Link>)}
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <OpenStatus className="mr-2 hidden xl:inline-flex" />
            <div key={lang} className="flex items-center" role="group" aria-label={l(C.nav.lang)}>{languages}</div>
            <Button type="button" onClick={openBooking} size="sm" className="hidden md:inline-flex">{l(C.nav.book)}</Button>
            <button type="button" className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen(true)} aria-label={l(C.nav.toggle)} aria-expanded={open}><Menu /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-coal text-paper lg:hidden" role="dialog" aria-modal="true" aria-label={l(C.nav.toggle)}>
          <div className="flex h-[60px] items-center justify-between border-b border-paper/20 px-4">
            <span className="flex items-center gap-2 text-brass"><Horseshoe className="h-7 w-7" /><span className="font-display text-2xl font-black uppercase text-paper">Zelta Pakavs</span></span>
            <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label={l(HOME_CLOSE)}><X /></button>
          </div>
          <nav className="px-5 py-5">
            {mobileLinks.map((x, i) => (
              <Link key={`${x.to}-${x.label.en}`} to={x.to} {...("hash" in x ? { hash: x.hash } : {})} onClick={() => setOpen(false)} className="group flex min-h-[72px] items-center gap-4 border-b border-paper/20 py-2">
                <span className="w-6 text-xs font-semibold tabular-nums text-brass">0{i + 1}</span><span className="poster-type text-[clamp(2.7rem,13vw,5rem)] group-hover:text-brass">{l(x.label)}</span>
              </Link>
            ))}
          </nav>
          <div className="grid gap-2 px-5 pb-10 text-sm text-paper/75">
            <a href={tel(MAIN_PHONE)} className="flex min-h-11 items-center font-semibold text-paper">{MAIN_PHONE}</a>
            <p>{ADDRESS}</p><p>{l(SIMPLE.hours)}</p><OpenStatus className="mt-2 text-paper" />
          </div>
        </div>
      )}
    </>
  );
}

const HOME_CLOSE = { lv: "Aizvērt", ru: "Закрыть", en: "Close" };
