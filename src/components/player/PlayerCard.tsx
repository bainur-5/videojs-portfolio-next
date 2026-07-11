import Image from "next/image";
import Link from "next/link";
import type { Player } from "@/data/players";
import type { Dictionary, Locale } from "@/types/content";
import { ArrowRightIcon } from "@/components/ui/Icons";
import styles from "./PlayerGrid.module.scss";

export function PlayerCard({
  player,
  locale,
  dictionary,
}: {
  player: Player;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const content = dictionary.players.cards[player.slug];
  const href = `/${locale}/players/${player.slug}`;
  return (
    <article className={styles.card}>
      <Link
        className={styles.media}
        href={href}
        aria-label={`${dictionary.common.openConcept}: ${content.title}`}
      >
        <Image src={player.poster} alt="" width={1600} height={900} />
        <span className={styles.index}>{player.number}</span>
        <span className={styles.open}>
          <ArrowRightIcon />
        </span>
      </Link>
      <div className={styles.copy}>
        <p className="eyebrow">{player.tag}</p>
        <h3>{content.title}</h3>
        <p>{content.body}</p>
        <Link className={styles.textLink} href={href}>
          <span>{dictionary.common.openConcept}</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}
