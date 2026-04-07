import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './style.module.css';

interface PatientMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  showNotifications: boolean;
  activeLink: 'overview' | 'updates' | 'history' | 'careteam' | 'notifications' | 'help';
}

/* ── Notification data ─────────────────────────────── */
type NotifType = 'success' | 'info' | 'danger';

interface Notification {
  type: NotifType;
  text: string;
  time: string;
}

const notifications: Notification[] = [
  { type: 'success', text: 'Patient status updated to stable',              time: '10 hrs ago' },
  { type: 'info',    text: 'Patient status updated to Improving',           time: '21 hrs ago' },
  { type: 'info',    text: 'Care team shared an update about the patient',  time: '10 hrs ago' },
  { type: 'danger',  text: 'Patient condition is critical',                 time: '1 day ago'  },
  { type: 'info',    text: 'Patient has been admitted',                     time: '2 days ago' },
  { type: 'info',    text: "You've been granted access to patient updates", time: '2 days ago' },
];

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const DangerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const notifIconMap: Record<NotifType, React.FC> = {
  success: SuccessIcon,
  info: InfoIcon,
  danger: DangerIcon,
};

const PatientMobileMenu: React.FC<PatientMobileMenuProps> = ({
  isOpen,
  onClose,
  showNotifications,
  activeLink,
}) => {
  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={showNotifications ? 'Notifications' : 'Navigation menu'}
    >
      <div className={`${styles.panel} ${showNotifications ? styles.panelNotif : styles.panelMenu}`}>

        {/* ═══════════════ NOTIFICATIONS VIEW ═══════════════ */}
        {showNotifications ? (
          <>
            {/* Green header bar */}
            <div className={styles.notifHeader}>
              <h2 className={styles.notifTitle}>Notifications</h2>
              <div className={styles.notifHeaderRight}>
                <span className={styles.notifBadge}>0 New</span>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close notifications" type="button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Notification rows */}
            <ul className={styles.notifList} role="list">
              {notifications.map((n, i) => {
                const Icon = notifIconMap[n.type];
                return (
                  <li key={i} className={styles.notifRow}>
                    <span className={`${styles.notifIconCircle} ${styles[`notifIconCircle--${n.type}`]}`} aria-hidden="true">
                      <Icon />
                    </span>
                    <div className={styles.notifBody}>
                      <p className={styles.notifText}>{n.text}</p>
                      <span className={styles.notifTime}>{n.time}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (

        /* ═══════════════ MENU VIEW ═══════════════ */
          <>
            {/* Profile header */}
            <div className={styles.menuHeader}>
              <div className={styles.menuProfile}>
                <div className={styles.avatar} aria-hidden="true">C</div>
                <div className={styles.menuProfileText}>
                  <p className={styles.menuProfileName}>Chioma Eze</p>
                  <p className={styles.menuProfileRole}>Family</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className={styles.menuNav} aria-label="Dashboard navigation">
              <ul className={styles.navList}>
                <li>
                  <Link href="/patient-dashboard/overview" className={`${styles.navLink} ${activeLink === 'overview' ? styles.active : ''}`} onClick={onClose}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
                    Patient Overview
                  </Link>
                </li>
                <li>
                  <Link href="/patient-dashboard/updates" className={`${styles.navLink} ${activeLink === 'updates' ? styles.active : ''}`} onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Latest Updates
                  </Link>
                </li>
                <li>
                  <Link href="/patient-dashboard/history" className={`${styles.navLink} ${activeLink === 'history' ? styles.active : ''}`} onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    Update History
                  </Link>
                </li>
                <li>
                  <Link href="/patient-dashboard/careteam" className={`${styles.navLink} ${activeLink === 'careteam' ? styles.active : ''}`} onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    Care Team Info
                  </Link>
                </li>
                <li>
                  <Link href="/patient-dashboard/help" className={`${styles.navLink} ${activeLink === 'help' ? styles.active : ''}`} onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Help &amp; Support
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout */}
            <div className={styles.menuLogout}>
              <button className={styles.logoutBtn} type="button" onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { PatientMobileMenu };