import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider, useI18n } from "../lib/i18n";
import { C, P, SIMPLE } from "../lib/copy";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { MobileBar } from "../components/site/MobileBar";
import { BasketProvider } from "../lib/basket-context";
import { BasketPanel } from "../components/site/Basket";
import { BookingProvider } from "../lib/booking-context";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  const { l } = useI18n();
  return <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5 py-16 text-coal"><div className="max-w-xl"><title>{l(SIMPLE.notFound)} — Zelta Pakavs</title><meta name="robots" content="noindex" /><p className="poster-type text-[10rem] text-ember">404</p><h1 className="poster-type mt-3 text-5xl">{l(SIMPLE.notFound)}</h1><Button asChild className="mt-8"><Link to="/">{l(SIMPLE.home)}</Link></Button></div></div>;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const { l } = useI18n();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-paper px-5 text-coal"><div className="max-w-md"><h1 className="poster-type text-5xl">{l(P.error.title)}</h1><p className="mt-4 text-muted-foreground">{l(P.error.text)}</p><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => { router.invalidate(); reset(); }}>{l(P.error.retry)}</Button><Button asChild variant="outline"><a href="/">{l(SIMPLE.home)}</a></Button></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zelta Pakavs — ģimenes restorāns Rīgā kopš 1999" },
      { name: "description", content: "Šašliks uz oglēm, Kaukāza un mājas virtuve, banketi un ZP Pirts ar baseinu. Jūrmalas gatve 80, Rīga." },
      { property: "og:site_name", content: "Zelta Pakavs" }, { property: "og:type", content: "website" }, { property: "og:locale", content: "lv_LV" },
      { property: "og:locale:alternate", content: "ru_RU" }, { property: "og:locale:alternate", content: "en_GB" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss }, { rel: "icon", href: "/logo-zp.png", type: "image/png" }, { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Literata:ital,wght@1,400;1,500&family=Onest:wght@400;500;600&family=Sofia+Sans+Extra+Condensed:wght@800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});

function SkipLink() { const { l } = useI18n(); return <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-ember focus:px-4 focus:py-3 focus:text-paper">{l(C.nav.skip)}</a>; }

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="lv"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><I18nProvider><BasketProvider><BookingProvider><SkipLink /><Header /><main id="main" tabIndex={-1} className="pb-[calc(var(--bar-h)+16px+env(safe-area-inset-bottom))] md:pb-0"><Outlet /></main><Footer /><MobileBar /><BasketPanel /></BookingProvider></BasketProvider></I18nProvider></QueryClientProvider>;
}
