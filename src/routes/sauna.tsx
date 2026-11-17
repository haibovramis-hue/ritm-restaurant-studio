import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { tr, useI18n } from "@/lib/i18n";
import { S } from "@/lib/copy-pages";
import { SAUNA_CONTACT, SAUNA_CONTACT_PHONE, SAUNA_PHONE, tel } from "@/lib/config";
import { PhotoBlock, gutterCls, wrapCls } from "@/components/site/Section";
import { ContactActions, ContactLinks, contactChannel, openContact } from "@/components/site/ContactActions";
import { PosterHeading, SectionLabel } from "@/components/site/Design";
import { SIMPLE } from "@/lib/copy";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/sauna")({
  head: () => ({ ...pageHead("/sauna", "ZP Pirts — krievu pirts ar baseinu Rīgā", "Privāta krievu pirts ar baseinu jūsu kompānijai. ZP Pirts Rīgā: sazinieties pa tālruni vai e-pastā. Cena pēc pieprasījuma.") }),
  component: Sauna,
});

/** Every statement here comes from the restaurant’s own banya page (zeltapakavs.lv/pirts) and its feature list. */
const T = {
  label: tr("ZP Pirts", "ZP Pirts", "ZP Pirts"),
  lead: tr("Īsta krievu pirts ar malku — visa jūsu kompānijas rīcībā.", "Настоящая русская баня на дровах — целиком в распоряжении вашей компании.", "A real wood-fired Russian banya, all yours for the evening."),
  body: tr(
    "Atsevišķa māja restorāna pagalmā: plaša pirts ar pēršanās galdu, liels apsildāms baseins un zāle divdesmit viesiem. Temperatūru pirtī un baseinā sagatavojam pēc jūsu vēlmēm — pasakiet iepriekš, kā jums patīk.",
    "Отдельный дом во дворе ресторана: просторная парная со столом для парения, большой подогреваемый бассейн и зал на двадцать гостей. Температуру в парной и в бассейне готовим под вас — скажите заранее, как любите.",
    "A house of its own in the restaurant yard: a roomy steam room with a table for the venik ritual, a big heated pool and a hall for twenty. We set the heat of the steam room and the pool to your taste: just tell us ahead.",
  ),
  eveningTitle: tr("Kā paiet vakars", "Как проходит вечер", "How the evening goes"),
  parts: [
    { n: "01", t: tr("Pirts", "Парная", "The steam room"), d: tr("Kurinām ar malku. Bērza un ozola slotas, plašs galds pēršanai.", "Топим дровами. Берёзовые и дубовые веники, просторный стол для парения.", "Fired with wood. Birch and oak veniks, a wide table for the ritual.") },
    { n: "02", t: tr("Baseins", "Бассейн", "The pool"), d: tr("Liels un apsildāms. Ūdens temperatūru noregulējam pēc jūsu lūguma.", "Большой и подогреваемый. Температуру воды выставляем по вашей просьбе.", "Big and heated. We set the water temperature the way you ask.") },
    { n: "03", t: tr("Galds", "Стол", "The table"), d: tr("Zāle 20 viesiem ar kamīnu, TV un karaoke, terase ar grilu. Ēdienu pasūtiet restorānā — atnesīsim uz pirti.", "Зал на 20 гостей с камином, ТВ и караоке, терраса с грилем. Еду заказывайте в ресторане — принесём в баню.", "A hall for 20 with a fireplace, TV and karaoke, a terrace with a grill. Order from the restaurant and we bring it over.") },
  ],
  includedTitle: tr("Jūsu rīcībā", "В вашем распоряжении", "Yours for the evening"),
  bookTitle: tr("Rezervēt pirti", "Забронировать баню", "Book the banya"),
};

function Sauna() {
  const { l } = useI18n();
  const submit = (event: FormEvent) => { event.preventDefault(); openContact(contactChannel(event), l(S.waMsg), l(S.waMsg), SAUNA_CONTACT_PHONE); };
  return (
    <>
      <PhotoBlock img={IMG.zpPirts} title={l(S.title)} line={l(SIMPLE.saunaD)} h1><ContactLinks sauna subject={l(S.waMsg)} /></PhotoBlock>

      {/* What it is, in their own facts. */}
      <section className={`section-pad bg-paper text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-8 md:grid-cols-12`}>
          <SectionLabel className="md:col-span-3 md:pt-4">{l(T.label)}</SectionLabel>
          <div className="md:col-span-9">
            <p className="max-w-[34ch] font-sans text-[clamp(1.4rem,2.2vw,1.95rem)] font-medium leading-[1.3] tracking-[-0.015em]">{l(T.lead)}</p>
            <p className="mt-8 max-w-[58ch] text-[18px] leading-relaxed text-muted-foreground">{l(T.body)}</p>
          </div>
        </div>
      </section>

      {/* The evening in three parts. */}
      <section className={`bg-paper pb-[clamp(4.5rem,10vw,9rem)] text-coal ${gutterCls}`}>
        <div className={wrapCls}>
          <h2 className="eyebrow opacity-60">{l(T.eveningTitle)}</h2>
          <ol className="mt-6 grid border-t border-coal/15 md:grid-cols-3">
            {T.parts.map((p, i) => (
              <li key={p.n} className={`border-b border-coal/15 py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:border-coal/15 md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}>
                <span className="text-sm tabular-nums text-ember">{p.n}</span>
                <h3 className="poster-type mt-4 text-[2.25rem]">{l(p.t)}</h3>
                <p className="mt-4 max-w-[34ch] text-[17px] leading-relaxed text-muted-foreground">{l(p.d)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The house itself and everything that comes with it. */}
      <section className={`section-pad bg-paper-2 text-coal ${gutterCls}`}>
        <div className={`${wrapCls} grid items-center gap-12 md:grid-cols-2 md:gap-20`}>
          <figure>
            <div className="aspect-[4/5] overflow-hidden bg-coal-2"><img src={IMG.banyaCabin} alt={l(S.cabin)} width={1400} height={1866} loading="lazy" decoding="async" className="photo-grade h-full w-full object-cover" /></div>
            <figcaption className="mt-4 text-[15px] text-muted-foreground">{l(S.cabin)}</figcaption>
          </figure>
          <div>
            <PosterHeading>{l(T.includedTitle)}</PosterHeading>
            <ul className="mt-10 border-t border-coal/15">{S.features.map((x) => <li key={x.en} className="flex min-h-[60px] items-center border-b border-coal/15 py-4 text-[17px]">{l(x)}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Booking. */}
      <section id="book" className={`section-pad scroll-mt-[var(--header-h)] bg-coal text-paper ${gutterCls}`}>
        <div className={`${wrapCls} grid gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionLabel>{l(T.bookTitle)}</SectionLabel>
            <a href={tel(SAUNA_PHONE)} className="mt-6 block font-display text-[clamp(2.6rem,6.5vw,5rem)] font-light leading-none tracking-[-0.03em] transition-colors hover:text-ember">{SAUNA_PHONE}</a>
            <p className="mt-8 text-[17px] text-paper/60">{l(S.contact)}: {SAUNA_CONTACT}, <a href={tel(SAUNA_CONTACT_PHONE)} className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-ember">{SAUNA_CONTACT_PHONE}</a></p>
            <p className="mt-2 text-[17px] text-paper/60">{l(S.price)}</p>
          </div>
          <form onSubmit={submit} className="self-end rounded-[2px] bg-paper p-6 text-coal md:p-10"><ContactActions sauna /></form>
        </div>
      </section>
    </>
  );
}
