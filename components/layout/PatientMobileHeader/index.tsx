import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';

interface PatientMobileHeaderProps {
  onMenuToggle: () => void;
  onNotificationToggle: () => void;
  hasUnread?: boolean;
}

const PatientMobileHeader: React.FC<PatientMobileHeaderProps> = ({
  onMenuToggle,
  onNotificationToggle,
  hasUnread = false,
}) => {
  return (
    <header className={styles.mobileHeader}>
      <div className={styles.logo}>
        <div className={styles.logoIcon} aria-hidden="true">
          <Link href="/patient-dashboard/overview">
            <Image src="/images/pat-stat-patient-menu-logo.svg"
              alt="Pat-stat patient dashboard logo"
              width={133}
              height={50}
            />  
          </Link>
        </div>
      </div>

      <div className={styles.mobileActions}>
        <button
          className={styles.mobileActionBtn}
          onClick={onNotificationToggle}
          aria-label="Notifications"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          {hasUnread && <span className={styles.unreadDot} aria-label="New notifications" />}
        </button>

        <button
          className={styles.mobileActionBtn}
          onClick={onMenuToggle}
          aria-label="Open menu"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export { PatientMobileHeader };