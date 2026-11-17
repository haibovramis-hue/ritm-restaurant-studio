import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { C, P, SIMPLE } from "@/lib/copy";
import { ADDRESS, EMAIL, FACEBOOK, INSTAGRAM, MAIN_PHONE, tel } from "@/lib/config";

export function Footer() {
  const { l } = useI18n();
  const links = [
    { to: "/menu", label: C.nav.menu }, { to: "/banquets", label: C.nav.banquets }, { to: "/sauna", label: C.nav.sauna },
    { to: "/gallery", label: P.about }, { to: "/events", label: C.nav.events },
  ] as const;
  const item = "inline-flex min-h-10 items-center text-paper/70 transition-colors hover:text-paper";
  return (
    <footer className="border-t border-paper/10 bg-coal px-5 pb-[calc(var(--bar-h)+24px+env(safe-area-inset-bottom))] pt-16 text-paper md:px-10 md:pb-12 md:pt-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="poster-type text-4xl">Zelta Pakavs</p>
            <p className="mt-4 max-w-[26ch] text-[15px] text-paper/60">{ADDRESS}, Imanta</p>
          </div>
          <div className="text-[15px]">
            <p className="eyebrow text-paper/45">{l(C.contacts.address)}</p>
            <div className="mt-4 flex flex-col"><a href={tel(MAIN_PHONE)} className={item}>{MAIN_PHONE}</a><a href={`mailto:${EMAIL}`} className={`${item} break-all`}>{EMAIL}</a></div>
          </div>
          <div className="text-[15px]">
            <p className="eyebrow text-paper/45">{l(C.contacts.hours)}</p>
            <p className="mt-4 leading-8 text-paper/70">{l(SIMPLE.hours)}</p>
          </div>
          <nav className="flex flex-col text-[15px]" aria-label={l(C.nav.footerNav)}>
            <p className="eyebrow mb-4 text-paper/45">{l(C.nav.main)}</p>
            {links.map((x) => <Link key={x.to} to={x.to} className={item}>{l(x.label)}</Link>)}
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-6 text-[13px] text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>SIA Zp Plus, reģ. nr. 40203214219 · © 1999–2026 · {C.footer.concept}</p>
          <p className="flex flex-wrap items-center gap-x-6">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center hover:text-paper">Instagram</a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center hover:text-paper">Facebook</a>
            <a href="https://www.zeltapakavs.lv/Privatuma_Politika.pdf" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center hover:text-paper">{l(C.nav.privacy)}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
