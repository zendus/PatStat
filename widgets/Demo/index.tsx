"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './style.module.css';
import Link from 'next/link';

type Role = {
  id: string;
  title: string;
  description: string;
  href: string;
};

const roles: Role[] = [
  {
    id: 'admin',
    title: 'Hospital Admin',
    description: 'Manage patients, staff, and access control',
    href: '/admin-dashboard',
  },
  {
    id: 'doctor',
    title: 'Doctor',
    description: 'Update patient status and manage care',
    href: 'doctor-dashboard/dashboard',
  },
  {
    id: 'nurse',
    title: 'Nurse',
    description: 'Monitor patients and provide status updates',
    href: '/nurse-dashboard/dashboard',
  },
  {
    id: 'family',
    title: 'Family Member',
    description: 'View patient status and updates',
    href: '/patient-dashboard/overview',
  },
];

const SelectRolePage: NextPage = () => {
  const router = useRouter();

  const handleRoleSelect = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <Head>
        <title>Select Your Role – Pat-Stat</title>
        <meta name="description" content="Select your role to access the Pat-Stat healthcare communication platform." />
      </Head>

      <div className={styles.pageWrapper}>

        <div className={styles.logoSection}>
          <Link href="/">
          <Image
            src="images/pat-stat-landing-logo.svg"
            alt="Pat-Stat Logo"
            width={120}
            height={40}
            className={styles.logoImage}
          />
          </Link>
          <p className={styles.logoTagline}>
            Healthcare Communication Platform<br />for African Hospitals
          </p>
        </div>

        <div className={styles.roleCard}>
          <div className={styles.roleCardHeader}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <h2 className={styles.roleCardTitle}>Select Your Role</h2>
          </div>

          <ul className={styles.roleList} role="list">
            {roles.map((role) => (
              <li key={role.id}>
                <button
                  className={styles.roleItem}
                  onClick={() => handleRoleSelect(role.href)}
                  type="button"
                  aria-label={`Continue as ${role.title}`}
                >
                  <div className={styles.roleItemText}>
                    <span className={styles.roleItemTitle}>{role.title}</span>
                    <span className={styles.roleItemDesc}>{role.description}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.roleChevron} aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <p className={styles.demoNote}>
            This is a demo with sample data.<br />
            Secure authentication is required in the live system.
          </p>
        </div>

        {/* ── Footer tagline ── */}
        <p className={styles.footerTagline}>
          Reducing phone calls • Preventing miscommunication<br />
          Delivering transparent, compassionate care
        </p>

      </div>
    </>
  );
};

export default SelectRolePage;