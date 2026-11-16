import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { openingStatusAt } from "@/lib/config";
import { C } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

export function OpenStatus({ className = "", showDot = true }: { className?: string; showDot?: boolean }) {
  const { l } = useI18n();
  const [status, setStatus] = useState<ReturnType<typeof openingStatusAt> | null>(null);
  useEffect(() => { const update = () => setStatus(openingStatusAt(new Date())); update(); const timer = setInterval(update, 60000); return () => clearInterval(timer); }, []);
  if (!status) return <span className={cn("inline-flex min-h-5", className)} aria-hidden="true" />;
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium", className)}>
      {showDot && <span className={`h-2 w-2 shrink-0 rounded-full ${status.open ? "bg-ember" : "bg-current opacity-45"}`} aria-hidden="true" />}
      {status.open ? `${l(C.status.openUntil)} ${status.close}` : `${l(C.status.opens)} ${status.next}`}
    </span>
  );
}
