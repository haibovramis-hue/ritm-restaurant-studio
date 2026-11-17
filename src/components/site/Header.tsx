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
    <button key={code} type="button" onClick={() => setLang(code)} aria-pressed={lang === code} className={`h-11 min-w-9 px-1 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${lang === code ? "text-paper" : "text-paper/45 hover:text-paper"}`}>{code}</button>
  ));
  return (
    <>
      <header className="sticky top-0 z-40 h-[var(--header-h)] border-b border-paper/10 bg-coal text-paper">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
          <Link to="/" className="flex min-h-11 shrink-0 items-center gap-3" aria-label="Zelta Pakavs">
            <Horseshoe className="h-6 w-6" /><span className="font-display text-[23px] font-normal tracking-[-0.01em]">Zelta Pakavs</span>
          </Link>
          <nav className="hidden items-center gap-9 text-[15px] lg:flex" aria-label={l(C.nav.main)}>
            {links.map((x) => <Link key={x.to} to={x.to} className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-paper" activeProps={{ className: "!text-paper" }}>{l(x.label)}</Link>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-5">
            <div key={lang} className="flex items-center" role="group" aria-label={l(C.nav.lang)}>{languages}</div>
            <Button type="button" onClick={openBooking} size="sm" className="hidden md:inline-flex">{l(C.nav.book)}</Button>
            <button type="button" className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen(true)} aria-label={l(C.nav.toggle)} aria-expanded={open}><Menu strokeWidth={1.25} /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-coal text-paper lg:hidden" role="dialog" aria-modal="true" aria-label={l(C.nav.toggle)}>
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-paper/10 px-5">
            <span className="flex items-center gap-3"><Horseshoe className="h-6 w-6" /><span className="font-display text-[23px]">Zelta Pakavs</span></span>
            <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label={l(HOME_CLOSE)}><X strokeWidth={1.25} /></button>
          </div>
          <nav className="px-5 pt-8">
            {mobileLinks.map((x) => (
              <Link key={`${x.to}-${x.label.en}`} to={x.to} {...("hash" in x ? { hash: x.hash } : {})} onClick={() => setOpen(false)} className="flex min-h-[68px] items-center border-b border-paper/10">
                <span className="poster-type text-[2.1rem]">{l(x.label)}</span>
              </Link>
            ))}
          </nav>
          <div className="grid gap-2 px-5 pb-28 pt-10 text-[15px] text-paper/60">
            <a href={tel(MAIN_PHONE)} className="flex min-h-11 items-center text-paper">{MAIN_PHONE}</a>
            <p>{ADDRESS}</p><p>{l(SIMPLE.hours)}</p><OpenStatus className="mt-2 text-paper" />
          </div>
        </div>
      )}
    </>
  );
}

const HOME_CLOSE = { lv: "Aizvērt", ru: "Закрыть", en: "Close" };
