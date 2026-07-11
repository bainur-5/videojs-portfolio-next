import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import styles from "@/components/sections/Sections.module.scss";

export default async function ContactPage({
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
        kicker={d.contact.kicker}
        title={d.contact.title}
        body={d.contact.body}
      />
      <section className={`${styles.contactLayout} section-shell`}>
        <ContactForm content={d.contact} />
        <aside>
          <p className="eyebrow">{d.contact.availability}</p>
          <h2>{d.contact.availabilityTitle}</h2>
          <p>{d.contact.availabilityBody}</p>
          <a href="mailto:bainur05ab@gmail.com">bainur05ab@gmail.com</a>
        </aside>
      </section>
    </>
  );
}
