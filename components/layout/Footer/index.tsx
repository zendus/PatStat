"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";

const productLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Why Pat-Stat", href: "/why-pat-stat" },
  { label: "Security & Privacy", href: "/security" },
  { label: "Support", href: "/support" },
];

const solutionsLinks = [
  { label: "For Hospitals", href: "/solutions/hospitals" },
  { label: "For Care Teams", href: "/solutions/care-teams" },
  { label: "For Families", href: "/solutions/families" },
];

const companyLinks = [
  { label: "About Pat-Stat", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topGrid}>

          <div className={styles.brand}>
            <Link href="/" className={styles.logoRow}>
              <Image
                src="/images/pat-stat-website-logo-dark.png"
                alt="Pat-Stat Logo"
                width={142}
                height={50}
                className={styles.logoImage}
                priority
              />
            </Link>
            <p className={styles.tagline}>
              Pat-Stat helps hospitals communicate patient status clearly and
              securely, keeping care teams and families informed when it matters
              most.
            </p>
          </div>

          <div className={styles.linkCol}>
            <span className={styles.colHeading}>Product</span>
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkCol}>
            <span className={styles.colHeading}>Solutions</span>
            {solutionsLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={`${styles.linkCol} ${styles.linkColCompany}`}>
            <span className={styles.colHeading}>Company</span>
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          ©{year} Pat-Stat. All rights reserved. Built for African healthcare systems.
        </p>
      </div>
    </footer>
  );
}

export default Footer;