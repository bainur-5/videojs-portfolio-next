"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "./Header";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import styles from "./Layout.module.scss";

export function MobileNavigation({
  items,
  labels,
}: {
  items: NavItem[];
  labels: { nav: string; open: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.mobileWrap}>
      <button
        className={styles.menuToggle}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? labels.close : labels.open}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${open ? styles.open : ""}`}
        aria-label={labels.nav}
      >
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
