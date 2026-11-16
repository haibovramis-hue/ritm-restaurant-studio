export function Horseshoe({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
      <path d="M11 43V23a13 13 0 0 1 26 0v20" />
      {[18, 27, 36].map((y) => <g key={y} fill="currentColor" stroke="none"><circle cx="11" cy={y} r="1.4" /><circle cx="37" cy={y} r="1.4" /></g>)}
    </svg>
  );
}
