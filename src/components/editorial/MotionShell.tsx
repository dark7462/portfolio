"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { ScrollBuild } from "@/components/editorial/ScrollBuild";
import styles from "@/app/editorial.module.css";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function hasLocationHash() {
  return Boolean(window.location.hash);
}

export function MotionShell({ children, subpage = false }: { children: ReactNode; subpage?: boolean }) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const hasHash = useSyncExternalStore(subscribeHash, hasLocationHash, () => false);
  const [motionChoice, setMotionChoice] = useState<boolean | null>(null);
  const motionOn = motionChoice ?? !reducedMotion;
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (subpage || !hasHash || replay > 0) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hasHash, replay, subpage]);

  function replayBuild() {
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    setMotionChoice(true);
    setReplay((value) => value + 1);
  }

  return (
    <div className={`${styles.site} dark`} data-portfolio-root data-motion={motionOn ? "on" : "off"} data-motion-override={motionChoice === true ? "true" : undefined}>
      <div className={styles.siteContent}>
        <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="Anurag Nayak, home">
          ANURAG<span>®</span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href={subpage ? "/#work" : "#work"}>Work</a>
          <a href={subpage ? "/#about" : "#about"}>About</a>
          <a href={subpage ? "/#journey" : "#journey"}>Journey</a>
          <a href={subpage ? "/#contact" : "#contact"}>Contact</a>
        </nav>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.motionButton}
            onClick={() => setMotionChoice(!motionOn)}
            aria-label={motionOn ? "Show the completed page" : "Resume page construction"}
            aria-pressed={motionOn}
          >
            {motionOn ? <Pause size={12} /> : <Play size={12} />}
            <span>Motion {motionOn ? "on" : "off"}</span>
          </button>
          {!subpage && <button
            type="button"
            className={styles.replayButton}
            onClick={replayBuild}
            aria-label="Rebuild the portfolio on the page"
            title="Rebuild the portfolio on the page"
          >
            <RotateCcw size={14} />
            <span>Rebuild page</span>
          </button>}
          <a className={styles.headerTalk} href={subpage ? "/#contact" : "#contact"}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        </div>
      </header>

      {children}
      </div>
      {!subpage && motionOn && <ScrollBuild key={replay} forceBoot={replay > 0} />}
    </div>
  );
}
