import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { S } from "@/lib/copy-pages";
import { SAUNA_CONTACT, SAUNA_CONTACT_PHONE, SAUNA_PHONE, tel } from "@/lib/config";
import { PhotoBlock, pillBtn } from "@/components/site/Section";
import { ContactActions, ContactLinks, contactChannel, openContact } from "@/components/site/ContactActions";
import { SIMPLE } from "@/lib/copy";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/sauna")({
  head: () => ({ ...pageHead("/sauna", "ZP Pirts — krievu pirts ar baseinu Rīgā", "Privāta krievu pirts ar baseinu jūsu kompānijai. ZP Pirts Rīgā: sazinieties pa tālruni vai e-pastā. Cena pēc pieprasījuma.") }),
  component: Sauna,
});

function Sauna() {
  const { l } = useI18n();
  const submit = (event: FormEvent) => { event.preventDefault(); openContact(contactChannel(event), l(S.waMsg), l(S.waMsg), SAUNA_CONTACT_PHONE); };
  return (
    <>
      <PhotoBlock img={IMG.zpPirts} title={l(S.title)} line={l(SIMPLE.saunaD)} h1 landscape compact><ContactLinks sauna subject={l(S.waMsg)} /></PhotoBlock>
      <section className="bg-paper px-5 py-10 text-coal">
        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-x-5 text-sm sm:grid-cols-2">{S.features.map((x) => <li key={x.en} className="flex min-h-14 gap-2 border-b border-coal/20 py-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />{l(x)}</li>)}</ul>
        <p className="mx-auto mt-6 max-w-3xl text-muted-foreground">{l(S.food)}</p>
      </section>
      <section className="relative h-[42svh] min-h-[260px] overflow-hidden bg-coal text-paper md:h-[56vh]">
        <img src={IMG.banyaCabin} alt={l(S.title)} width={1400} height={1866} loading="lazy" decoding="async" className="photo-grade absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-coal/20 to-transparent" aria-hidden="true" />
        <p className="poster-type relative mx-auto flex h-full max-w-6xl items-end px-5 pb-7 text-[clamp(1.6rem,5vw,3rem)]">{l(S.cabin)}</p>
      </section>
      <section id="book" className="scroll-mt-[60px] bg-pine px-4 py-12 text-paper md:py-20">
        <form onSubmit={submit} className="mx-auto max-w-xl border border-paper/30 bg-paper p-6 text-coal md:p-8">
          <p className="font-semibold">{l(S.price)}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">ZP Pirts</p><a href={tel(SAUNA_PHONE)} className="inline-flex min-h-11 items-center font-display text-3xl font-bold">{SAUNA_PHONE}</a>
          <p className="text-sm text-muted-foreground">{l(S.contact)}: {SAUNA_CONTACT}, <a href={tel(SAUNA_CONTACT_PHONE)} className="inline-flex min-h-11 items-center underline">{SAUNA_CONTACT_PHONE}</a></p>
          <div className="mt-5"><ContactActions sauna /></div>
        </form>
      </section>
    </>
  );
}
