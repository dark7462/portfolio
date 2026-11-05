import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { ProjectGallery } from "@/components/editorial/ProjectGallery";
import styles from "@/app/editorial.module.css";

export default function AllProjectsPage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <div className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>SELECTED ENGINEERING / 2025–2026</p>
          <h1>BUILDING<br /><span>WHAT&apos;S NEXT.</span></h1>
          <p className={styles.innerLead}>A closer look at projects across backend systems, AI, and mobile experiences.</p>
        </div>
        <ProjectGallery showAllInitially archive />
      </main>
    </MotionShell>
  );
}
