import type { Dictionary, Locale } from "@/types/content";

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  ru: () => import("./dictionaries/ru"),
  ky: () => import("./dictionaries/ky"),
};

export async function getDictionary(locale: Locale) {
  return (await dictionaries[locale]()).default;
}
