import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { ProjectGallery } from "@/components/editorial/ProjectGallery";
import styles from "@/app/editorial.module.css";

export const metadata = { title: "Projects" };

export default function AllProjectsPage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <div className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>BACKEND / AI / ANDROID / WEB</p>
          <h1>BUILDING<br /><span>WHAT&apos;S NEXT.</span></h1>
          <p className={styles.innerLead}>From APIs and model evaluation to evidence graphs and camera intelligence. Explore the work, the systems underneath, and the part I built.</p>
        </div>
        <ProjectGallery showAllInitially archive />
      </main>
    </MotionShell>
  );
}
