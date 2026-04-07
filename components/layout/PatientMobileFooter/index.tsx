import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

// interface PatientMobileFooterProps {
//   activeLink: 'status' | 'updates' | 'careteam' | 'help';
// }

interface PatientMobileFooterProps {
  activeLink?: "status" | "updates" | "careteam" | "help";
}

const PatientMobileFooter: React.FC<PatientMobileFooterProps> = ({ activeLink }) => {
  return (
    <footer className={styles.mobileFooter} role="navigation" aria-label="Mobile navigation">

      <Link
        href="/patient-dashboard/overview"
        className={`${styles.footerLink} ${activeLink === 'status' ? styles.active : ''}`}
        aria-label="Status"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <span>Status</span>
      </Link>

      <Link
        href="/patient-dashboard/updates"
        className={`${styles.footerLink} ${activeLink === 'updates' ? styles.active : ''}`}
        aria-label="Updates"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <span>Updates</span>
      </Link>

      <Link
        href="/patient-dashboard/careteam"
        className={`${styles.footerLink} ${activeLink === 'careteam' ? styles.active : ''}`}
        aria-label="Care Team"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
        <span>Care Team</span>
      </Link>

      {/* Help */}
      <Link
        href="/patient-dashboard/help"
        className={`${styles.footerLink} ${activeLink === 'help' ? styles.active : ''}`}
        aria-label="Help"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>Help</span>
      </Link>

    </footer>
  );
};

export { PatientMobileFooter };