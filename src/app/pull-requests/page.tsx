import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";
import styles from "@/app/editorial.module.css";

export default function PullRequestsPage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>OPEN SOURCE / PUBLIC WORK</p>
          <h1>BUILDING<br /><span>IN THE OPEN.</span></h1>
          <p className={styles.innerLead}>A live view of pull requests and contributions from my GitHub account.</p>
          <div className={styles.innerActions}><a href="https://github.com/dark7462" target="_blank" rel="noopener noreferrer">GITHUB PROFILE <ArrowUpRight size={17} /></a></div>
        </section>
        <section className={styles.contributionsBody}>
          <p className={styles.eyebrow}>CONTRIBUTIONS</p>
          <OpenSourceContributions isFullPage />
        </section>
      </main>
    </MotionShell>
  );
}
