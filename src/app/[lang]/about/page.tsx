import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import styles from "@/components/sections/Sections.module.scss";

export default async function AboutPage({
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
        kicker={d.about.kicker}
        title={d.about.title}
        body={d.about.body}
      />
      <section className={`${styles.aboutGrid} section-shell`}>
        <article className={styles.aboutLarge}>
          <p className="eyebrow">{d.about.direction}</p>
          <h2>{d.about.directionTitle}</h2>
          <p>{d.about.directionBody}</p>
        </article>
        <article>
          <p className="eyebrow">{d.about.stack}</p>
          <h3>{d.about.stackTitle}</h3>
          <p>{d.about.stackBody}</p>
        </article>
        <article>
          <p className="eyebrow">{d.about.principles}</p>
          <ul>
            {d.about.principleItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
