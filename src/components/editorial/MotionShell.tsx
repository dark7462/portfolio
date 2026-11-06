"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Pause, Play, RotateCcw, X } from "lucide-react";
import { ScrollBuild } from "@/components/editorial/ScrollBuild";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/app/editorial.module.css";
import shell from "./shell.module.css";

const motionKey = "anurag-nayak-portfolio-motion";
const motionEvent = "anurag-portfolio-motion-change";
const navigation = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

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

function subscribeMotionChoice(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(motionEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(motionEvent, callback);
  };
}

function readMotionChoice() {
  try {
    const choice = window.localStorage.getItem(motionKey);
    return choice === "on" || choice === "off" ? choice : null;
  } catch {
    return null;
  }
}

function storeMotionChoice(enabled: boolean) {
  try {
    window.localStorage.setItem(motionKey, enabled ? "on" : "off");
  } catch {
    // The in-memory choice still works when storage is unavailable.
  }
  window.dispatchEvent(new Event(motionEvent));
}

export function MotionShell({ children, subpage = false }: { children: ReactNode; subpage?: boolean }) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const hasHash = useSyncExternalStore(subscribeHash, hasLocationHash, () => false);
  const savedMotion = useSyncExternalStore(subscribeMotionChoice, readMotionChoice, () => null);
  const [sessionMotion, setSessionMotion] = useState<boolean | null>(null);
  const explicitMotion = sessionMotion ?? (savedMotion === null ? null : savedMotion === "on");
  const motionOn = explicitMotion ?? !reducedMotion;
  const [replay, setReplay] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  function chooseMotion(enabled: boolean) {
    setSessionMotion(enabled);
    storeMotionChoice(enabled);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (media.matches) dialogRef.current?.close();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (subpage || !hasHash || replay > 0) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hasHash, replay, subpage]);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
      if (progressRef.current) progressRef.current.style.transform = "scaleX(" + progress + ")";
      if (subpage) return;
      const anchor = window.innerHeight * 0.35;
      const active = navigation.filter(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= anchor;
      }).at(-1);
      setActiveSection(active?.id ?? "");
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [subpage]);

  function replayBuild() {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    chooseMotion(true);
    setReplay((value) => value + 1);
  }

  return (
    <div className={styles.site + " dark"} data-portfolio-root data-motion={motionOn ? "on" : "off"} data-motion-override={explicitMotion === true ? "true" : undefined}>
      <div className={styles.siteContent}>
        <a className={styles.skipLink} href="#main">Skip to content</a>
        <header className={styles.header + " " + shell.header}>
          <Link href="/" className={styles.wordmark} aria-label={siteConfig.identity.fullName + ", home"}>
            {siteConfig.identity.displayName}<span>®</span>
          </Link>
          <nav className={styles.nav} aria-label="Main navigation">
            {navigation.map(({ id, label }) => (
              <a key={id} className={shell.navLink} href={(subpage ? "/" : "") + "#" + id} aria-current={!subpage && activeSection === id ? "location" : undefined}>{label}</a>
            ))}
          </nav>
          <div className={styles.headerActions + " " + shell.actions}>
            <button type="button" className={styles.motionButton + " " + shell.motionButton} onClick={() => chooseMotion(!motionOn)}
              aria-label={motionOn ? "Show the completed page" : "Resume page construction"} aria-pressed={motionOn}>
              {motionOn ? <Pause size={13} /> : <Play size={13} />}
              <span>Motion {motionOn ? "on" : "off"}</span>
            </button>
            {!subpage && <button type="button" className={styles.replayButton + " " + shell.replayButton} onClick={replayBuild}
              aria-label="Rebuild the portfolio on the page" title="Rebuild the portfolio on the page">
              <RotateCcw size={15} /><span>Rebuild page</span>
            </button>}
            <a className={styles.headerTalk + " " + shell.headerTalk} href={(subpage ? "/" : "") + "#contact"}>Let&apos;s talk <ArrowUpRight size={15} /></a>
            <button ref={menuButtonRef} type="button" className={shell.menuButton} onClick={openMenu} aria-label="Open navigation menu"
              aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="portfolio-menu"><Menu size={21} /></button>
          </div>
          <span className={shell.progress} aria-hidden="true"><span ref={progressRef} /></span>
        </header>

        <dialog id="portfolio-menu" ref={dialogRef} className={shell.menuDialog} aria-labelledby="portfolio-menu-title"
          onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}
          onClose={() => { setMenuOpen(false); menuButtonRef.current?.focus(); }}>
          <div className={shell.menuPanel}>
            <div className={shell.menuTop}><p id="portfolio-menu-title">{siteConfig.identity.displayName}<span>®</span></p>
              <button type="button" autoFocus onClick={closeMenu} aria-label="Close navigation menu"><X size={23} /></button>
            </div>
            <p className={shell.menuEyebrow}>EXPLORE THE PORTFOLIO</p>
            <nav aria-label="Mobile navigation">
              {navigation.map(({ id, label }, index) => <a key={id} href={(subpage ? "/" : "") + "#" + id} onClick={closeMenu}
                aria-current={!subpage && activeSection === id ? "location" : undefined}><small>{"0" + (index + 1)}</small>{label}<ArrowUpRight size={25} /></a>)}
            </nav>
            <a className={shell.menuEmail} href={"mailto:" + siteConfig.contact.email}>{siteConfig.contact.email}<ArrowUpRight size={17} /></a>
            <p className={shell.menuNote}>{siteConfig.identity.availability}</p>
          </div>
        </dialog>

        {children}
        <footer className={styles.footer + " " + shell.footer}>
          <Link href="/" aria-label={siteConfig.identity.fullName + ", home"}>{siteConfig.identity.displayName}®</Link>
          <span>© {new Date().getFullYear()} {siteConfig.identity.fullName.toUpperCase()} · BUILT WITH INTENT.</span>
          <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={13} /></a>
          <a href={(subpage ? "/" : "") + "#home"}>BACK TO TOP ↑</a>
        </footer>
      </div>
      {!subpage && motionOn && <ScrollBuild key={replay} forceBoot={replay > 0} />}
    </div>
  );
}
