import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';

interface PatientSidebarProps {
  activeLink: 'overview' | 'updates' | 'history' | 'careteam' | 'notifications' | 'help';
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ activeLink }) => {
  return (
    <aside className={styles.sidebar}>

      {/* ── Header ── */}
      <div className={styles.sidebarHeader}>

        {/* Logo row */}
        <div className={styles.logo}>
          <div className={styles.logoIcon} aria-hidden="true">
            <svg width="22" height="18" viewBox="0 0 28 22" fill="none">
              <polyline
                points="0,11 5,11 8,4 11,18 14,8 17,14 20,11 28,11"
                stroke="white"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.logoText}>
            <p className={styles.logoName}>Pat-Stat</p>
            <p className={styles.logoHospital}>Parklane General Hospital</p>
          </div>
        </div>

        {/* Patient info — green box */}
        <div className={styles.patientInfoBox}>
          <div className={styles.patientNameBox}>
            <p className={styles.patientName}>Chioma Eze</p>
            <p className={styles.patientRole}>Family Access</p>
          </div>
        </div>

      </div>

      {/* ── Nav ── */}
      <nav className={styles.sidebarNav} aria-label="Patient dashboard navigation">
        <ul className={styles.navList}>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/overview"
              className={`${styles.navLink} ${activeLink === 'overview' ? styles.active : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Patient Overview
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/updates"
              className={`${styles.navLink} ${activeLink === 'updates' ? styles.active : ''}`}
            >
              {/* Pulse / activity icon — more fitting than double-chevron */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Latest Updates
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/history"
              className={`${styles.navLink} ${activeLink === 'history' ? styles.active : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Update History
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/careteam"
              className={`${styles.navLink} ${activeLink === 'careteam' ? styles.active : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              Care Team Info
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/notifications"
              className={`${styles.navLink} ${activeLink === 'notifications' ? styles.active : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              Notifications
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/help"
              className={`${styles.navLink} ${activeLink === 'help' ? styles.active : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Help &amp; Support
            </Link>
          </li>

        </ul>
      </nav>

      {/* ── Logout ── */}
      <div className={styles.logoutContainer}>
        <button className={styles.logoutBtn} type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </button>
      </div>

    </aside>
  );
};

export { PatientSidebar };