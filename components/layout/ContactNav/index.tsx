import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.css';

export const ContactNavigation = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.headerLogo} aria-label="Pat-Stat home">
        <Image
          src="images/pat-stat-landing-logo.svg"
          alt="Pat-Stat"
          width={142}
          height={45}
          className={styles.logoImage}
          priority
        />
      </Link>
      <Link href="/" className={styles.backLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>
    </header>
  );
};