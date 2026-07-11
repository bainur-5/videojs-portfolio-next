import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import styles from "@/components/sections/Sections.module.scss";

export default async function CaseStudyPage({
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
        kicker={d.caseStudy.kicker}
        title={d.caseStudy.title}
        body={d.caseStudy.body}
      />
      <section className={`${styles.caseLayout} section-shell`}>
        {d.caseStudy.steps.map((step, index) => (
          <article key={step.title}>
            <span>0{index + 1}</span>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </section>
      <section className={`${styles.caseBoard} section-shell`}>
        <div className={styles.boardNote}>{d.caseStudy.boardLabel}</div>
        <div className={styles.boardLine} />
        {d.caseStudy.states.map((state) => (
          <div className={styles.boardCard} key={state.title}>
            <strong>{state.title}</strong>
            <span>{state.body}</span>
          </div>
        ))}
      </section>
    </>
  );
}
