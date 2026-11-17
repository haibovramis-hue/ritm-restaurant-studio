import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Horseshoe } from "./Horseshoe";

/** A photograph in a clean frame. Height comes from className, otherwise a 4:3 frame. */
export function ArchPhoto({ src, alt = "", width, height, className = "", imgClassName = "", eager = false }: {
  src: string; alt?: string; width: number; height: number; className?: string; imgClassName?: string; eager?: boolean; outline?: boolean;
}) {
  return (
    <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-coal-2", className)}>
      <img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className={cn("photo-grade h-full w-full object-cover", imgClassName)} />
    </div>
  );
}

/** A small quiet label above a heading. No numbers, no rules. */
export function SectionLabel({ children, className = "" }: { number?: string; children: ReactNode; className?: string }) {
  return <p className={`eyebrow opacity-60 ${className}`}>{children}</p>;
}

export function PosterHeading({ as: H = "h2", children, className = "" }: { as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string }) {
  return <H className={`poster-type text-[clamp(2.1rem,4.6vw,3.75rem)] ${className}`}>{children}</H>;
}

export function FactRow({ number, children, className = "" }: { number?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex min-h-14 items-center gap-4 border-t border-current/15 py-3 ${className}`}>
      {number && <span className="w-7 shrink-0 text-xs tabular-nums opacity-50">{number}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** Kept for compatibility with older pages: now a still, quiet mark. */
export function RotatingStamp({ className = "" }: { text: string; className?: string }) {
  return <div className={cn("pointer-events-none grid h-16 w-16 place-items-center rounded-full border border-current/30", className)} aria-hidden="true"><Horseshoe className="h-6 w-6" /></div>;
}
