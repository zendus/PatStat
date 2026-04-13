import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

interface DoctorMobileFooterProps {
  activeLink?: "dashboard" | "updates" | "notes" | "profile";
}

const DoctorMobileFooter: React.FC<DoctorMobileFooterProps> = ({ activeLink }) => {
  return (
    <footer className={styles.mobileFooter} role="navigation" aria-label="Mobile navigation">

      <Link
        href="/doctor-dashboard/dashboard"
        className={`${styles.footerLink} ${activeLink === 'dashboard' ? styles.active : ''}`}
        aria-label="Dashboard"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0001 10C14.2101 10 16.0001 8.21 16.0001 6C16.0001 3.79 14.2101 2 12.0001 2C9.79006 2 8.00006 3.79 8.00006 6C8.00006 8.21 9.79006 10 12.0001 10ZM12.0001 4C13.1001 4 14.0001 4.9 14.0001 6C14.0001 7.1 13.1001 8 12.0001 8C10.9001 8 10.0001 7.1 10.0001 6C10.0001 4.9 10.9001 4 12.0001 4ZM18.3901 12.56C16.7101 11.7 14.5301 11 12.0001 11C9.47007 11 7.29007 11.7 5.61007 12.56C5.12212 12.8113 4.71337 13.1929 4.42916 13.6625C4.14496 14.132 3.99643 14.6712 4.00006 15.22V22H6.00007V15.22C6.00007 14.84 6.20007 14.5 6.50007 14.34C7.71007 13.73 9.63006 13 12.0001 13C12.7601 13 13.4701 13.07 14.1301 13.2L12.5801 16.5H9.75006C8.23006 16.5 7.00007 17.73 7.00007 19.25C7.00007 20.77 8.23006 22 9.75006 22H18.0001C19.1001 22 20.0001 21.1 20.0001 20V15.22C20.0001 14.1 19.3901 13.07 18.3901 12.56ZM10.9401 20H9.75006C9.34007 20 9.00006 19.66 9.00006 19.25C9.00006 18.84 9.34007 18.5 9.75006 18.5H11.6401L10.9401 20ZM18.0001 20H13.1501L16.0901 13.73C16.6301 13.93 17.1001 14.14 17.5001 14.34C17.8001 14.5 18.0001 14.84 18.0001 15.22V20Z" fill="currentColor" />
        </svg>
        <span>Dashboard</span>
      </Link>

      <Link
        href="/doctor-dashboard/status"
        className={`${styles.footerLink} ${activeLink === 'updates' ? styles.active : ''}`}
        aria-label="Updates"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <span>Updates</span>
      </Link>

      <Link
        href="/doctor-dashboard/notes"
        className={`${styles.footerLink} ${activeLink === 'notes' ? styles.active : ''}`}
        aria-label="Clinical Notes"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14H11.5M8 10H16M13 3.5H11C7.7 3.5 6.05 3.5 5.025 4.525C4 5.55 4 7.2 4 10.5V15C4 18.3 4 19.95 5.025 20.975C6.05 22 7.7 22 11 22H14L20 16V10.5C20 7.2 20 5.55 18.975 4.525C17.95 3.5 16.3 3.5 13 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 16C17.172 16 15.757 16 14.879 16.879C14 17.757 14 19.172 14 22M16.5 2V5M7.5 2V5M12 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Notes</span>
      </Link>

      <Link
        href="/doctor-dashboard/profile"
        className={`${styles.footerLink} ${activeLink === 'profile' ? styles.active : ''}`}
        aria-label="Profile"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9C8 7.93913 8.42143 6.92172 9.17157 6.17157C9.92172 5.42143 10.9391 5 12 5C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9ZM14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11C11.4696 11 10.9609 10.7893 10.5858 10.4142C10.2107 10.0391 10 9.53043 10 9C10 8.46957 10.2107 7.96086 10.5858 7.58579C10.9609 7.21071 11.4696 7 12 7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9Z" fill="currentColor" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1ZM3 12C3 14.09 3.713 16.014 4.908 17.542C5.74744 16.4401 6.83015 15.5471 8.07164 14.9327C9.31312 14.3183 10.6798 13.9991 12.065 14C13.4324 13.9984 14.7821 14.3091 16.0111 14.9084C17.2402 15.5077 18.3162 16.3797 19.157 17.458C20.0234 16.3216 20.6068 14.9952 20.8589 13.5886C21.111 12.182 21.0244 10.7355 20.6065 9.36898C20.1886 8.00243 19.4512 6.75505 18.4555 5.73004C17.4598 4.70503 16.2343 3.93186 14.8804 3.47451C13.5265 3.01716 12.0832 2.88877 10.6699 3.09997C9.25652 3.31117 7.91379 3.85589 6.75277 4.68905C5.59175 5.52222 4.64581 6.61987 3.99323 7.8912C3.34065 9.16252 3.00018 10.571 3 12ZM12 21C9.93391 21.0033 7.93014 20.2926 6.328 18.988C6.97281 18.0646 7.83119 17.3107 8.83008 16.7905C9.82896 16.2702 10.9388 15.999 12.065 16C13.1772 15.999 14.2735 16.2635 15.263 16.7713C16.2524 17.2792 17.1064 18.0158 17.754 18.92C16.1395 20.267 14.1026 21.0033 12 21Z" fill="currentColor" />
        </svg>
        <span>Profile</span>
      </Link>

    </footer>
  );
};

export { DoctorMobileFooter };