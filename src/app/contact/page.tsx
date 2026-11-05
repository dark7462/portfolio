import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { EditorialContactForm } from "@/components/editorial/EditorialContactForm";
import styles from "@/app/editorial.module.css";

export default function ContactPage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>CONTACT / YOUR NEXT IDEA</p>
          <h1>LET&apos;S MAKE<br /><span>IT REAL.</span></h1>
          <p className={styles.innerLead}>A role, collaboration, or interesting problem: send me the details and I&apos;ll get back to you.</p>
        </section>
        <section className={styles.formGrid}>
          <div><p className={styles.eyebrow}>START A CONVERSATION</p><h2 className={styles.displayTitle}>TELL ME<br /><span>YOUR STORY.</span></h2><div className={styles.contactDirect}><a href="mailto:anu870906@gmail.com"><Mail size={18} /> anu870906@gmail.com <ArrowUpRight size={16} /></a><a href="https://github.com/dark7462" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/in/dark7462" target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={16} /></a></div></div>
          <EditorialContactForm />
        </section>
      </main>
    </MotionShell>
  );
}
