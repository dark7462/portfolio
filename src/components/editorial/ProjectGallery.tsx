"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import styles from "@/app/editorial.module.css";

const categories = ["All", "Backend", "AI", "Mobile"] as const;
type Category = (typeof categories)[number];

const categoryBySlug: Record<string, Exclude<Category, "All">> = {
  geoloanlens: "AI",
  vibebench: "Backend",
  gridcam: "Mobile",
  "url-shortener": "Backend",
};

export function ProjectGallery({ showAllInitially = false, archive = false }: { showAllInitially?: boolean; archive?: boolean }) {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(showAllInitially);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projectsData.filter((project) => {
      const matchesCategory = category === "All" || categoryBySlug[project.slug] === category;
      const matchesQuery = !needle || `${project.title} ${project.description} ${project.imageTitle}`.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const visible = expanded || category !== "All" || query.trim() ? filtered : filtered.slice(0, 3);

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
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? styles.filterActive : styles.filterButton}
              data-build={archive ? undefined : "part"}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className={styles.searchBox} data-build={archive ? undefined : "part"}>
          <Search size={16} aria-hidden="true" />
          <span className={styles.srOnly}>Search projects</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />
        </label>
      </div>

      {visible.length > 0 ? (
        <div className={styles.projectGrid}>
          {visible.map((project, index) => (
            <article key={project.slug} className={styles.projectCard} data-build={archive ? undefined : "shell"}>
              <Link className={styles.projectImageLink} href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>
                <Image
                  src={project.src}
                  alt={`Illustrative cover art for ${project.title}`}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.projectImage}
                  data-build={archive ? undefined : "visual"}
                  data-build-order={archive ? undefined : index}
                  preload={index === 0}
                />
                <span className={styles.imageBadge} data-build={archive ? undefined : "part"}>{categoryBySlug[project.slug] ?? "Project"}</span>
                <span className={styles.imageNote} data-build={archive ? undefined : "part"}>ILLUSTRATIVE COVER</span>
                <span className={styles.imageArrow}><ArrowUpRight size={22} /></span>
              </Link>
              <div className={styles.projectMeta}>
                <span className={styles.projectNumber} data-build={archive ? undefined : "part"}>{String(projectsData.indexOf(project) + 1).padStart(2, "0")}</span>
                <div>
                  <h3 data-build={archive ? undefined : "heading"}><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                  <p data-build={archive ? undefined : "line"}>{project.imageTitle}</p>
                </div>
                {project.github && <a href={project.github} data-build={archive ? undefined : "link"} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}><ArrowUpRight size={17} /></a>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>No projects match that search.</p>
      )}

      {!expanded && category === "All" && !query.trim() && filtered.length > 3 && (
        <button type="button" className={styles.moreButton} data-build={archive ? undefined : "line"} onClick={() => setExpanded(true)}>
          VIEW ALL {filtered.length} PROJECTS <span>+</span>
        </button>
      )}
    </section>
  );
}
