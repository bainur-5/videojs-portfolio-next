"use client";

import { useState } from "react";
import type { Dictionary } from "@/types/content";
import { CheckIcon, MailIcon } from "@/components/ui/Icons";
import styles from "./ContactForm.module.scss";

export function ContactForm({ content }: { content: Dictionary["contact"] }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.reset();
        setSent(true);
      }}
    >
      <label>
        <span>{content.name}</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>{content.email}</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        <span>{content.message}</span>
        <textarea name="message" rows={7} required />
      </label>
      <button
        className={`button buttonPrimary ${sent ? styles.success : ""}`}
        type="submit"
      >
        <span>{sent ? content.sent : content.send}</span>
        {sent ? <CheckIcon /> : <MailIcon />}
      </button>
    </form>
  );
}
