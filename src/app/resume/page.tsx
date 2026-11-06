import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/app/editorial.module.css";
import content from "@/app/portfolio-content.module.css";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  const { identity } = siteConfig;
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>RESUME / {identity.fullName.toUpperCase()}</p>
          <h1>THE WORK<br /><span>ON PAPER.</span></h1>
          <p className={styles.innerLead}>My projects, technical skills, campus leadership, and education in one place.</p>
          <div className={styles.innerActions}><a href={identity.resume} download>DOWNLOAD PDF <Download size={17} /></a><a href={identity.resume} target="_blank" rel="noopener noreferrer">OPEN PDF <ExternalLink size={16} /></a></div>
        </section>
        <section className={styles.resumeFrameWrap} aria-label="Resume preview">
          <Image src={identity.resumePreview} alt={identity.fullName + " resume: software projects, technical skills, campus leadership, and Aditya University education. Download the PDF for selectable text."} width={1545} height={2000} className={content.resumePreview} sizes="(max-width: 760px) 100vw, 980px" preload />
          <p><a href={identity.resume} target="_blank" rel="noopener noreferrer">Open the accessible PDF</a> for selectable text and project links.</p>
        </section>
      </main>
    </MotionShell>
  );
}
