"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/app/editorial.module.css";
import shell from "./shell.module.css";

export function EditorialContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    if (name.length < 2 || message.length < 10) {
      setStatus("Please enter your name and a message of at least 10 characters.");
      return;
    }
    const subject = "Portfolio inquiry from " + name;
    const body = "Hi " + siteConfig.identity.displayName.charAt(0) + siteConfig.identity.displayName.slice(1).toLowerCase() + ",\n\n" + message + "\n\nFrom: " + name + "\nReply to: " + email;
    window.location.href = "mailto:" + siteConfig.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    setStatus("Review and send the draft in your email app. If it did not open, use the direct email link.");
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <p className={shell.formHint}>This opens a draft in your email app, ready for you to review and send.</p>
      <label>Your name<input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="What should I call you?" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
      <label>What&apos;s on your mind?<textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Tell me about the role, project, or idea..." /></label>
      <button type="submit">OPEN EMAIL DRAFT<ArrowUpRight size={18} /></button>
      <p role="status" aria-live="polite" className={shell.formHint}>{status || <>Prefer a direct link? <a href={"mailto:" + siteConfig.contact.email}>{siteConfig.contact.email}</a></>}</p>
    </form>
  );
}
