import Link from "next/link";
import type { Dictionary, Locale } from "@/types/content";
import { DemoPlayer } from "@/components/player/DemoPlayer";
import { PlayerGrid } from "@/components/player/PlayerGrid";
import {
  ArrowRightIcon,
  CodeIcon,
  FullscreenIcon,
  LayersIcon,
} from "@/components/ui/Icons";
import styles from "./Sections.module.scss";

export function HomeSections({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const h = dictionary.home;
  const icons = [
    <LayersIcon key="layers" />,
    <CodeIcon key="code" />,
    <FullscreenIcon key="full" />,
  ];
  return (
    <>
      <section className={`${styles.hero} section-shell`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">{h.hero.kicker}</p>
          <h1>{h.hero.title}</h1>
          <p className={styles.heroLead}>{h.hero.body}</p>
          <div className={styles.heroActions}>
            <Link className="button buttonPrimary" href={`/${locale}/players`}>
              {h.hero.primary}
              <ArrowRightIcon />
            </Link>
            <Link className="button buttonGhost" href={`/${locale}/case-study`}>
              {h.hero.secondary}
            </Link>
          </div>
        </div>
        <div className={styles.heroPlayer}>
          <DemoPlayer
            poster="/images/players/poster-cinema.svg"
            labels={dictionary.common}
          />
          <div className={styles.heroMeta}>
            <span>{h.hero.featured}</span>
            <strong>{h.hero.concept}</strong>
          </div>
        </div>
      </section>
      <section className={`${styles.sectionHeading} section-shell`}>
        <div>
          <p className="eyebrow">{h.featured.kicker}</p>
          <h2>{h.featured.title}</h2>
        </div>
        <p>{h.featured.body}</p>
      </section>
      <PlayerGrid locale={locale} dictionary={dictionary} />
      <section className={`${styles.process} section-shell`}>
        <div className={styles.processIntro}>
          <p className="eyebrow">{h.process.kicker}</p>
          <h2>{h.process.title}</h2>
          <p>{h.process.body}</p>
        </div>
        <div className={styles.processList}>
          {h.process.items.map((item, index) => (
            <article key={item.title}>
              <span>{icons[index]}</span>
              <strong>0{index + 1}</strong>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={`${styles.contactStrip} section-shell`}>
        <div>
          <p className="eyebrow">{h.contact.kicker}</p>
          <h2>{h.contact.title}</h2>
          <p>{h.contact.body}</p>
        </div>
        <Link
          className={styles.circleLink}
          href={`/${locale}/contact`}
          aria-label={dictionary.nav.contact}
        >
          <ArrowRightIcon />
        </Link>
      </section>
    </>
  );
}
