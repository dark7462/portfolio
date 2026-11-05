import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import styles from "@/app/editorial.module.css";

export default function ResumePage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>RESUME / ANURAG NAYAK</p>
          <h1>THE WORK<br /><span>ON PAPER.</span></h1>
          <p className={styles.innerLead}>A concise overview of my projects, skills, and experience.</p>
          <div className={styles.innerActions}><a href="/Anurag-Nayak-Resume.pdf" download>DOWNLOAD PDF <Download size={17} /></a></div>
        </section>
        <section className={styles.resumeFrameWrap}><iframe src="/Anurag-Nayak-Resume.pdf" title="Anurag Nayak resume PDF" className={styles.resumeFrame} /><p><a href="/Anurag-Nayak-Resume.pdf" target="_blank" rel="noopener noreferrer">Open the PDF in a new tab</a> if the preview does not display.</p></section>
      </main>
    </MotionShell>
  );
}
