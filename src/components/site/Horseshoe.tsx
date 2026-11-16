import logo from "@/assets/real/logo-zp.webp";

/** The restaurant's own golden horseshoe, taken from zeltapakavs.lv. Not a redrawn substitute. */
export function Horseshoe({ className = "h-6 w-6" }: { className?: string }) {
  return <img src={logo} alt="" aria-hidden="true" width={512} height={512} decoding="async" className={`${className} object-contain`} />;
}
