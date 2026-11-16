import { useState, type FormEvent } from "react";
import { Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMAIL, MAIN_PHONE, SAUNA_CONTACT_PHONE, SAUNA_WHATSAPP_CONFIRMED, WHATSAPP_CONFIRMED, mailLink, tel, waLink } from "@/lib/config";
import { P } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

export type ContactChannel = "call" | "email" | "whatsapp";

/** Direct contact links do not require filling out a request form. */
export function ContactLinks({ subject, sauna = false }: { subject: string; sauna?: boolean }) {
  const { l } = useI18n();
  return <div className="w-full">
    <div className="grid grid-cols-2 gap-3">
      <Button asChild><a href={tel(sauna ? SAUNA_CONTACT_PHONE : MAIN_PHONE)}><Phone />{l(P.channels.call)}</a></Button>
      <Button asChild variant="outline"><a href={mailLink(subject, subject)}><Mail />{l(P.channels.email)}</a></Button>
    </div>
    <p className="mt-3 text-sm leading-snug opacity-75">{l(P.channels.note)}</p>
  </div>;
}

export function contactChannel(event: FormEvent): ContactChannel {
  const value = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
  return value === "email" || value === "whatsapp" ? value : "call";
}

export function contactHref(channel: ContactChannel, message: string, subject: string, phone = MAIN_PHONE): string {
  if (channel === "email") return mailLink(subject, message);
  if (channel === "whatsapp") return waLink(message, phone);
  return tel(phone);
}

/** Call and e-mail are always real. WhatsApp stays hidden until its number is owner-confirmed. */
export function ContactActions({ sauna = false, note }: { sauna?: boolean; note?: string }) {
  const { l } = useI18n();
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => { try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* ignore */ } };
  const whatsappConfirmed = sauna ? SAUNA_WHATSAPP_CONFIRMED : WHATSAPP_CONFIRMED;
  return (
    <div className="sm:col-span-2">
      <div className={`grid gap-3 ${whatsappConfirmed ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        <Button asChild className="w-full"><a href={tel(sauna ? SAUNA_CONTACT_PHONE : MAIN_PHONE)}><Phone />{l(P.channels.call)}</a></Button>
        <Button type="submit" name="channel" value="email" variant="outline" className="w-full"><Mail />{l(P.channels.email)}</Button>
        {whatsappConfirmed && <Button type="submit" name="channel" value="whatsapp" variant="secondary" className="w-full"><MessageCircle />WhatsApp</Button>}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note ?? l(P.channels.note)}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l(P.channels.fallback)} {sauna ? SAUNA_CONTACT_PHONE : MAIN_PHONE} · {EMAIL} <button type="button" onClick={copyEmail} className="inline-flex min-h-8 items-center gap-1 align-middle font-semibold underline underline-offset-2"><Copy className="h-3 w-3" />{copied ? l(P.channels.copied) : l(P.channels.copy)}</button></p>
    </div>
  );
}

export function openContact(channel: ContactChannel, message: string, subject: string, phone = MAIN_PHONE) {
  const href = contactHref(channel, message, subject, phone);
  if (channel === "whatsapp") window.open(href, "_blank", "noopener,noreferrer");
  else window.location.href = href;
}

export { EMAIL };
