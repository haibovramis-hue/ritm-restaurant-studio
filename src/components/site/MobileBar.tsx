import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarCheck, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { useBooking } from "@/lib/booking-context";
import { MAIN_PHONE, tel } from "@/lib/config";

export function MobileBar() {
  const { l } = useI18n();
  const { openBooking } = useBooking();
  const cls = "flex min-h-16 flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-semibold";
  return (
    <nav aria-label={l(C.nav.contacts)} className="fixed inset-x-0 bottom-0 z-50 flex border-t border-paper/20 bg-coal text-paper md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={tel(MAIN_PHONE)} className={cls}><Phone className="h-5 w-5 text-brass" />{l(C.bar.call)}</a>
      <Link to="/menu" className={`${cls} border-x border-paper/20`}><BookOpen className="h-5 w-5 text-brass" />{l(C.nav.menu)}</Link>
      <button type="button" onClick={openBooking} className={`${cls} bg-ember text-paper`}><CalendarCheck className="h-5 w-5" />{l(C.bar.book)}</button>
    </nav>
  );
}
