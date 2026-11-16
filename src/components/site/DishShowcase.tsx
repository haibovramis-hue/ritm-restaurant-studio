import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { findItem } from "@/lib/menu";
import ribs from "@/assets/real/showcase-ribs.webp";
import cutlets from "@/assets/real/showcase-cutlets.webp";
import greek from "@/assets/real/showcase-greek.webp";
import draniki from "@/assets/real/showcase-draniki.webp";
import julienne from "@/assets/real/showcase-julienne.webp";
import solyanka from "@/assets/real/showcase-solyanka.webp";
import octosalad from "@/assets/real/showcase-octosalad.webp";
import homepot from "@/assets/real/showcase-homepot.webp";
import cheesecake from "@/assets/real/showcase-cheesecake.webp";

/** Only dishes whose photo is confirmed to match an official menu item. One table, one light: only the plate changes. */
const SHOWCASE: { id: string; src: string }[] = [
  { id: "ribs", src: ribs },
  { id: "julienne-ch", src: julienne },
  { id: "solyanka", src: solyanka },
  { id: "homepot", src: homepot },
  { id: "octosalad", src: octosalad },
  { id: "cutlets", src: cutlets },
  { id: "greek", src: greek },
  { id: "draniki", src: draniki },
  { id: "cheesecake", src: cheesecake },
];

export function DishShowcase() {
  const { l } = useI18n();
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const n = SHOWCASE.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  useEffect(() => { SHOWCASE.forEach((s) => { const im = new Image(); im.src = s.src; }); }, []);
  const cur = SHOWCASE[i]!;
  const item = findItem(cur.id);
  return (
    <div
      className="mx-auto max-w-5xl"
      onTouchStart={(e) => { touch.current = e.touches[0]!.clientX; }}
      onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; }}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-coal-2">
        {SHOWCASE.map((s, k) => (
          <img key={s.id} src={s.src} alt={k === i ? l(findItem(s.id)!.name) : ""} aria-hidden={k !== i} width={1400} height={933} loading={k === 0 ? "eager" : "lazy"} decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="min-w-0" aria-live="polite">
          <h3 className="poster-type text-[clamp(1.8rem,6vw,3rem)]">{item ? l(item.name) : ""}</h3>
          {item && l(item.desc) && <p className="mt-2 text-sm text-paper/70">{l(item.desc)}</p>}
        </div>
        <p className="shrink-0 font-display text-3xl font-black tabular-nums text-brass">{item?.price}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap gap-1" role="tablist">
          {SHOWCASE.map((s, k) => <button key={s.id} type="button" role="tab" aria-selected={k === i} aria-label={l(findItem(s.id)!.name)} onClick={() => setI(k)} className="flex h-11 w-7 items-center justify-center"><span className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-ember" : "w-2.5 bg-paper/40"}`} /></button>)}
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="←" className="flex h-12 w-12 items-center justify-center border border-paper/40 hover:bg-paper hover:text-coal"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => go(1)} aria-label="→" className="flex h-12 w-12 items-center justify-center bg-ember text-paper hover:bg-paper hover:text-coal"><ArrowRight className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  );
}
