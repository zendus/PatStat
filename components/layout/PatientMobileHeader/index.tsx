import React from 'react';
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
      {/* Logo — green icon square + text */}
      <div className={styles.mobileLogo}>
        <div className={styles.logoIconBox} aria-hidden="true">
          <svg width="20" height="16" viewBox="0 0 28 22" fill="none">
            <polyline
              points="0,11 5,11 8,4 11,18 14,8 17,14 20,11 28,11"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>Pat-Stat</span>
          <span className={styles.logoSub}>Family</span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.mobileActions}>
        {/* Bell */}
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

        {/* Hamburger */}
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