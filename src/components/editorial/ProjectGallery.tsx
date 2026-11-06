"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { projectsData, type Project } from "@/data/projectsData";
import styles from "@/app/editorial.module.css";
import content from "./project-content.module.css";

const categories = ["All", ...new Set(projectsData.map((project) => project.category))];

export function ProjectArtwork({ project, preload = false, build = false, order = 0, sizes = "(max-width: 760px) 100vw, 50vw" }: {
  project: Project; preload?: boolean; build?: boolean; order?: number; sizes?: string;
}) {
  if (project.src) {
    return <Image src={project.src} alt={"Illustrative cover art for " + project.title} fill
      sizes={sizes} className={styles.projectImage}
      data-build={build ? "visual" : undefined} data-build-order={order} preload={preload} />;
  }
  return (
    <div className={content.artwork} role="img" aria-label="Typographic Sherlock cover with an abstract evidence graph"
      data-build={build ? "visual" : undefined} data-build-order={order}>
      <svg viewBox="0 0 720 420" fill="none" aria-hidden="true">
        <path d="M70 90 240 40 380 150 640 70M70 90 200 280 380 150 540 320 640 70M200 280 330 360 540 320M240 40 200 280M380 150 330 360M70 90 640 70" />
        <circle cx="70" cy="90" r="9" /><circle cx="240" cy="40" r="6" /><circle cx="380" cy="150" r="18" />
        <circle cx="640" cy="70" r="7" /><circle cx="200" cy="280" r="12" /><circle cx="540" cy="320" r="10" /><circle cx="330" cy="360" r="5" />
        <circle cx="380" cy="150" r="42" className={content.graphHalo} />
      </svg>
      <span className={content.artworkKicker}>CONNECT THE EVIDENCE</span>
      <strong>SHERLOCK<span>↗</span></strong>
      <small>JAVA / NEO4J / INVESTIGATION SYSTEMS</small>
    </div>
  );
}

export function ProjectGallery({ showAllInitially = false, archive = false }: { showAllInitially?: boolean; archive?: boolean }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(showAllInitially);
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projectsData.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const haystack = [project.title, project.description, project.summary, project.imageTitle, ...project.tools].join(" ").toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, query]);
  const visible = expanded || category !== "All" || query.trim() ? filtered : filtered.filter((project) => project.featured);

  function openProject(event: MouseEvent<HTMLButtonElement>, project: Project) {
    triggerRef.current = event.currentTarget;
    setSelected(project);
  }

  return (
    <section className={styles.section} id="work" aria-labelledby="work-title">
      <div className={styles.sectionHeadingRow}>
        <div>
          <p className={styles.eyebrow} data-build={archive ? undefined : "line"}>{archive ? "PROJECT ARCHIVE" : "01 / SELECTED WORK"}</p>
          <h2 id="work-title" className={styles.displayTitle} data-build={archive ? undefined : "heading"}>{archive ? <>ALL THE <span>WORK.</span></> : <>WORK THAT <span>SPEAKS.</span></>}</h2>
        </div>
        {!archive && <Link className={styles.textLink} data-build="line" href="/projects">ALL PROJECTS <ArrowUpRight size={18} /></Link>}
      </div>
      <div className={styles.galleryControls}>
        <div className={styles.filterList} aria-label="Filter projects">
          {categories.map((item) => <button key={item} type="button"
            className={category === item ? styles.filterActive : styles.filterButton}
            data-build={archive ? undefined : "part"} onClick={() => setCategory(item)}
            aria-pressed={category === item}>{item}</button>)}
        </div>
        <label className={styles.searchBox} data-build={archive ? undefined : "part"}>
          <Search size={16} aria-hidden="true" /><span className={styles.srOnly}>Search projects</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or tools" />
        </label>
      </div>
      <p className={styles.srOnly} role="status">{filtered.length + (filtered.length === 1 ? " project found" : " projects found")}</p>
      {visible.length > 0 ? <div className={styles.projectGrid + " " + content.galleryGrid}>
        {visible.map((project, index) => <article key={project.slug} className={styles.projectCard} data-build={archive ? undefined : "shell"}>
          <button type="button" className={styles.projectImageLink + " " + content.imageButton}
            onClick={(event) => openProject(event, project)} aria-label={"Quick view " + project.title}>
            <ProjectArtwork project={project} preload={index === 0} build={!archive} order={index} />
            <span className={styles.imageBadge} data-build={archive ? undefined : "part"}>{project.category}</span>
            <span className={styles.imageNote} data-build={archive ? undefined : "part"}>{project.src ? "ILLUSTRATIVE COVER" : "CONCEPT STUDY"}</span>
            <span className={styles.imageArrow}><ArrowUpRight size={22} /></span>
          </button>
          <div className={styles.projectMeta}>
            <span className={styles.projectNumber} data-build={archive ? undefined : "part"}>{String(projectsData.indexOf(project) + 1).padStart(2, "0")}</span>
            <div>
              <h3 data-build={archive ? undefined : "heading"}><Link href={"/projects/" + project.slug}>{project.title}</Link></h3>
              <p data-build={archive ? undefined : "line"}>{project.imageTitle + (project.year ? " / " + project.year : "")}</p>
            </div>
            <a className={content.sourceLink} href={project.github} data-build={archive ? undefined : "link"} target="_blank" rel="noopener noreferrer" aria-label={project.title + " source code"}><ArrowUpRight size={20} /></a>
          </div>
          <p className={content.cardSummary} data-build={archive ? undefined : "line"}>{project.summary}</p>
          <div className={content.cardTools} data-build={archive ? undefined : "part"}>{project.tools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div>
          <div className={content.cardActions} data-build={archive ? undefined : "link"}>
            <button type="button" onClick={(event) => openProject(event, project)}>QUICK VIEW <span>+</span></button>
            <Link href={"/projects/" + project.slug}>CASE STUDY <ArrowUpRight size={16} /></Link>
          </div>
        </article>)}
      </div> : <p className={styles.emptyState}>No projects match that search. Try another project name or technology.</p>}
      {!expanded && category === "All" && !query.trim() && filtered.length > visible.length &&
        <button type="button" className={styles.moreButton} data-build={archive ? undefined : "line"} onClick={() => setExpanded(true)}>
          VIEW ALL {filtered.length} PROJECTS <span>+</span>
        </button>}

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className={content.dialogOverlay} />
          <Dialog.Content className={content.dialogContent} onCloseAutoFocus={(event) => { event.preventDefault(); triggerRef.current?.focus(); }}>
            {selected && <>
              <div className={content.dialogTop}><span>{selected.category + " / PROJECT OVERVIEW"}</span><Dialog.Close className={content.closeButton} aria-label="Close project overview"><X size={22} /></Dialog.Close></div>
              <Dialog.Title className={content.dialogTitle}>{selected.title}<span>.</span></Dialog.Title>
              <Dialog.Description className={content.dialogSummary}>{selected.summary}</Dialog.Description>
              <div className={content.dialogArtwork}><ProjectArtwork project={selected} /></div>
              <p className={content.roleLabel}>MY ROLE</p><p className={content.role}>{selected.role}</p>
              <ul className={content.outcomes}>{selected.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              <div className={content.dialogTools}>{selected.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <div className={content.dialogActions}>
                <Link href={"/projects/" + selected.slug}>FULL CASE STUDY <ArrowUpRight size={17} /></Link>
                <a href={selected.github} target="_blank" rel="noopener noreferrer">SOURCE CODE <ArrowUpRight size={17} /></a>
                {selected.live && <a href={selected.live} target="_blank" rel="noopener noreferrer">VISIT PROJECT <ArrowUpRight size={17} /></a>}
              </div>
            </>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
