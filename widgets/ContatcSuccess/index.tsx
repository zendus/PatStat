import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';

const ContactSuccessPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Request Received – Pat-Stat</title>
        <meta name="description" content="We've received your request and will get back to you within 24 hours." />
      </Head>

      <div className={styles.pageWrapper}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <Link href="/" className={styles.headerLogo} aria-label="Pat-Stat home">
            <Image
              src="/images/pat-stat-landing-logo.svg"
              alt="Pat-Stat"
              width={120}
              height={36}
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

        {/* ── Success card ── */}
        <main className={styles.main}>
          <div className={styles.successCard} role="alert" aria-live="polite">

            {/* Check icon */}
            <div className={styles.iconCircle} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className={styles.successTitle}>Request received</h1>
            <p className={styles.successDesc}>
              Thank you for your interest in Pat-Stat. Our team will<br />
              get back to you within 24 hours.
            </p>

            <Link href="/" className={styles.returnBtn}>
              Return to Home
            </Link>

          </div>
        </main>

      </div>
    </>
  );
};

export default ContactSuccessPage;