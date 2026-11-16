import { Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { INSTAGRAM_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function InstagramStrip() {
  const { l } = useI18n();
  return <section className="border-t border-coal/20 bg-paper px-5 py-12 text-coal"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><h2 className="poster-type text-4xl">{l(C.insta.title)}</h2><Button asChild variant="outline"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram />{l(C.insta.cta)}</a></Button></div></section>;
}
