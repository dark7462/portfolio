import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { highlightsData } from "@/data/highlightsData";
import styles from "@/app/editorial.module.css";

export default function ExperiencePage() {
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>EXPERIENCE / MILESTONES</p>
          <h1>KEEP MOVING.<br /><span>KEEP MAKING.</span></h1>
          <p className={styles.innerLead}>A selected record of team work, community work, and things I have built along the way.</p>
        </section>
        <section className={styles.experienceBody}>
          <div className={styles.experienceEntry}><span>01 / 2025—2026</span><div><h2>Campus Ambassador</h2><h3>UNSTOP</h3><p>Ranked among India&apos;s Top 6 Campus Ambassadors while guiding students on placement preparation, hackathons, and competitive opportunities through outreach sessions.</p></div><Link href="/#journey" aria-label="See campus ambassador on homepage"><ArrowUpRight size={23} /></Link></div>
          <div className={styles.experienceEntry}><span>02 / 2025</span><div><h2>National Grand Finalist</h2><h3>SMART INDIA HACKATHON</h3><p>Built GeoLoanLens with a team for the SIH 2025 national grand finals.</p></div><Link href="/projects/geoloanlens" aria-label="View GeoLoanLens project"><ArrowUpRight size={23} /></Link></div>
          <div className={styles.experienceEntry}><span>03 / ONGOING</span><div><h2>Projects &amp; open source</h2><h3>INDEPENDENT WORK</h3><p>Building VibeBench, GridCam, and backend tools while contributing code to public projects.</p></div><Link href="/pull-requests" aria-label="View open source contributions"><ArrowUpRight size={23} /></Link></div>
        </section>
        <section className={`${styles.section} ${styles.recognitionSection}`}>
          <p className={styles.eyebrow}>SELECTED RECOGNITION</p><h2 className={styles.displayTitle}>MOMENTS THAT <span>MATTER.</span></h2>
          <ol className={styles.recognitionList}>{highlightsData.map((item,index) => <li key={item.id}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{item.title}</strong><small>{item.badge}</small></div>{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title}`}><ArrowUpRight size={18} /></a> : <ArrowUpRight size={18} aria-hidden="true" />}</li>)}</ol>
        </section>
      </main>
    </MotionShell>
  );
}
