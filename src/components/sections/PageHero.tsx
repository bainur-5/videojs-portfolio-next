import styles from "./Sections.module.scss";

export function PageHero({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <section className={`${styles.pageHero} section-shell`}>
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}
