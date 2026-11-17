import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { useBooking } from "@/lib/booking-context";
import { MAIN_PHONE, tel } from "@/lib/config";

export function MobileBar() {
  const { l } = useI18n();
  const { openBooking } = useBooking();
  const cls = "flex min-h-[60px] flex-1 items-center justify-center px-2 text-[14px] font-medium";
  return (
    <nav aria-label={l(C.nav.contacts)} className="fixed inset-x-0 bottom-0 z-50 flex border-t border-paper/15 bg-coal text-paper md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={tel(MAIN_PHONE)} className={cls}>{l(C.bar.call)}</a>
      <Link to="/menu" className={`${cls} border-x border-paper/15`}>{l(C.nav.menu)}</Link>
      <button type="button" onClick={openBooking} className={`${cls} bg-ember text-paper`}>{l(C.bar.book)}</button>
    </nav>
  );
}
