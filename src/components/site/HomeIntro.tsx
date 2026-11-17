import { tr, useI18n } from "@/lib/i18n";
import { B } from "@/lib/copy-pages";
import { SectionLabel } from "./Design";
import { gutterCls, wrapCls } from "./Section";

/** Facts only: the places are listed on zeltapakavs.lv/terases, the playground and the closed yard come from guest reviews, capacity from the banquet page. */
const T = {
  label: tr("Par vietu", "О месте", "The place"),
  lead: tr(
    "Pagalms pie izbraukšanas uz Jūrmalu, kur šašliku noņem no oglēm un katrai kompānijai ir savs galds, sava telts vai savs namiņš.",
    "Двор на выезде к Юрмале, где шашлык снимают с углей, а у каждой компании свой стол, свой шатёр или свой домик.",
    "A yard on the road out to Jūrmala, where shashlik comes straight off the coals and every party gets its own table, tent or cabin.",
  ),
  body: tr(
    "Zelta Pakavs ir zāles, verandas, terases, telšu namiņi un mājiņas dārzā, bērnu laukums un pirts ar baseinu. Šeit brauc vakariņot ar ģimeni, svinēt dzimšanas dienu un sēdēt pie liela galda ar savējiem.",
    "Zelta Pakavs — это залы, веранды, террасы, шатры и домики в саду, детская площадка и баня с бассейном. Сюда приезжают поужинать семьёй, отметить день рождения и посидеть своей компанией за большим столом.",
    "Zelta Pakavs is halls, verandas, terraces, garden tents and cabins, a playground and a banya with a pool. People come for a family dinner, a birthday, or a long table with their own crowd.",
  ),
};

/** The three doors on the home page: one honest line each. */
export const DOOR = [
  tr("Grils, Kaukāza un mājas virtuve. Katru dienu no 12:00.", "Мангал, кавказская и домашняя кухня. Каждый день с 12:00.", "The grill, Caucasian and home cooking. Every day from 12:00."),
  tr("Zāles, veranda un terases dārzā. Kāzas, jubilejas, korporatīvie vakari.", "Залы, веранда и террасы в саду. Свадьбы, юбилеи, корпоративы.", "Halls, a veranda and garden terraces. Weddings, anniversaries, company evenings."),
  tr("Plaša pirts, baseins un zāle 20 viesiem — tikai jūsu kompānijai.", "Просторная парная, бассейн и зал на 20 гостей — только для вашей компании.", "A roomy steam room, a pool and a hall for 20, all yours for the evening."),
];

/** Captions for the strip of real corners of the house, in the order the photographs are shown. */
export const EVENING = [
  tr("Grils", "Мангал", "The grill"), tr("Zāle", "Зал", "The hall"), tr("Telts dārzā", "Шатёр в саду", "A garden tent"),
  tr("Pagalms", "Двор", "The yard"), tr("Pirts", "Баня", "The banya"),
];

export function HomeIntro() {
  const { l } = useI18n();
  return (
    <section className={`section-pad bg-paper text-coal ${gutterCls}`}>
      <div className={`${wrapCls} grid gap-8 md:grid-cols-12`}>
        <SectionLabel className="md:col-span-3 md:pt-4">{l(T.label)}</SectionLabel>
        <div className="md:col-span-9">
          <p className="max-w-[34ch] font-sans text-[clamp(1.4rem,2.2vw,1.95rem)] font-medium leading-[1.3] tracking-[-0.015em]">{l(T.lead)}</p>
          <p className="mt-8 max-w-[58ch] text-[18px] leading-relaxed text-muted-foreground">{l(T.body)}</p>
          <ul className="mt-12 grid gap-x-10 border-t border-coal/15 sm:grid-cols-3">{B.facts.map((x) => <li key={x.en} className="border-b border-coal/15 py-5 text-[17px] sm:border-b-0">{l(x)}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
