import { players } from "@/data/players";
import type { Dictionary, Locale } from "@/types/content";
import { PlayerCard } from "./PlayerCard";
import styles from "./PlayerGrid.module.scss";

export function PlayerGrid({
  locale,
  dictionary,
  page = false,
}: {
  locale: Locale;
  dictionary: Dictionary;
  page?: boolean;
}) {
  return (
    <section
      className={`${styles.grid} section-shell ${page ? styles.page : ""}`}
    >
      {players.map((player) => (
        <PlayerCard
          key={player.slug}
          player={player}
          locale={locale}
          dictionary={dictionary}
        />
      ))}
    </section>
  );
}
