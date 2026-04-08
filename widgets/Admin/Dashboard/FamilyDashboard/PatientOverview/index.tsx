import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

/* ── Types ──────────────────────────────────────────── */

type StatusColor = 'green' | 'blue' | 'yellow' | 'red';

interface PatientStatus {
  label: string;
  color: StatusColor;
}

interface CareTeamMember {
  id: string;
  initials: string;
  name: string;
  role: 'doctor' | 'nurse';
  roleLabel: string;
}

/* ── Static data (replace with API/props as needed) ─── */

const VISITOR_NAME = 'Chioma';
const TODAY_LABEL  = 'Mon, 9 Feb';

const patient = {
  name: 'John Eze',
  ward: 'ICU - Ward C',
  admittedDate: '2 February 2026',
  diagnosis: 'Severe Pneumonia',
  status: { label: 'Getting Better', color: 'blue' } as PatientStatus,
};

const latestUpdate = {
  timeAgo: '10 h ago',
  description:
    'The patient is showing signs of improvement and responding well to treatment.',
  updatedBy: 'Nurse Chisom Okeke',
};

const careTeam: CareTeamMember[] = [
  { id: 'tobenna-obi',  initials: 'Dr', name: 'Dr. Tobenna Obi',    role: 'doctor', roleLabel: 'Primary Doctor' },
  { id: 'chisom-okeke', initials: 'N',  name: 'Nurse Chisom Okeke', role: 'nurse',  roleLabel: 'Nurse' },
  { id: 'jide-adeleke', initials: 'N',  name: 'Nurse Jide Adeleke', role: 'nurse',  roleLabel: 'Nurse' },
];

/* ── Inline SVG icons ───────────────────────────────── */

const ClockIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const LocationIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StethoscopeIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10a4 4 0 004 4h4a4 4 0 004-4V6H3v4z" />
    <path d="M15 10v4a4 4 0 004 4v0a2 2 0 002-2v-2" />
    <circle cx="21" cy="14" r="1" />
  </svg>
);

const UsersIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

/* ── Component ──────────────────────────────────────── */

const PatientOverview: React.FC = () => {
  return (
    <div className={styles.overviewWrapper}>

      {/* ══════════════════════════════════════
          DESKTOP WELCOME CARD
      ══════════════════════════════════════ */}
      <div className={styles.desktopWelcomeCard}>
        <div className={styles.welcomeLeft}>
          {/* Avatar */}
          <div className={styles.avatarCircle} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <div className={styles.welcomeHeader}>
            <h1 className={styles.welcomeTitle}>Welcome, {VISITOR_NAME}</h1>
            <p className={styles.welcomeDate}>Monday, 9 February</p>
            </div>
            <p className={styles.welcomeDesc}>
              Stay connected with real time updates about your loved ones. You have access to view
              updates for 1 patient. The team is dedicated to providing transparent updates and the
              best possible care.
            </p>
          </div>
        </div>
        {/* <p className={styles.welcomeDate}>Monday, 9 February</p> */}
      </div>

      {/* ══════════════════════════════════════
          MOBILE WELCOME CARD (green)
      ══════════════════════════════════════ */}
      <div className={styles.mobileWelcomeCard}>
        <div className={styles.mobileWelcomeTop}>
          <div className={styles.mobileAvatarCircle} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className={styles.mobileWelcomeTitle}>Welcome, {VISITOR_NAME}</h1>
        </div>
        <p className={styles.mobileWelcomeDesc}>
          Stay connected with real time updates about your loved ones. You have access to view
          updates for 1 patient. The team is dedicated to providing transparent updates and the
          best possible care.
        </p>
      </div>

      {/* ══════════════════════════════════════
          MOBILE DATE LABEL
      ══════════════════════════════════════ */}
      <div className={styles.mobileDateRow}>
        <span className={styles.mobileDateToday}>Today</span>
        <span className={styles.mobileDateValue}>{TODAY_LABEL}</span>
      </div>

      {/* ══════════════════════════════════════
          PATIENT CARD
      ══════════════════════════════════════ */}
      <div className={styles.patientCard}>

        {/* Patient name + status */}
        <div className={styles.patientCardHeader}>
          <h2 className={styles.patientName}>{patient.name}</h2>
          <span className={`${styles.statusDot} ${styles[`statusDot--${patient.status.color}`]}`} aria-hidden="true" />
          <span className={`${styles.statusLabel} ${styles[`statusLabel--${patient.status.color}`]}`}>
            {patient.status.label}
          </span>
        </div>

        {/* Meta row — desktop: inline, mobile: stacked */}
        <div className={styles.patientMeta}>
          <span className={styles.metaItem}>
            <LocationIcon />
            {patient.ward}
          </span>
          <span className={styles.metaDivider} aria-hidden="true">·</span>
          <span className={styles.metaItem}>
            <CalendarIcon />
            Admitted {patient.admittedDate}
          </span>
          <span className={styles.metaDivider} aria-hidden="true">·</span>
          <span className={styles.metaItem}>
            <StethoscopeIcon />
            Diagnosis: {patient.diagnosis}
          </span>
        </div>

        {/* ── Latest Update ── */}
        <div className={styles.latestUpdateSection}>
          <div className={styles.latestUpdateHeader}>
            <span className={styles.latestUpdateLabel}>
              <ClockIcon size={15} />
              Latest Update
            </span>
            <span className={styles.latestUpdateDot} aria-hidden="true">·</span>
            <span className={styles.latestUpdateTime}>{latestUpdate.timeAgo}</span>
          </div>
          <p className={styles.latestUpdateDesc}>{latestUpdate.description}</p>
          <p className={styles.latestUpdateBy}>Updated by {latestUpdate.updatedBy}</p>
        </div>

      </div>

      {/* ══════════════════════════════════════
          MOBILE: Real-time info banner
      ══════════════════════════════════════ */}
      <div className={styles.mobileRealtimeBanner}>
        <div className={styles.mobileRealtimeHeader}>
          <InfoIcon />
          <span className={styles.mobileRealtimeTitle}>Updates in Real-Time</span>
        </div>
        <p className={styles.mobileRealtimeDesc}>
          The care team updates patient status regularly.<br />
          You&apos;ll see the latest information here.
        </p>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP: Care Team section
      ══════════════════════════════════════ */}
      <div className={styles.careTeamSection}>
        <h2 className={styles.sectionTitle}>
          <UsersIcon />
          Your Care Team
        </h2>

        <div className={styles.careTeamGrid}>
          {careTeam.map((member) => (
            <div key={member.id} className={styles.careTeamCard}>
              <div className={`${styles.memberAvatar} ${styles[`memberAvatar--${member.role}`]}`} aria-hidden="true">
                {member.initials}
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>{member.name}</p>
                <p className={styles.memberRole}>{member.roleLabel}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className={styles.ctaRow}>
          <Link href="/patient-dashboard/updates" className={styles.ctaBtnPrimary}>
            View All Updates &amp; History
          </Link>
          <Link href="/patient-dashboard/careteam" className={styles.ctaBtnOutline}>
            <PhoneIcon />
            Contact Care Team
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP: Privacy & Security
      ══════════════════════════════════════ */}
      <div className={styles.privacySection}>
        <h2 className={styles.sectionTitle}>
          <ShieldIcon />
          Privacy &amp; Security
        </h2>
        <p className={styles.privacyText}>
          Your access is secured and monitored. You can only view information for patients
          you&apos;ve been authorized to access. All updates are shared in clear, understandable
          language to keep you informed while protecting medical privacy. For questions or
          concerns about access, please contact hospital administration.
        </p>
      </div>

    </div>
  );
};

export { PatientOverview };