"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/types/content";
import styles from "./Layout.module.scss";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const suffix = pathname.split("/").slice(2).join("/");
  return (
    <nav className={styles.languages} aria-label={label}>
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}${suffix ? `/${suffix}` : ""}`}
          hrefLang={item}
          aria-current={item === locale ? "page" : undefined}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
