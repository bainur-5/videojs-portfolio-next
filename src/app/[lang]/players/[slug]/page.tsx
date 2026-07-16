import { notFound } from "next/navigation";
import { DemoPlayer } from "@/components/player/DemoPlayer";
import { getPlayer, players } from "@/data/players";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import { locales } from "@/types/content";
import styles from "@/components/sections/Sections.module.scss";
import CinemaPlayer from "@/components/players/CinemaPlayer";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    players.map((player) => ({ lang, slug: player.slug })),
  );
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const player = getPlayer(slug);
  if (!player) notFound();
  const d = await getDictionary(lang);
  const content = d.players.cards[player.slug];
  return (
    <section className={`${styles.playerDetail} section-shell`}>
      <div className={styles.detailHead}>
        <p className="eyebrow">
          {player.number} / {d.player.concept}
        </p>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
      </div>
      {
        slug === "cinema" && <CinemaPlayer src="https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4" poster="https://image.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/thumbnail.webp?time=2 " title="Title" /> ||
        <DemoPlayer poster={player.poster} labels={d.common} />
      }
      <div className={styles.detailGrid}>
        <div>
          <span className={styles.detailLabel}>{d.player.useCase}</span>
          <strong>{player.tag}</strong>
        </div>
        <div>
          <span className={styles.detailLabel}>{d.player.focus}</span>
          <strong>{d.player.focusValue}</strong>
        </div>
        <div>
          <span className={styles.detailLabel}>{d.player.nextBuild}</span>
          <strong>{d.player.nextBuildValue}</strong>
        </div>
      </div>
      <section className={styles.detailNotes}>
        <div>
          <p className="eyebrow">{d.player.noteKicker}</p>
          <h2>{d.player.noteTitle}</h2>
        </div>
        <div>
          <p>{d.player.noteBody1}</p>
          <p>{d.player.noteBody2}</p>
        </div>
      </section>
    </section>
  );
}
