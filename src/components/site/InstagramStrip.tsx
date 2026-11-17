
import { useI18n } from "@/lib/i18n";
import { C } from "@/lib/copy";
import { INSTAGRAM_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function InstagramStrip() {
  const { l } = useI18n();
  return <section className="bg-paper px-5 py-16 text-coal md:px-10 md:py-24"><div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><h2 className="poster-type text-[clamp(2rem,4vw,3rem)]">{l(C.insta.title)}</h2><Button asChild variant="outline"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{l(C.insta.cta)}</a></Button></div></section>;
}
