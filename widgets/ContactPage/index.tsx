import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './style.module.css';

interface FormState {
  firstName: string;
  lastName: string;
  workEmail: string;
  orgName: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  orgName?: string;
}

const ContactPage: NextPage = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    workEmail: '',
    orgName: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim())  newErrors.lastName  = 'Required';
    if (!form.workEmail.trim() || !/\S+@\S+\.\S+/.test(form.workEmail)) {
      newErrors.workEmail = 'Enter a valid email';
    }
    if (!form.orgName.trim()) newErrors.orgName = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // TODO: Replace with your real API call
      await new Promise((res) => setTimeout(res, 1000));
      router.push('/contact-success');
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us – Pat-Stat</title>
        <meta name="description" content="Talk with our team to see how Pat-Stat can support your hospital." />
      </Head>

      <div className={styles.pageWrapper}>

        {/* ── Main content ── */}
        <main className={styles.main}>

          {/* Left — hero copy */}
          <div className={styles.leftCol}>
            <h1 className={styles.heroTitle}>
              Talk with our team to see how Pat-Stat can support your hospital&apos;s needs
            </h1>

            <ul className={styles.benefitsList} aria-label="What you'll get">
              {[
                'Personalized product walkthrough',
                'Pricing based on your needs',
                'Implementation guidance',
                'Answers to your questions',
              ].map((item) => (
                <li key={item} className={styles.benefitsItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Contact methods */}
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Email Us</p>
                  <p className={styles.contactSub}>Our friendly team is here to help.</p>
                  <a href="mailto:sales@pat-stat.com" className={styles.contactLink}>sales@pat-stat.com</a>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={`${styles.contactIcon} ${styles.contactIconGreen}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Call Us</p>
                  <p className={styles.contactSub}>Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+234XXXXXXXXX" className={styles.contactLink}>+234 XXX XXX XXXX</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className={styles.rightCol}>
            <form className={styles.formCard} onSubmit={handleSubmit} noValidate>

              {/* Name row */}
              <div className={styles.nameRow}>
                <div className={styles.field}>
                  <label htmlFor="firstName" className={styles.label}>First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                </div>
                <div className={styles.field}>
                  <label htmlFor="lastName" className={styles.label}>Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    aria-required="true"
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
              </div>

              {/* Work email */}
              <div className={styles.field}>
                <label htmlFor="workEmail" className={styles.label}>Work Email</label>
                <input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  placeholder="Enter work email"
                  className={`${styles.input} ${errors.workEmail ? styles.inputError : ''}`}
                  value={form.workEmail}
                  onChange={handleChange}
                  autoComplete="work email"
                  aria-required="true"
                  aria-invalid={!!errors.workEmail}
                />
                {errors.workEmail && <span className={styles.errorMsg}>{errors.workEmail}</span>}
              </div>

              {/* Org name */}
              <div className={styles.field}>
                <label htmlFor="orgName" className={styles.label}>Hospital/Organization Name</label>
                <input
                  id="orgName"
                  name="orgName"
                  type="text"
                  placeholder="Enter hospital or organization name"
                  className={`${styles.input} ${errors.orgName ? styles.inputError : ''}`}
                  value={form.orgName}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.orgName}
                />
                {errors.orgName && <span className={styles.errorMsg}>{errors.orgName}</span>}
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs..."
                  className={styles.textarea}
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </button>

              <p className={styles.privacyNote}>
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className={styles.privacyLink}>Privacy Policy</Link>.
              </p>

            </form>
          </div>

        </main>
      </div>
    </>
  );
};

export default ContactPage;