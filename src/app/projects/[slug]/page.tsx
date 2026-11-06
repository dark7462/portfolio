import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { MotionShell } from "@/components/editorial/MotionShell";
import { ProjectArtwork } from "@/components/editorial/ProjectGallery";
import { projectsData } from "@/data/projectsData";
import styles from "@/app/editorial.module.css";
import content from "@/components/editorial/project-content.module.css";

type ProjectParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectParams): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: ProjectParams) {
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
          <p>{"PROJECT " + String(projectIndex + 1).padStart(2, "0") + " / " + project.category.toUpperCase() + (project.year ? " / " + project.year : "")}</p>
          <h1>{project.title.toUpperCase()}<span>.</span></h1>
          <p className={styles.innerLead}>{project.summary}</p>
          <div className={styles.innerActions}>
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">VISIT PROJECT <ArrowUpRight size={17} /></a>}
            <a href={project.github} target="_blank" rel="noopener noreferrer">SOURCE CODE <ArrowUpRight size={17} /></a>
          </div>
        </section>
        <section className={styles.detailBody}>
          <div className={styles.detailImage}>
            <ProjectArtwork project={project} preload sizes="(max-width: 800px) 100vw, 90vw" />
            <span>{project.src ? "ILLUSTRATIVE PROJECT COVER" : "ABSTRACT EVIDENCE GRAPH / CONCEPT STUDY"}</span>
          </div>
          <div className={content.detailRole}><span>MY ROLE</span><p>{project.role}</p></div>
          <div className={styles.detailInfo}>
            <div><p className={styles.eyebrow}>THE PROJECT</p><h2 className={styles.displayTitle}>{project.imageTitle}<span>.</span></h2></div>
            <p>{project.description}</p>
          </div>
          <div className={content.detailOutcomes}>
            <p className={styles.eyebrow}>WHAT I BUILT</p><h2>THE WORK IN DETAIL.</h2>
            <ul className={content.outcomes}>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          </div>
          <div className={styles.detailStack}>
            <p className={styles.eyebrow}>TOOLS &amp; TECHNOLOGIES</p>
            <div className={styles.toolkit}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
        </section>
        <Link href={"/projects/" + nextProject.slug} className={styles.nextProject}><span>NEXT PROJECT</span><strong>{nextProject.title.toUpperCase()}</strong><ArrowRight size={25} /></Link>
      </main>
    </MotionShell>
  );
}
