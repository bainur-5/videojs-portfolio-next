import { notFound } from "next/navigation";
import { HomeSections } from "@/components/sections/HomeSections";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomeSections locale={lang} dictionary={await getDictionary(lang)} />;
}
