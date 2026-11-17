import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { S } from "@/lib/copy-pages";
import { SAUNA_CONTACT, SAUNA_CONTACT_PHONE, SAUNA_PHONE, tel } from "@/lib/config";
import { CaptionPhoto, PhotoBlock, gutterCls, wrapCls } from "@/components/site/Section";
import { ContactActions, ContactLinks, contactChannel, openContact } from "@/components/site/ContactActions";
import { SectionLabel } from "@/components/site/Design";
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
      <PhotoBlock img={IMG.zpPirts} title={l(S.title)} line={l(SIMPLE.saunaD)} h1><ContactLinks sauna subject={l(S.waMsg)} /></PhotoBlock>

      <section className={`section-pad bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <p className="max-w-[30ch] font-display text-[1.75rem] font-light leading-[1.2] tracking-[-0.02em] md:text-[2.25rem]">{l(S.food)}</p>
          <ul className="grid gap-x-12 border-t border-coal/15 sm:grid-cols-2">{S.features.map((x) => <li key={x.en} className="flex min-h-[60px] items-center border-b border-coal/15 py-4 text-[17px]">{l(x)}</li>)}</ul>
        </div>
      </section>

      <section className={`bg-paper pb-[clamp(4.5rem,10vw,9rem)] text-coal ${gutterCls}`}><CaptionPhoto src={IMG.banyaCabin} alt={l(S.title)} caption={l(S.cabin)} /></section>

      <section id="book" className={`section-pad scroll-mt-[var(--header-h)] bg-coal text-paper ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionLabel>ZP Pirts</SectionLabel>
            <a href={tel(SAUNA_PHONE)} className="mt-5 block font-display text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-none tracking-[-0.03em] transition-colors hover:text-ember">{SAUNA_PHONE}</a>
            <p className="mt-8 text-[17px] text-paper/60">{l(S.contact)}: {SAUNA_CONTACT}, <a href={tel(SAUNA_CONTACT_PHONE)} className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-ember">{SAUNA_CONTACT_PHONE}</a></p>
            <p className="mt-2 text-[17px] text-paper/60">{l(S.price)}</p>
          </div>
          <form onSubmit={submit} className="self-end rounded-[2px] bg-paper p-6 text-coal md:p-8"><ContactActions sauna /></form>
        </div>
      </section>
    </>
  );
}
