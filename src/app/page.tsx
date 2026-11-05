import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { SiDocker, SiGithub, SiOpenjdk, SiPostgresql, SiPython, SiReact, SiSpringboot } from "react-icons/si";
import { MotionShell } from "@/components/editorial/MotionShell";
import { ProjectGallery } from "@/components/editorial/ProjectGallery";
import { BlueprintCompare } from "@/components/editorial/BlueprintCompare";
import { highlightsData } from "@/data/highlightsData";
import styles from "./editorial.module.css";

const toolkit = ["Java", "Spring Boot", "Python", "TypeScript", "React", "PostgreSQL", "MongoDB", "Redis", "Docker", "System design"];
const stackMarks = [
  { name: "JAVA", Icon: SiOpenjdk },
  { name: "SPRING", Icon: SiSpringboot },
  { name: "PYTHON", Icon: SiPython },
  { name: "REACT", Icon: SiReact },
  { name: "POSTGRES", Icon: SiPostgresql },
  { name: "DOCKER", Icon: SiDocker },
];
const process = [
  { number: "01", title: "THE PROBLEM", text: "Start with the real constraint and the person using the product." },
  { number: "02", title: "THE SYSTEM", text: "Map the data, boundaries, and interactions before building." },
  { number: "03", title: "THE BUILD", text: "Ship a working version and make each part earn its place." },
  { number: "04", title: "THE POLISH", text: "Measure, simplify, and make the experience feel complete." },
];

export default function Home() {
  return (
    <MotionShell>
      <main id="main">
        <section className={styles.hero} id="home" aria-labelledby="hero-title">
          <div className={styles.heroTopline}>
            <p data-build="hero-detail"><strong>SOFTWARE ENGINEER / BUILDER</strong><br />BACKEND SYSTEMS · AI PRODUCTS</p>
            <p data-build="hero-detail"><span className={styles.statusDot} /> OPEN TO INTERESTING WORK</p>
          </div>
          <div className={styles.heroWord} data-build="hero-word" aria-hidden="true">PORTFOLIO</div>
          <div className={styles.heroPortrait} data-build="hero-portrait">
            <Image src="/hero-anurag-editorial.png" alt="Editorial portrait of Anurag Nayak" fill sizes="(max-width: 700px) 85vw, (max-width: 1200px) 55vw, 48vw" className={styles.portraitImage} preload />
          </div>
          <div className={styles.heroLeft}>
            <p className={styles.heroScript} data-build="hero-copy">Hello, I&apos;m</p>
            <h1 id="hero-title" data-build="hero-copy">ANURAG<span>.</span></h1>
            <p className={styles.heroRole} data-build="hero-copy">SOFTWARE<br /><span>ENGINEER.</span></p>
            <p className={styles.heroDescription} data-build="hero-copy">I build thoughtful software: dependable backend systems, practical AI products, and interfaces that make the work feel simple.</p>
            <a className={styles.primaryButton} data-build="hero-copy" href="#work">Explore my work <ArrowDown size={18} /></a>
            <p className={styles.heroLocation} data-build="hero-detail"><MapPin size={13} /> INDIA</p>
          </div>
          <aside className={styles.heroRight} aria-label="What I work on">
            <p className={styles.heroAsideNote} data-build="hero-detail">Good systems.<br />Better experiences.</p>
            <div data-build="hero-detail"><strong>01</strong><span>BACKEND<br />ENGINEERING</span></div>
            <div data-build="hero-detail"><strong>02</strong><span>AI &amp; ML<br />PRODUCTS</span></div>
            <div data-build="hero-detail"><strong>03</strong><span>OPEN SOURCE<br />AND THE WEB</span></div>
            <Link href="/resume" className={styles.resumeLink} data-build="hero-detail"><Download size={16} /> DOWNLOAD RESUME</Link>
          </aside>
          <div className={styles.heroBottomline}>
            <span data-build="hero-detail">BUILT WITH INTENT</span><span data-build="hero-detail">SCROLL TO DISCOVER <ArrowDown size={15} /></span><span data-build="hero-detail">SELECTED WORK / 2025–2026</span>
          </div>
        </section>

        <ProjectGallery />

        <section className={styles.stackStrip} aria-label="Technologies I use">
          <p data-build="line">TOOLS IN MY WORK</p>
          <div>{stackMarks.map(({ name, Icon }) => <span key={name} data-build="logo"><Icon aria-hidden="true" /><strong>{name}</strong></span>)}</div>
        </section>

        <section className={`${styles.section} ${styles.recognitionSection}`} id="recognition" aria-labelledby="recognition-title">
          <div className={styles.recognitionTop}><p className={styles.eyebrow} data-build="line">SELECTED MILESTONES</p><p data-build="heading">THE WORK.<br /><strong>THE RECOGNITION.</strong></p></div>
          <div className={styles.recognitionBody}>
            <div><h2 id="recognition-title" className={styles.displayTitle} data-build="heading">SMALL WINS.<br /><span>BIG MOMENTUM.</span></h2><p className={styles.sectionCopy} data-build="panel">A few moments that shaped how I build, collaborate, and keep learning.</p></div>
            <ol className={styles.recognitionList}>{highlightsData.map((highlight, index) => (
              <li key={highlight.id} data-build="line" data-build-order={index}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{highlight.title}</strong><small>{highlight.badge}</small></div>{highlight.link ? <a href={highlight.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${highlight.title}`}><ArrowUpRight size={18} /></a> : <ArrowUpRight size={18} aria-hidden="true" />}</li>
            ))}</ol>
          </div>
        </section>

        <BlueprintCompare />

        <section className={`${styles.section} ${styles.aboutSection}`} id="about" aria-labelledby="about-title">
          <div className={styles.aboutLead}><div><p className={styles.eyebrow} data-build="line">02 / BEHIND THE BUILD</p><h2 id="about-title" className={styles.displayTitle} data-build="heading">NOT JUST CODE.<br />THE SYSTEM <span>BEHIND IT.</span></h2></div><p data-build="panel">I&apos;m Anurag, a computer science student focused on backend engineering and AI. I like taking an idea apart, finding the system underneath, and building something people can actually use.</p></div>
          <div className={styles.aboutColumns}>
            <div><p className={styles.eyebrow} data-build="line">WHAT I WORK WITH</p><h3 className={styles.columnTitle} data-build="heading">ENGINEERING TOOLKIT</h3><div className={styles.toolkit}>{toolkit.map((item, index) => <span key={item} data-build="part" data-build-order={index}>{item}</span>)}</div><Link className={styles.inlineLink} data-build="line" href="/pull-requests">EXPLORE OPEN SOURCE <ArrowUpRight size={17} /></Link></div>
            <div><p className={styles.eyebrow} data-build="line">FROM IDEA TO WORKING PRODUCT</p><div className={styles.processList}>{process.map((step, index) => <div key={step.number} data-build="part" data-build-order={index}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowUpRight size={17} /></div>)}</div></div>
          </div>
          <div className={styles.quoteBand} data-build="heading">BUILD THE THING<span>.</span> MAKE IT MATTER<span>.</span></div>
        </section>

        <section className={`${styles.section} ${styles.journeySection}`} id="journey" aria-labelledby="journey-title">
          <div className={styles.sectionHeadingRow}><div><p className={styles.eyebrow} data-build="line">03 / THE JOURNEY</p><h2 id="journey-title" className={styles.displayTitle} data-build="heading">KEEP BUILDING.<br /><span>KEEP LEARNING.</span></h2></div><Link className={styles.textLink} data-build="line" href="/experience">FULL EXPERIENCE <ArrowUpRight size={18} /></Link></div>
          <div className={styles.journeyGrid}>
            <div className={styles.timeline}>
              <details data-build="line" data-build-order={0} open><summary><span>2025 — 2026</span><strong>Campus Ambassador</strong><em>Unstop</em><span>+</span></summary><p>Guided students through placement preparation, hackathons, and competitive opportunities through outreach sessions and community work.</p></details>
              <details data-build="line" data-build-order={1}><summary><span>2025</span><strong>National Grand Finalist</strong><em>Smart India Hackathon</em><span>+</span></summary><p>Built GeoLoanLens with a team for the SIH 2025 national grand finals.</p></details>
              <details data-build="line" data-build-order={2}><summary><span>NOW</span><strong>Building in public</strong><em>Projects &amp; open source</em><span>+</span></summary><p>Working on VibeBench, GridCam, and backend tools while contributing to open source.</p></details>
            </div>
            <aside className={styles.journeyAside}><p className={styles.eyebrow} data-build="line">A FEW MILESTONES</p><h3 data-build="heading">LITTLE WINS.<br /><span>BIG MEANING.</span></h3><p data-build="panel">Projects are the best record of how I think. The work keeps evolving.</p><Link href="/projects" data-build="line">SEE THE PROJECTS <ArrowRight size={17} /></Link></aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contactSection}`} id="contact" aria-labelledby="contact-title">
          <div className={styles.contactIntro}><p className={styles.eyebrow} data-build="heading">04 / WHAT&apos;S NEXT</p><h2 id="contact-title" className={styles.displayTitle} data-build="heading">LET&apos;S BUILD<br /><span>SOMETHING REAL.</span></h2><p data-build="panel">Have a role, project, or idea worth discussing? I&apos;d love to hear about it.</p><a className={styles.contactButton} data-build="panel" href="mailto:anu870906@gmail.com"><span><ArrowUpRight size={22} /></span> START A CONVERSATION</a></div>
          <div className={styles.contactLinks}>
            <a data-build="line" data-build-order={0} href="mailto:anu870906@gmail.com"><Mail size={20} /><span><small>EMAIL</small>anu870906@gmail.com</span><ArrowUpRight size={17} /></a>
            <a data-build="line" data-build-order={1} href="https://github.com/dark7462" target="_blank" rel="noopener noreferrer"><SiGithub size={20} /><span><small>GITHUB</small>@dark7462</span><ArrowUpRight size={17} /></a>
            <a data-build="line" data-build-order={2} href="https://www.linkedin.com/in/dark7462" target="_blank" rel="noopener noreferrer"><span className={styles.linkedinMark}>in</span><span><small>LINKEDIN</small>Anurag Nayak</span><ArrowUpRight size={17} /></a>
            <Link data-build="line" data-build-order={3} href="/resume"><Download size={20} /><span><small>RESUME</small>View or download</span><ArrowUpRight size={17} /></Link>
          </div>
          <div className={styles.contactPoster} data-build="panel"><span>ANURAG® / SELECTED WORK</span><strong>MAKE IT<br /><em>WORK.</em></strong><Link href="/contact" aria-label="Open contact page"><ArrowUpRight size={24} /></Link></div>
        </section>
      </main>
      <footer className={styles.footer}><a href="#home">ANURAG®</a><span>© 2026 ANURAG NAYAK · BUILT WITH INTENT.</span><a href="#home">BACK TO TOP ↑</a></footer>
    </MotionShell>
  );
}
