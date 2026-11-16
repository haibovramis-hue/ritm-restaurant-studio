import { useEffect, useRef, type ReactNode } from "react";
/** Content stays visible; blocks below the fold fade 0.6→1 when they enter view (fallback timer never leaves them dimmed). */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add("pending");
    const done = () => { el.classList.remove("pending"); io.disconnect(); clearTimeout(t); };
    const io = new IntersectionObserver((e) => { if (e[0]?.isIntersecting) done(); }, { rootMargin: "0px 0px 15% 0px" });
    const t = setTimeout(done, 2500);
    io.observe(el); return done;
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${Math.min(delay, 150)}ms` } : undefined}>{children}</div>;
}
