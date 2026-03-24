"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./style.module.css";
import Image from "next/image";

// Define interfaces for better type safety
interface NavItem {
  label: string;
  href: string;
}

const navItems: readonly NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Who it's For", href: "/who-its-for" },
  { label: "Support", href: "/support" },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth > 768 && mobileOpen) {
        closeMobile();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen, closeMobile]);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/pat-stat-website-logo.png"
            alt="Pat-Stat Logo"
            width={142}
            height={50}
            className={styles.logoImage}
            priority
          />
        </Link>

        <ul className={styles.desktopLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.desktopCta}>
          <Link href="/demo" className={styles.tryDemoBtn}>
            Try Demo
          </Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          type="button"
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileNavItem}
            onClick={closeMobile}
          >
            {item.label}
          </Link>
        ))}

        <hr className={styles.mobileDivider} />

        <Link href="/demo" className={styles.mobileCta} onClick={closeMobile}>
          Try Demo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;