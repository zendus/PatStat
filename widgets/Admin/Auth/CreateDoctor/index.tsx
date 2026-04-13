"use client";

import React, { useState } from 'react';
import { FormEvent } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './style.module.css';
import Link from 'next/link';

const DocCreation: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the terms to create an account.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Account created:', { password, phoneNumber });
      router.push('/patient-dashboard/updates'); // Redirect to dashboard on successful account creation 
      // router.replace('/patient-dashboard/updates');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Account creation failed: ${err.message}. Please try again.`);
      } else {
        setError('Account creation failed. Please try again.');
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
              <h1 className={styles.heroTitle}>Empowering care teams with secure updates</h1>
              <p className={styles.heroSubtitle}>
                Share secure, real-time patient updates with authorized family members 
                directly from the ward, keeping everyone informed and at ease.
              </p>

              {/* <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified hospital updates
                </li>
                <li className={styles.featureItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Secure family access
                </li>
                <li className={styles.featureItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Real-time patient status
                </li>
              </ul> */}
            </div>
{/* 
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
            </footer> */}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.stepBadge} aria-label="Step 2 of 2: Account Creation">
            <span className={styles.stepNumber}>STEP 02/02</span>
            <span className={styles.stepName}>Account Setup</span>
          </div>

          <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>Create your password</h2>
            <p className={styles.formSubtitle}>Secure your account to access patient updates.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="password" className={styles.fieldLabelRight}>
                  Create Password <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <div className={styles.inputGroup}>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`${styles.input} ${error && password.length === 0 ? styles.inputError : ''}`}
                    placeholder="Enter a secure password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    aria-describedby="password-error"
                    aria-required="true"
                    aria-invalid={!!error && password.length === 0}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.24 18.24 0 012.76-3.95M2.46 2.46L19.54 19.54"></path>
                          <path d="M9.36 4.35A10.15 10.15 0 0112 4c7 0 11 8 11 8a18.24 18.24 0 01-2.76 3.95"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                          <path d="M12 17a5 5 0 01-5-5"></path>
                          <path d="M12 17a5 5 0 01-5-5"></path>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {error && password.length === 0 && (
                  <p id="password-error" className={styles.errorMsg} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.fieldLabelRight}>
                  Confirm Password <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <div className={styles.inputGroup}>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`${styles.input} ${error && confirmPassword !== password ? styles.inputError : ''}`}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    aria-describedby="confirm-password-error"
                    aria-required="true"
                    aria-invalid={!!error && confirmPassword !== password}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showConfirmPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.24 18.24 0 012.76-3.95M2.46 2.46L19.54 19.54"></path>
                          <path d="M9.36 4.35A10.15 10.15 0 0112 4c7 0 11 8 11 8a18.24 18.24 0 01-2.76 3.95"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                          <path d="M12 17a5 5 0 01-5-5"></path>
                          <path d="M12 17a5 5 0 01-5-5"></path>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {error && confirmPassword !== password && (
                  <p id="confirm-password-error" className={styles.errorMsg} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="phoneNumber" className={styles.fieldLabelRight}>
                  Phone Number (optional)
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className={styles.input}
                  placeholder="+234"
                  value={phoneNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                  autoComplete="tel"
                />
              </div>

              <div className={styles.checkboxField}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreedToTerms}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreedToTerms(e.target.checked)}
                  className={styles.checkbox}
                  aria-invalid={!!error && !agreedToTerms}
                  aria-describedby="terms-error"
                />
                <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                  I understand this access is private and should not be shared.
                </label>
                {error && !agreedToTerms && (
                  <p id="terms-error" className={styles.errorMsg} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={styles.btnCreateAccount}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? 'Creating Account…' : 'Create Secure Account'}
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

export { DocCreation };