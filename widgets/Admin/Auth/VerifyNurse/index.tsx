"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './style.module.css';
import Link from 'next/link';
import { ST } from 'next/dist/shared/lib/utils';

interface StaffInfo {
  hospital: string;
  staffMember: string;
  workEmail: string;
}

const STAFF_INFO: StaffInfo = {
  hospital: 'Parklane General Hospital',
  staffMember: 'Chisom Okeke',
  workEmail: 'chisom.okeke@hospital.ng',
};

const HospitalIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d="M3 9h6" />
    <path d="M3 15h6" />
    <path d="M12 7h3v3h-3z" />
    <path d="M15 13h3v8h-3z" />
  </svg>
);

const PersonIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const NurseVerification: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push('/create-account');
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>

        {/* ── Left panel (unchanged) ── */}
        <div className={styles.left}>
          <Image
            src="/images/auth_bg.webp"
            alt="background image of a doctor reviewing patient data on a tablet"
            fill
            priority
            className={styles.bgImage}
            sizes="(max-width: 860px) 0vw, (max-width: 1024px) 50vw, 46vw"
          />
          <div className={styles.leftOverlay} />

          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <Link href="/" aria-label="Pat-Stat Home">
                <Image
                  src="/images/auth_logo.svg"
                  alt="Pat-Stat logo"
                  width={133}
                  height={50}
                />
              </Link>
            </div>

            <div className={styles.hero}>
              <h1 className={styles.heroTitle}>Empowering care teams with secure updates</h1>
              <p className={styles.heroSubtitle}>
                Share secure, real-time patient updates with authorized family members directly
                from the ward, keeping everyone informed and at ease.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={styles.right}>
          <div className={styles.stepBadge} aria-label="Step 1 of 2: Access Verification">
            <span className={styles.stepNumber}>STEP 01/02</span>
            <span className={styles.stepName}>Access Verification</span>
          </div>

          <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>Welcome to Pat-Stat</h2>
            <p className={styles.formSubtitle}>
              Please verify your details before continuing to setup your account.
            </p>

            <form onSubmit={handleSubmit} noValidate>

              {/* ── Info card ── */}
              <div className={styles.infoCard}>

                {/* Hospital */}
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <HospitalIcon />
                  </span>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>HOSPITAL</span>
                    <span className={styles.infoValue}>{STAFF_INFO.hospital}</span>
                  </div>
                </div>

                <div className={styles.infoDivider} />

                {/* Staff Member */}
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <PersonIcon />
                  </span>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>STAFF MEMBER</span>
                    <span className={styles.infoValue}>{STAFF_INFO.staffMember}</span>
                  </div>
                </div>

                <div className={styles.infoDivider} />

                {/* Work Email */}
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <EmailIcon />
                  </span>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>WORK EMAIL</span>
                    <div className={styles.emailInputWrapper}>
                      <input
                        type="email"
                        className={styles.emailInput}
                        // defaultValue={STAFF_INFO.workEmail}
                        placeholder={STAFF_INFO.workEmail}
                        aria-label="Work email address"
                        autoComplete="work email"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* ── CTA button ── */}
              <button
                type="submit"
                className={styles.btnSignIn}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? 'Verifying…' : 'Continue to Set Up Account'}
              </button>

            </form>

            {/* ── Security badge ── */}
            <div
              className={styles.securityBadge}
              aria-label="Secure hospital connection, protected by Pat-Stat"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>Secure hospital connection &bull; Protected by Pat-Stat</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export { NurseVerification };