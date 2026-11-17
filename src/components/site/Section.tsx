import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ArchPhoto, PosterHeading, SectionLabel } from "./Design";

/** Page width and gutters shared by every section of the site. */
export const wrapCls = "mx-auto w-full max-w-[1320px]";
export const gutterCls = "px-5 md:px-10";

export function SectionHead({ eyebrow, title, sub, align = "left" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <Reveal className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <PosterHeading className="mt-5">{title}</PosterHeading>
      {sub && <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function PhotoBand({ src, className = "" }: { src: string; className?: string }) {
  return <Reveal className={`mb-10 ${className}`}><ArchPhoto src={src} width={1600} height={900} className="aspect-[16/9]" /></Reveal>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm"><span className="mb-2 block text-muted-foreground">{label}</span>{children}</label>;
}
/** One input style for the whole site: a quiet box with a hairline, ember on focus. */
export const inputCls = "min-h-[52px] w-full min-w-0 rounded-[2px] border border-coal/20 bg-paper px-4 py-3 text-base text-coal outline-none transition-colors placeholder:text-coal/35 hover:border-coal/40 focus:border-ember disabled:opacity-50";
export const goldBtn = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ember px-7 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-paper hover:text-coal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 active:translate-y-px";
export const pillBtn = goldBtn;

/** A photograph with a caption underneath: used for the second picture on inner pages. */
export function CaptionPhoto({ src, caption, alt = "" }: { src: string; caption: string; alt?: string }) {
  return (
    <figure className={`${wrapCls}`}>
      <div className="aspect-[4/3] overflow-hidden bg-coal-2 md:aspect-[21/9]"><img src={src} alt={alt} width={1600} height={900} loading="lazy" decoding="async" className="photo-grade h-full w-full object-cover" /></div>
      <figcaption className="mt-4 text-[15px] text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** Shared inner-page opener: one photograph edge to edge, with the title and the action laid over it. Same language as the home hero. */
export function PhotoBlock({ img, title, line, children, h1 = false }: { img: string; title: string; line?: ReactNode; children?: ReactNode; eager?: boolean; h1?: boolean; tall?: boolean; landscape?: boolean; compact?: boolean }) {
  const H = h1 ? "h1" : "h2";
  return (
    <section className="relative flex min-h-[64svh] items-end overflow-hidden bg-coal text-paper md:min-h-[min(78svh,720px)]">
      <img src={img} alt="" width={1600} height={1067} fetchPriority="high" decoding="async" className="hero-photo absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/50 to-coal/5" aria-hidden="true" />
      <div className={`${wrapCls} ${gutterCls} relative pb-10 pt-28 md:pb-16`}>
        <H className="hero-fade max-w-[16ch] font-display text-[clamp(2.75rem,7.5vw,6rem)] font-light leading-[0.98] tracking-[-0.03em]">{title}</H>
        {(line || children) && (
          <div className="hero-fade mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {line && <div className="max-w-[36ch] space-y-1 text-[17px] leading-relaxed text-paper/85 md:text-xl">{line}</div>}
            {children && <div className="flex flex-wrap items-center gap-3 md:shrink-0">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
