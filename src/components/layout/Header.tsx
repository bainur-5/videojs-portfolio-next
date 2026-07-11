import Link from "next/link";
import type { Dictionary, Locale } from "@/types/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNavigation } from "./MobileNavigation";
import styles from "./Layout.module.scss";

export type NavItem = { href: string; label: string };

export function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const navItems: NavItem[] = [
    { href: `/${locale}`, label: dictionary.nav.home },
    { href: `/${locale}/players`, label: dictionary.nav.players },
    { href: `/${locale}/case-study`, label: dictionary.nav.caseStudy },
    { href: `/${locale}/about`, label: dictionary.nav.about },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
  ];
  return (
    <>
      <header className={styles.header}>
        <Link
          className={styles.brand}
          href={`/${locale}`}
          aria-label="Video Player Lab home"
        >
          <span className={styles.brandMark}>VPL</span>
          <span className={styles.brandName}>Video Player Lab</span>
        </Link>
        <nav
          className={styles.desktopNav}
          aria-label={dictionary.nav.primaryLabel}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <LanguageSwitcher
            locale={locale}
            label={dictionary.nav.languageLabel}
          />
          <MobileNavigation
            items={navItems}
            labels={{
              nav: dictionary.nav.primaryLabel,
              open: dictionary.nav.openMenu,
              close: dictionary.nav.closeMenu,
            }}
          />
        </div>
      </header>
    </>
  );
}
