import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Events } from "@/components/site/Events";
import { PhotoBlock } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import { SIMPLE } from "@/lib/copy";
import { IMG } from "@/lib/images";

function EventsPage() {
  const { l } = useI18n();
  return (
    <>
      <PhotoBlock img={IMG.celebrations} title={l(SIMPLE.eventsT)} line={l(SIMPLE.eventsD)} h1 tall>
      </PhotoBlock>
      <Events />
    </>
  );
}

export const Route = createFileRoute("/events")({
  head: () => ({ ...pageHead("/events", "Pasākumi — Zelta Pakavs · Rīga", "Piektdienās viktorīnas un Muzikālais loto, sestdienās dzīvā mūzika. Zelta Pakavs pasākumu kalendārs un galdiņa rezervācija.") }),
  component: EventsPage,
});
