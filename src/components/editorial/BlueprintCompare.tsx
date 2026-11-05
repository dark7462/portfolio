"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/app/editorial.module.css";

export function BlueprintCompare() {
  const [cut, setCut] = useState(50);

  return (
    <section className={`${styles.section} ${styles.compareSection}`} id="compare" aria-labelledby="compare-title">
      <div className={styles.compareIntro}>
        <div>
          <p className={styles.eyebrow} data-build="line">A LOOK UNDER THE SURFACE</p>
          <h2 id="compare-title" className={styles.displayTitle} data-build="heading">FROM PLAN.<br /><span>TO PRODUCT.</span></h2>
        </div>
          <p data-build="panel">VibeBench brings model evaluation, sandbox execution, and scoring into one system. Drag between an illustrative system map and its editorial concept art.</p>
      </div>
      <div className={styles.compareCaption}><span data-build="line">VIBEBENCH / SYSTEM VIEW</span><span data-build="line">SPRING BOOT · REDIS · MONGODB</span></div>
      <div className={styles.compareStage}>
        <div className={styles.blueprintView}>
          <div className={styles.blueprintGrid} data-build="visual" />
          <span className={styles.blueprintLabel} data-build="line">ILLUSTRATIVE SYSTEM MAP</span>
          <div className={styles.blueprintFlow}>
            <span data-build="part">INPUT<br /><strong>Prompt & model</strong></span>
            <i data-build="part">→</i>
            <span data-build="part">ENGINE<br /><strong>Sandbox run</strong></span>
            <i data-build="part">→</i>
            <span data-build="part">OUTPUT<br /><strong>Metric score</strong></span>
          </div>
          <div className={styles.blueprintStack}><span data-build="part">Spring Boot</span><span data-build="part">Redis</span><span data-build="part">MongoDB</span><span data-build="part">Docker</span></div>
        </div>
        <div className={styles.finalView} style={{ clipPath: `inset(0 0 0 ${cut}%)` }}>
          <Image src="/projects/vibebench-concept.jpg" alt="Illustrative concept art for VibeBench" fill sizes="(max-width: 800px) 100vw, 85vw" className={styles.finalImage} data-build="visual" />
          <span className={styles.finalLabel} data-build="line">EDITORIAL CONCEPT</span>
        </div>
        <div className={styles.compareDivider} data-build="part" style={{ left: `${cut}%` }} aria-hidden="true">
          <span><ChevronLeft size={15} /><ChevronRight size={15} /></span>
        </div>
        <input
          className={styles.compareRange}
          type="range"
          min="0"
          max="100"
          value={cut}
          onChange={(event) => setCut(Number(event.target.value))}
          aria-label="Compare VibeBench system map and concept art"
          aria-valuetext={`${cut}% system map, ${100 - cut}% concept art`}
        />
      </div>
      <div className={styles.compareFoot}><span data-build="line">ILLUSTRATIVE PLAN</span><span data-build="line">DRAG TO EXPLORE</span><span data-build="line">CONCEPT ART</span></div>
    </section>
  );
}
