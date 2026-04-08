import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';
import { DashboardRoute } from '@/utils/dashboardRoutes';

// interface PatientSidebarProps {
//   activeLink: 'overview' | 'updates' | 'history' | 'careteam' | 'notifications' | 'help';
// }
interface PatientSidebarProps {
  activeLink: DashboardRoute;
  onLogout?: () => void;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ activeLink, onLogout }) => {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.sidebarHeader}>

        <div className={styles.logo}>
          <div className={styles.logoIcon} aria-hidden="true">
            <Link href="/patient-dashboard/overview">
              <Image src="/images/pat-stat-patient-side-logo.svg"
              alt="Pat-stat patient dashboard logo"
              width={95}
              height={40}
              />
            </Link>
            <p className={styles.logoHospital}>Parklane General Hospital</p>
          </div>
        </div>

        <div className={styles.patientInfoBox}>
          <div className={styles.patientNameBox}>
            <p className={styles.patientName}>Chioma Eze</p>
            <p className={styles.patientRole}>Family Access</p>
          </div>
        </div>

      </div>

      <nav className={styles.sidebarNav} aria-label="Patient dashboard navigation">
        <ul className={styles.navList}>

          <li className={styles.navItem}>
            <Link
              href="/patient-dashboard/overview"
              className={`${styles.navLink} ${activeLink === 'overview' ? styles.active : ''}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
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
        <button 
        className={styles.logoutBtn} 
        type="button"
        onClick={onLogout}
        >
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