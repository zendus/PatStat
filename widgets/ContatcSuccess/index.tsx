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

        {/* ── Success card ── */}
        <main className={styles.main}>
          <div className={styles.successCard} role="alert" aria-live="polite">

            {/* Check icon */}
            <div className={styles.iconCircle} aria-hidden="true">
              <Image 
              src="images/contact-success-check-icon.svg" 
              alt="Success" 
              width={32} 
              height={32} 
              className={styles.checkIcon}
              />
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