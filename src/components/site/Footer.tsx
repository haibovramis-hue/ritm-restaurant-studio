import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { C, P, SIMPLE } from "@/lib/copy";
import { ADDRESS, EMAIL, FACEBOOK, INSTAGRAM, MAIN_PHONE, tel } from "@/lib/config";
import { Horseshoe } from "./Horseshoe";

export function Footer() {
  const { l } = useI18n();
  const links = [
    { to: "/menu", label: C.nav.menu }, { to: "/banquets", label: C.nav.banquets }, { to: "/sauna", label: C.nav.sauna },
    { to: "/gallery", label: P.about }, { to: "/events", label: C.nav.events },
  ] as const;
  return (
    <footer className="bg-coal px-5 pb-[calc(var(--bar-h)+16px+env(safe-area-inset-bottom))] pt-12 text-paper md:pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end gap-4 border-b border-paper/20 pb-7 text-brass">
          <Horseshoe className="h-12 w-12 shrink-0 md:h-16 md:w-16" />
          <p className="poster-type text-[clamp(4rem,16vw,12rem)] text-paper">Zelta Pakavs</p>
        </div>
        <div className="grid gap-8 py-8 md:grid-cols-3">
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">{l(C.contacts.address)}</p><p className="mt-3">{ADDRESS} (Imanta)</p><a href={tel(MAIN_PHONE)} className="mt-2 inline-flex min-h-11 items-center hover:text-brass">{MAIN_PHONE}</a><a href={`mailto:${EMAIL}`} className="mt-1 flex min-h-11 items-center break-all hover:text-brass">{EMAIL}</a></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">{l(C.contacts.hours)}</p><p className="mt-3 text-sm leading-7 text-paper/75">{l(SIMPLE.hours)}</p></div>
          <nav className="flex flex-wrap content-start gap-x-5 md:justify-end" aria-label={l(C.nav.footerNav)}>{links.map((x) => <Link key={x.to} to={x.to} className="inline-flex min-h-11 min-w-11 items-center hover:text-brass">{l(x.label)}</Link>)}</nav>
        </div>
        <div className="flex flex-col gap-5 border-t border-paper/20 pt-6 text-sm text-paper/65 md:flex-row md:items-center md:justify-between">
          <div><p>SIA Zp Plus, reģ. nr. 40203214219</p><p className="mt-1">© 1999–2026 Zelta Pakavs</p></div>
          <div className="flex gap-2"><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-paper/30 hover:text-brass"><Instagram /></a><a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-paper/30 hover:text-brass"><Facebook /></a></div>
          <p className="flex flex-wrap items-center gap-x-4 text-xs"><a href="https://www.zeltapakavs.lv/Privatuma_Politika.pdf" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-brass">{l(C.nav.privacy)}</a><span>{C.footer.concept}</span></p>
        </div>
      </div>
    </footer>
  );
}
