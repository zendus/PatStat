import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import styles from "./style.module.css";

export function CTABanner() {
  return (
    <section id="support" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Ready to Transform Patient Communication?
        </h2>
        <p className={styles.subtitle}>
          Join forward-thinking hospitals across Africa delivering transparent, compassionate care
        </p>
        <div className={styles.ctaRow}>
          <Link href="/demo" className={styles.primaryBtn}>
            Try Interactive Demo <ArrowRight size={18} strokeWidth={2.2} />
          </Link>
          <Link href="/contact" className={styles.secondaryBtn}>
            <Phone size={16} strokeWidth={2} /> Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;