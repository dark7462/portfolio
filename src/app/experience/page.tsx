import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GraduationCap } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { highlightsData } from "@/data/highlightsData";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/app/editorial.module.css";
import content from "@/app/portfolio-content.module.css";

export const metadata = { title: "Experience & Education" };

export default function ExperiencePage() {
  const { experience, education } = siteConfig.portfolio;
  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> BACK TO HOME</Link>
          <p>EXPERIENCE / EDUCATION / MILESTONES</p>
          <h1>KEEP MOVING.<br /><span>KEEP MAKING.</span></h1>
          <p className={styles.innerLead}>Campus leadership, community work, and the education behind my engineering practice.</p>
        </section>
        <section className={styles.experienceBody} aria-label="Experience">
          {experience.map((entry, index) => <article className={styles.experienceEntry} key={entry.organization}><span>{String(index + 1).padStart(2, "0")} / {entry.displayDates.toUpperCase()}</span><div><h2>{entry.role}</h2><h3>{entry.organization.toUpperCase()}</h3>{entry.location && <p>{entry.location}</p>}<ul className={content.experienceBullets}>{entry.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div><Link href="/#journey" aria-label={"See " + entry.role + " on the homepage"}><ArrowUpRight size={23} /></Link></article>)}
        </section>
        <section className={[styles.section, content.educationSection].join(" ")} aria-label="Education">
          {education.map((entry) => <article className={[content.educationCard, content.educationWide].join(" ")} key={entry.institution}><p className={styles.eyebrow}><GraduationCap size={16} /> EDUCATION</p><h3>{entry.institution}</h3><p className={content.degree}>{entry.qualification}<br /><span>{entry.specialization}</span></p><p className={content.educationDates}>{entry.displayDates}<br />{entry.location}</p><div className={content.cgpa}><strong>{entry.cgpa}</strong><span>CGPA</span></div><p className={content.minor}><strong>{entry.minor} minor</strong><br />{entry.details.join(" ")}</p></article>)}
        </section>
        {siteConfig.preferences.showAwards && <section className={[styles.section, styles.recognitionSection].join(" ")} aria-labelledby="awards-title">
          <p className={styles.eyebrow}>SELECTED RECOGNITION</p><h2 id="awards-title" className={styles.displayTitle}>MOMENTS THAT <span>MATTER.</span></h2>
          <ol className={styles.recognitionList}>{highlightsData.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.badge}</small></div>{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={"View " + item.title}><ArrowUpRight size={18} /></a> : <ArrowUpRight size={18} aria-hidden="true" />}</li>)}</ol>
        </section>}
      </main>
    </MotionShell>
  );
}
