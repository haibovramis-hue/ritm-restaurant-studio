import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Horseshoe } from "./Horseshoe";

/** Real photography as a clean full-width frame (the old arch window is retired). Height comes from className, otherwise a 4:3 frame. */
export function ArchPhoto({ src, alt = "", width, height, className = "", imgClassName = "", eager = false }: {
  src: string; alt?: string; width: number; height: number; className?: string; imgClassName?: string; eager?: boolean; outline?: boolean;
}) {
  return (
    <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-coal-2", className)}>
      <img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className={cn("h-full w-full object-cover", imgClassName)} />
    </div>
  );
}

export function SectionLabel({ number, children, className = "" }: { number: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] ${className}`}>
      {number && number !== "—" && <span className="tabular-nums">{number}</span>}<span>{children}</span><span className="hairline-rule min-w-8 flex-1" aria-hidden="true" />
    </div>
  );
}

export function PosterHeading({ as: H = "h2", children, className = "" }: { as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string }) {
  return <H className={`poster-type text-[clamp(2.3rem,6.5vw,4.6rem)] ${className}`}>{children}</H>;
}

export function FactRow({ number, children, className = "" }: { number?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex min-h-14 items-center gap-4 border-t border-current/20 py-3 ${className}`}>
      {number && <span className="w-7 shrink-0 text-xs font-semibold tabular-nums">{number}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function RotatingStamp({ text, className = "" }: { text: string; className?: string }) {
  const id = useId();
  return (
    <div className={cn("pointer-events-none relative h-24 w-24 rounded-full bg-ember text-paper", className)} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="stamp-spin h-full w-full">
        <defs><path id={id} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
        <text fill="currentColor" fontFamily="Onest, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.5"><textPath href={`#${id}`}>{text}</textPath></text>
      </svg>
      <Horseshoe className="absolute inset-0 m-auto h-7 w-7" />
    </div>
  );
}
