"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import styles from "./style.module.css";

const stats = [
  { value: "< 1min", label: "Average Update Time", color: "blue" },
  { value: "80%", label: "Fewer Phone Calls", color: "green" },
  { value: "24/7", label: "Family Access", color: "orange" },
  { value: "100%", label: "HIPAA Compliant", color: "teal" },
];

export function MainHero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>

        <div className={styles.badge}>
          <b>Built for African Healthcare system</b>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.headlineBlack}>
            Clear Communication<span className={`${styles.dot} ${styles.dotBlack}`}></span>
          </span>
          <br />
          <span className={styles.headlineBlue}>
            Better Care<span className={`${styles.dot} ${styles.dotGradient}`}></span>
          </span>
        </h1>

        <p className={styles.subCopy}>
          Pat-Stat connects hospitals, care teams, and families through real-time patient
          status updates—reducing phone calls, preventing miscommunication, and
          delivering transparent, compassionate care.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/demo" className={styles.primaryBtn}>
            Try Interactive Demo <ArrowRight size={20} strokeWidth={2.8} />
          </Link>
          <Link href="/contact" className={styles.secondaryBtn}>
            <Phone size={20} strokeWidth={2.8} /> Contact Sales
          </Link>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={`${styles.statValue} ${styles[`stat_${stat.color}`]}`}>
                {stat.value}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MainHero;