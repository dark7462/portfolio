import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { projectsData, techNames, type TechKey } from "@/data/projectsData";
import styles from "@/app/editorial.module.css";

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectIndex = projectsData.indexOf(project);
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <MotionShell subpage>
      <main id="main">
        <section className={styles.innerIntro}>
          <Link href="/projects" className={styles.backLink}><ArrowLeft size={16} /> ALL PROJECTS</Link>
          <p>PROJECT {String(projectIndex + 1).padStart(2, "0")} / {project.imageTitle.toUpperCase()}</p>
          <h1>{project.title.toUpperCase()}<span>.</span></h1>
          <p className={styles.innerLead}>{project.description}</p>
          <div className={styles.innerActions}>
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">VISIT PROJECT <ArrowUpRight size={17} /></a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">SOURCE CODE <ArrowUpRight size={17} /></a>}
          </div>
        </section>
        <section className={styles.detailBody}>
          <div className={styles.detailImage}>
            <Image src={project.src} alt={`Illustrative cover art for ${project.title}`} fill sizes="(max-width: 800px) 100vw, 90vw" preload className={styles.detailImageContent} />
            <span>ILLUSTRATIVE PROJECT COVER</span>
          </div>
          <div className={styles.detailInfo}>
            <div><p className={styles.eyebrow}>THE PROJECT</p><h2 className={styles.displayTitle}>{project.imageTitle.toUpperCase()}<span>.</span></h2></div>
            <p>{project.description}</p>
          </div>
          <div className={styles.detailStack}>
            <p className={styles.eyebrow}>TOOLS &amp; TECHNOLOGIES</p>
            <div className={styles.toolkit}>{project.tech.map((item) => {
              const label = typeof item === "string" ? techNames[item as TechKey] : item.label;
              return <span key={label}>{label}</span>;
            })}</div>
          </div>
        </section>
        <Link href={`/projects/${nextProject.slug}`} className={styles.nextProject}><span>NEXT PROJECT</span><strong>{nextProject.title.toUpperCase()}</strong><ArrowRight size={25} /></Link>
      </main>
    </MotionShell>
  );
}
