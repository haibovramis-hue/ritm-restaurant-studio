import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { C, HOME } from "@/lib/copy";
import { BookingForm } from "@/components/site/BookingForm";

const Ctx = createContext<{ openBooking: () => void }>({ openBooking: () => {} });

/** One table-booking bottom sheet for the whole site; /#booking opens it too. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const { l } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => { const check = () => { if (location.hash === "#booking") setOpen(true); }; check(); addEventListener("hashchange", check); return () => removeEventListener("hashchange", check); }, []);
  const change = (value: boolean) => { setOpen(value); if (!value && location.hash === "#booking") history.replaceState(null, "", location.pathname + location.search); };
  return (
    <Ctx.Provider value={{ openBooking: () => setOpen(true) }}>
      {children}
      <Dialog.Root open={open} onOpenChange={change}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-coal/75" />
          <Dialog.Content aria-describedby={undefined} className="fixed inset-x-0 bottom-0 z-[70] max-h-[92dvh] overflow-y-auto rounded-t-[2px] bg-paper p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="mb-2 flex items-center justify-between gap-2 px-2">
              <Dialog.Title className="eyebrow opacity-60">{l(C.booking.title)}</Dialog.Title>
              <Dialog.Close className="grid h-11 w-11 place-items-center rounded-full text-coal/60 transition-colors hover:text-coal" aria-label={l(HOME.close)}><X /></Dialog.Close>
            </div>
            <BookingForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}
export const useBooking = () => useContext(Ctx);
