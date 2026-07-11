import Link from "next/link";
import type { Dictionary, Locale } from "@/types/content";
import styles from "./Layout.module.scss";

export function Footer({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>Video Player Lab</strong>
        <p>{dictionary.footer.note}</p>
      </div>
      <nav
        className={styles.footerLinks}
        aria-label={dictionary.nav.primaryLabel}
      >
        <Link href={`/${locale}/players`}>{dictionary.nav.players}</Link>
        <Link href={`/${locale}/case-study`}>{dictionary.nav.caseStudy}</Link>
        <Link href={`/${locale}/contact`}>{dictionary.nav.contact}</Link>
      </nav>
    </footer>
  );
}
