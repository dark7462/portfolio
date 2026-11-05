"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "@/app/editorial.module.css";

export function EditorialContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    const form = event.currentTarget;
    try {
      const response = await fetch("https://formsubmit.co/ajax/anu870906@gmail.com", {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Message delivery failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label>Your name<input name="name" type="text" autoComplete="name" required placeholder="How should I call you?" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      <label>What&apos;s on your mind?<textarea name="message" required rows={6} placeholder="Tell me about the role, project, or idea..." /></label>
      <button type="submit" disabled={state === "sending"}>{state === "sending" ? "SENDING..." : "SEND MESSAGE"}<ArrowUpRight size={18} /></button>
      <p role="status" aria-live="polite">{state === "sent" ? "Message sent. Thanks for reaching out." : state === "error" ? "Couldn’t send the message. Please use the email link instead." : ""}</p>
    </form>
  );
}
