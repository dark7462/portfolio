import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, GraduationCap, Mail, MapPin } from "lucide-react";
import { SiDocker, SiGithub, SiOpenjdk, SiPostgresql, SiPython, SiReact, SiSpringboot } from "react-icons/si";
import { MotionShell } from "@/components/editorial/MotionShell";
import { ProjectGallery } from "@/components/editorial/ProjectGallery";
import { highlightsData } from "@/data/highlightsData";
import { siteConfig } from "@/data/siteConfig";
import styles from "./editorial.module.css";
import content from "./portfolio-content.module.css";

const toolIcons: Record<string, typeof SiReact> = {
  Java: SiOpenjdk, "Spring Boot": SiSpringboot, Python: SiPython,
  React: SiReact, PostgreSQL: SiPostgresql, Docker: SiDocker,
};

export default function Home() {
  const { identity, contact, portfolio, featuredSystem } = siteConfig;
  const education = portfolio.education[0];
  const featuredProject = portfolio.projects.find((project) => project.id === featuredSystem.projectId);

  return (
    <MotionShell>
      <main id="main">
        <section className={styles.hero} id="home" aria-labelledby="hero-title">
          <div className={styles.heroTopline}>
            <p data-build="hero-detail"><strong>{identity.heroTopline}</strong><br />{identity.heroSpecialties}</p>
            <p data-build="hero-detail"><span className={styles.statusDot} /> {identity.availabilityShort}</p>
          </div>
          <div className={styles.heroWord + " " + content.heroWordFade} data-build="hero-word" aria-hidden="true">PORTFOLIO</div>
          <div className={styles.heroPortrait} data-build="hero-portrait">
            <Image src={identity.portrait} alt={identity.portraitAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1200px) 61vw, 54vw" className={styles.portraitImage} preload />
          </div>
          <div className={styles.heroLeft}>
            <p className={styles.heroScript} data-build="hero-copy">{identity.heroGreeting}</p>
            <h1 id="hero-title" data-build="hero-copy">{identity.displayName}<span>.</span></h1>
            <p className={styles.heroRole} data-build="hero-copy">{identity.heroRoleLines[0]}<br /><span>{identity.heroRoleLines[1]}</span></p>
            <p className={styles.heroDescription} data-build="hero-copy">{identity.heroIntro}</p>
            <div className={content.heroCtas}>
              <a className={styles.primaryButton} data-build="hero-copy" href="#work">Explore my work <ArrowDown size={18} /></a>
              <a className={content.secondaryCta} data-build="hero-copy" href="#contact">Get in touch <ArrowUpRight size={15} /></a>
            </div>
            <p className={styles.heroLocation} data-build="hero-detail"><MapPin size={13} /> {identity.location.toUpperCase()}</p>
          </div>
          <aside className={[styles.heroRight, content.heroMetrics].join(" ")} aria-label="Selected project and campus outcomes">
            <p className={styles.heroAsideNote} data-build="hero-detail">Good systems.<br />Measurable work.</p>
            {portfolio.metrics.map((metric) => <div key={metric.label} data-build="hero-detail"><strong>{metric.heroValue}</strong><span>{metric.heroLabel}</span></div>)}
            <Link href="/resume" className={styles.resumeLink} data-build="hero-detail"><Download size={16} /> VIEW RESUME</Link>
          </aside>
          <div className={styles.heroBottomline}>
            <span data-build="hero-detail">BUILT WITH INTENT</span><span data-build="hero-detail">SCROLL TO DISCOVER <ArrowDown size={15} /></span><span data-build="hero-detail">BACKEND · AI · OPEN SOURCE</span>
          </div>
        </section>

        <ProjectGallery />

        <section className={styles.stackStrip} aria-label="Technologies I use">
          <p data-build="line">TOOLS IN MY WORK</p>
          <div>{siteConfig.featuredTools.map((name) => {
            const Icon = toolIcons[name];
            return <span key={name} data-build="logo">{Icon && <Icon aria-hidden="true" />}<strong>{name.toUpperCase()}</strong></span>;
          })}</div>
        </section>

        {siteConfig.preferences.showAwards && <section className={[styles.section, styles.recognitionSection].join(" ")} id="recognition" aria-labelledby="recognition-title">
          <div className={styles.recognitionTop}><p className={styles.eyebrow} data-build="line">SELECTED MILESTONES</p><p data-build="heading">THE WORK.<br /><strong>THE RECOGNITION.</strong></p></div>
          <div className={styles.recognitionBody}>
            <div><h2 id="recognition-title" className={styles.displayTitle} data-build="heading">SMALL WINS.<br /><span>BIG MOMENTUM.</span></h2><p className={styles.sectionCopy} data-build="panel">From national hackathon finals to independent AI evaluations. A few milestones along the way.</p><Link className={styles.inlineLink} data-build="link" href="/experience">THE FULL JOURNEY <ArrowUpRight size={17} /></Link></div>
            <ol className={styles.recognitionList}>{highlightsData.map((highlight, index) => (
              <li key={highlight.id} data-build="line"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{highlight.title}</strong><small>{highlight.badge}</small></div>{highlight.link ? <a href={highlight.link} target="_blank" rel="noopener noreferrer" aria-label={"View " + highlight.title}><ArrowUpRight size={18} /></a> : <ArrowUpRight size={18} aria-hidden="true" />}</li>
            ))}</ol>
          </div>
        </section>}

        <section className={[styles.section, content.systemSection].join(" ")} id="inside-the-build" aria-labelledby="system-title">
          <div className={content.systemIntro}>
            <div><p className={styles.eyebrow} data-build="line">{featuredSystem.eyebrow}</p><h2 className={styles.displayTitle} id="system-title" data-build="heading">{featuredSystem.titleLines[0]}<br /><span>{featuredSystem.titleLines[1]}</span></h2></div>
            <p data-build="panel">{featuredSystem.description}</p>
          </div>
          <div className={content.systemFeature}>
            <div className={content.systemVisual}>
              {featuredProject?.coverImage && <Image src={featuredProject.coverImage} alt={"Illustrative cover artwork for " + featuredProject.title} fill sizes="(max-width: 760px) 100vw, 60vw" className={content.systemImage} data-build="visual" />}
              <span data-build="part">ILLUSTRATIVE COVER</span>
              <Link data-build="part" href={"/projects/" + featuredSystem.projectId} aria-label="Explore the featured case study"><ArrowUpRight size={24} /></Link>
            </div>
            <div className={content.systemStages}>{featuredSystem.stages.map((stage) => <div data-build="part" key={stage.number}><span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.text}</p></div><ArrowDown size={18} /></div>)}</div>
          </div>
          <div className={content.systemFoot}>{featuredSystem.details.map((detail) => <span key={detail} data-build="line">{detail}</span>)}</div>
        </section>

        <section className={styles.section} id="about" aria-labelledby="about-title">
          <div className={styles.aboutLead}><div><p className={styles.eyebrow} data-build="line">02 / BEHIND THE BUILD</p><h2 id="about-title" className={styles.displayTitle} data-build="heading">NOT JUST CODE.<br />THE SYSTEM <span>BEHIND IT.</span></h2></div><p className={content.aboutCopy} data-build="panel">{identity.about}</p></div>
          <div className={content.skillsHeader}><div><p className={styles.eyebrow} data-build="line">WHAT I WORK WITH</p><h3 className={styles.columnTitle} data-build="heading">ENGINEERING TOOLKIT</h3></div><Link className={styles.textLink} data-build="link" href="/pull-requests">OPEN SOURCE <ArrowUpRight size={17} /></Link></div>
          <div className={content.skillsGrid}>{portfolio.skills.map((group) => <details key={group.category} className={content.skillGroup} data-build="part" open><summary><span>{group.category === "Additional existing project skills" ? "Frontend" : group.category}</span><span aria-hidden="true">+</span></summary><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></details>)}</div>
          <div className={content.processHeader}><p className={styles.eyebrow} data-build="line">FROM IDEA TO WORKING PRODUCT</p><h3 className={styles.columnTitle} data-build="heading">HOW I APPROACH THE WORK</h3></div>
          <div className={content.processGrid}>{portfolio.processSteps.map((step) => <div key={step.number} data-build="part"><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p><ArrowUpRight size={18} /></div>)}</div>
          <div className={styles.quoteBand} data-build="heading">BUILD THE THING<span>.</span> MAKE IT MATTER<span>.</span></div>
        </section>

        <section className={styles.section} id="journey" aria-labelledby="journey-title">
          <div className={styles.sectionHeadingRow}><div><p className={styles.eyebrow} data-build="line">03 / THE JOURNEY</p><h2 id="journey-title" className={styles.displayTitle} data-build="heading">KEEP BUILDING.<br /><span>KEEP LEARNING.</span></h2></div><Link className={styles.textLink} data-build="line" href="/experience">FULL EXPERIENCE <ArrowUpRight size={18} /></Link></div>
          <div className={content.journeyGrid}>
            <div className={[styles.timeline, content.timeline].join(" ")}>{portfolio.experience.map((entry, index) => <details data-build="line" key={entry.organization} open={index === 0}><summary><span>{entry.displayDates}</span><strong>{entry.role}</strong><em>{entry.organization}</em><span aria-hidden="true">+</span></summary><div className={content.experienceCopy}><small>{entry.location || "Campus community"}</small><ul>{entry.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div></details>)}</div>
            {siteConfig.preferences.showEducation && <article id="education" className={content.educationCard}>
              <p className={styles.eyebrow} data-build="line"><GraduationCap size={16} /> EDUCATION</p>
              <h3 data-build="heading">{education.institution}</h3>
              <p className={content.degree} data-build="panel">{education.qualification}<br /><span>{education.specialization}</span></p>
              <p className={content.educationDates} data-build="line">{education.displayDates}<br />{education.location}</p>
              <div className={content.cgpa} data-build="part"><strong>{education.cgpa}</strong><span>CGPA</span></div>
              <p className={content.minor} data-build="panel"><strong>{education.minor} minor</strong><br />{education.details[0]}</p>
            </article>}
          </div>
        </section>

        <section className={[styles.section, styles.contactSection].join(" ")} id="contact" aria-labelledby="contact-title">
          <div className={styles.contactIntro}><p className={styles.eyebrow} data-build="line">04 / WHAT&apos;S NEXT</p><h2 id="contact-title" className={styles.displayTitle} data-build="heading">LET&apos;S BUILD<br /><span>SOMETHING REAL.</span></h2><p data-build="panel">Have a role, project, or idea worth discussing? I&apos;d love to hear about it.</p><a className={styles.contactButton} data-build="part" href={"mailto:" + contact.email}><span><ArrowUpRight size={22} /></span> START A CONVERSATION</a></div>
          <div className={styles.contactLinks}>
            <a data-build="line" href={"mailto:" + contact.email}><Mail size={20} /><span><small>EMAIL</small>{contact.email}</span><ArrowUpRight size={17} /></a>
            <a data-build="line" href={contact.github} target="_blank" rel="noopener noreferrer"><SiGithub size={20} /><span><small>GITHUB</small>{"@" + contact.github.split("/").pop()}</span><ArrowUpRight size={17} /></a>
            <a data-build="line" href={contact.linkedin} target="_blank" rel="noopener noreferrer"><span className={styles.linkedinMark}>in</span><span><small>LINKEDIN</small>{identity.fullName}</span><ArrowUpRight size={17} /></a>
            <Link data-build="line" href="/resume"><Download size={20} /><span><small>RESUME</small>View or download</span><ArrowUpRight size={17} /></Link>
          </div>
          <div className={styles.contactPoster} data-build="panel"><span>{identity.displayName}® / SELECTED WORK</span><strong>MAKE IT<br /><em>WORK.</em></strong><Link href="/contact" aria-label="Open contact page"><ArrowRight size={24} /></Link></div>
        </section>
      </main>
    </MotionShell>
  );
}
