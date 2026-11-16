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

/** Shared inner-page opener: one photograph edge to edge, with the promise and the action laid over it — same language as the home hero. */
export function PhotoBlock({ img, title, line, children, h1 = false }: { img: string; title: string; line?: ReactNode; children?: ReactNode; eager?: boolean; h1?: boolean; tall?: boolean; landscape?: boolean; compact?: boolean }) {
  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-coal text-paper md:min-h-[min(82svh,720px)]">
      <img src={img} alt="" width={1600} height={1067} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/60 to-coal/10" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-9 pt-24 md:pb-14">
        <PosterHeading as={h1 ? "h1" : "h2"} className="!text-[clamp(2.6rem,9vw,5rem)]">{title}</PosterHeading>
        {line && <div className="mt-4 max-w-xl space-y-1 font-voice text-lg italic leading-snug text-paper/90 md:text-2xl">{line}</div>}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}


