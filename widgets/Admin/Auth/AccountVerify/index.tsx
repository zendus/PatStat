"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './style.module.css';
import Link from 'next/link';

interface PatientInfo {
  name: string;
  ward: string;
  hospital: string;
  accessCode: string;
}

const PATIENT_INFO: PatientInfo = {
  name: 'John Eze',
  ward: 'ICU – Ward C',
  hospital: 'Parklane General Hospital',
  accessCode: 'VYABHN95',
};

const AccessVerification: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);

    try {   // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log('Verification successful for:', email);
      router.push('/create-account'); // Redirect to dashboard on successful verification
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Verification failed: ${err.message}. Please try again.`);
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
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
              <h1 className={styles.heroTitle}>Secure Patient Access</h1>
              <p className={styles.heroSubtitle}>
                You&apos;ve been invited to securely access patient updates through Pat-Stat.
              </p>

              <div className={styles.patientCard}>
                <dl className={styles.patientFields}>
                  <div className={styles.patientField}>
                    <dt className={styles.fieldLabel}>Patient</dt>
                    <dd className={styles.fieldValue}>{PATIENT_INFO.name}</dd>
                  </div>
                  <div className={styles.patientField}>
                    <dt className={styles.fieldLabel}>Ward</dt>
                    <dd className={styles.fieldValue}>{PATIENT_INFO.ward}</dd>
                  </div>
                  <div className={styles.patientField} style={{ marginBottom: 0 }}>
                    <dt className={styles.fieldLabel}>Hospital</dt>
                    <dd className={styles.fieldValue}>{PATIENT_INFO.hospital}</dd>
                  </div>
                </dl>
                <p className={styles.patientNote}>
                  Use the email address where you received the invitation.
                </p>
              </div>
            </div>

            <footer className={styles.support}>
              <div className={styles.supportItem}>
                <span className={styles.supportIcon} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <div>
                  <strong className={styles.supportLabel}>Support</strong>
                  <span className={styles.supportValue}>help@patstat.com</span>
                </div>
              </div>
              <div className={styles.supportItem}>
                <span className={styles.supportIcon} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                  </svg>
                </span>
                <div>
                  <strong className={styles.supportLabel}>Direct Line</strong>
                  <span className={styles.supportValue}>+234 (0) 800-PAT-STAT</span>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.stepBadge} aria-label="Step 1 of 2: Access Verification">
            <span className={styles.stepNumber}>STEP 01/02</span>
            <span className={styles.stepName}>Access Verification</span>
          </div>

          <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>Verify Your Access</h2>
            <p className={styles.formSubtitle}>Confirm your invitation details to continue.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <span className={styles.fieldLabelRight}>Access Code</span>
                <div className={styles.codePill} aria-label={`Access code: ${PATIENT_INFO.accessCode}`}>
                  {PATIENT_INFO.accessCode}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.fieldLabelRight}>
                  Enter Email Address <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-describedby="email-hint email-error"
                  aria-required="true"
                  aria-invalid={!!error}
                />
                <p id="email-hint" className={styles.hint}>
                  Use the email address where you received the invitation.
                </p>
                {error && (
                  <p id="email-error" className={styles.errorMsg} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={styles.btnSignIn}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? 'Verifying…' : 'Sign In'}
              </button>
            </form>

            <div className={styles.securityBadge} aria-label="Secure hospital connection, protected by Pat-Stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span>Secure hospital connection &bull; Protected by Pat-Stat</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export { AccessVerification };