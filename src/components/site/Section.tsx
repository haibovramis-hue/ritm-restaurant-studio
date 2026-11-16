import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ArchPhoto, PosterHeading, SectionLabel } from "./Design";

export function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <Reveal className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <SectionLabel number="—" className={align === "center" ? "justify-center" : ""}>{eyebrow}</SectionLabel>
      <PosterHeading className="mt-5 !text-[clamp(2.3rem,6.5vw,4.4rem)]">{title}</PosterHeading>
      {sub && <p className="mt-5 leading-relaxed text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function PhotoBand({ src, className = "" }: { src: string; className?: string }) {
  return <Reveal className={`mb-10 ${className}`}><ArchPhoto src={src} width={787} height={854} className="aspect-[16/9]" /></Reveal>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm"><span className="mb-1.5 block font-medium text-coal">{label}</span>{children}</label>;
}
export const inputCls = "min-h-12 w-full min-w-0 rounded-[2px] border-[1.5px] border-coal/30 bg-paper px-3 py-3 text-base text-coal outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/25 disabled:opacity-50";
export const goldBtn = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[2px] bg-ember px-5 py-3 text-xs font-semibold uppercase tracking-[0.09em] text-paper transition hover:bg-coal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember active:translate-y-px";
export const pillBtn = goldBtn;

/** Shared inner-page opener: real photo in a framed slot, short promise, then action. */
export function PhotoBlock({ img, title, line, children, eager = false, h1 = false, landscape = false, compact = false }: { img: string; title: string; line?: ReactNode; children?: ReactNode; eager?: boolean; h1?: boolean; tall?: boolean; landscape?: boolean; compact?: boolean }) {
  return (
    <section className={`bg-coal px-5 text-paper md:py-16 ${compact ? "py-6" : "py-10"}`}>
      <div className={`mx-auto grid max-w-6xl items-center md:grid-cols-2 md:gap-14 ${compact ? "gap-4" : "gap-8"}`}>
        {landscape ? (
          <div className="mx-auto w-full max-w-[620px] bg-paper-2 p-2">
            <img src={img} alt={title} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" width={787} height={546} className={`aspect-[3/2] w-full object-contain ${compact ? "max-h-32 md:max-h-none" : ""}`} />
          </div>
        ) : <ArchPhoto src={img} alt={title} width={1600} height={1067} eager={eager} className={`w-full md:aspect-[3/2] ${compact ? "aspect-[16/7]" : "aspect-[3/2]"}`} />}
        <div className={landscape ? "md:order-first" : ""}>
          <PosterHeading as={h1 ? "h1" : "h2"} className={compact ? "!text-5xl md:!text-7xl" : "!text-[clamp(3rem,10vw,6.5rem)]"}>{title}</PosterHeading>
          {line && <div className={`${compact ? "mt-3" : "mt-5"} max-w-xl space-y-1 leading-relaxed text-paper/75`}>{line}</div>}
          {children && <div className={`${compact ? "mt-4" : "mt-7"} flex flex-wrap gap-3`}>{children}</div>}
        </div>
      </div>
    </section>
  );
}


