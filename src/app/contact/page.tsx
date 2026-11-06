import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { EditorialContactForm } from "@/components/editorial/EditorialContactForm";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/app/editorial.module.css";

export const metadata = { title: "Contact", description: "Discuss software engineering internships, projects, and collaborations with " + siteConfig.identity.fullName + "." };

export default function ContactPage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>CONTACT / YOUR NEXT IDEA</p>
          <h1>LET&apos;S MAKE<br /><span>IT REAL.</span></h1>
          <p className={styles.innerLead}>A role, collaboration, or interesting problem: send me the details and let&apos;s start a conversation.</p>
        </section>
        <section className={styles.formGrid}>
          <div>
            <p className={styles.eyebrow}>START A CONVERSATION</p>
            <h2 className={styles.displayTitle}>TELL ME<br /><span>YOUR STORY.</span></h2>
            <div className={styles.contactDirect}>
              <a href={"mailto:" + siteConfig.contact.email}><Mail size={18} /> {siteConfig.contact.email} <ArrowUpRight size={16} /></a>
              <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={16} /></a>
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <EditorialContactForm />
        </section>
      </main>
    </MotionShell>
  );
}
