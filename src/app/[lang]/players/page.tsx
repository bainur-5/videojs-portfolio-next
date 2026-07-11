import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PlayerGrid } from "@/components/player/PlayerGrid";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";

export default async function PlayersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = await getDictionary(lang);
  return (
    <>
      <PageHero
        kicker={d.players.kicker}
        title={d.players.title}
        body={d.players.body}
      />
      <PlayerGrid locale={lang} dictionary={d} page />
    </>
  );
}
