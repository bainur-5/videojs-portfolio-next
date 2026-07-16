import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PlayerGrid } from "@/components/player/PlayerGrid";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import { DemoPlayer } from "@/components/player/DemoPlayer";
import { VideoPlayer } from "@/components/VideoPlayer/VideoPlayer";

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
      <VideoPlayer src='https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4'/>
      <PageHero
        kicker={d.players.kicker}
        title={d.players.title}
        body={d.players.body}
      />
      <PlayerGrid locale={lang} dictionary={d} page />
    </>
  );
}
