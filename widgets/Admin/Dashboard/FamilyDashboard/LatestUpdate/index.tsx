import React from 'react';
import styles from './style.module.css';

type StatusColor = 'green' | 'blue' | 'yellow' | 'red';

interface Update {
  patientName: string;
  status: 'Getting Better' | 'Stable' | 'Being Monitored' | 'Critical';
  statusColor: StatusColor;
  updatedBy: string;
  role: 'nurse' | 'doctor';
  date: string;
  time: string;
  description: string;
}

const updates: Update[] = [
  {
    patientName: 'John Eze',
    status: 'Getting Better',
    statusColor: 'blue',
    updatedBy: 'Chisom Okeke',
    role: 'nurse',
    date: 'Today, 9 Feb 2026',
    time: '5:30 pm',
    description: 'The patient is showing signs of improvement and responding well to treatment.',
  },
  {
    patientName: 'John Eze',
    status: 'Stable',
    statusColor: 'green',
    updatedBy: 'Tobenna Obi',
    role: 'doctor',
    date: 'Today, 9 Feb 2026',
    time: '10:30 am',
    description: 'The patient is currently stable and continues to receive appropriate care.',
  },
  {
    patientName: 'John Eze',
    status: 'Being Monitored',
    statusColor: 'yellow',
    updatedBy: 'Jide Adeleke',
    role: 'nurse',
    date: 'Yesterday, 8 Feb 2026',
    time: '10:15 am',
    description: 'Care team is closely monitoring patient progress.',
  },
  {
    patientName: 'John Eze',
    status: 'Critical',
    statusColor: 'red',
    updatedBy: 'Adaora Eke',
    role: 'doctor',
    date: 'Yesterday, 8 Feb 2026',
    time: '9:00 am',
    description: 'The patient is in critical condition and is receiving intensive care.',
  },
];

/** Inline person icon — matches screenshot's small user glyph */
const PersonIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LatestUpdate: React.FC = () => {
  return (
    <div className={styles.latestUpdateWrapper}>
      <h1 className={styles.contentTitle}>Latest Updates</h1>
      <p className={styles.contentSubtitle}>Recent patient status updates</p>

      <div className={styles.updatesGrid}>
        {updates.map((update, index) => {
          const providerLabel =
            update.role === 'doctor'
              ? `Dr. ${update.updatedBy} (doctor)`
              : `Nurse ${update.updatedBy} (nurse)`;

          return (
            <article
              key={index}
              className={`${styles.updateCard} ${styles[`updateCard--${update.statusColor}`]}`}
              aria-label={`Update for ${update.patientName}: ${update.status}`}
            >
              {/* Row 1 — patient name + status badge */}
              <div className={styles.updateHeader}>
                <h3 className={styles.updatePatientName}>{update.patientName}</h3>
                <span
                  className={`${styles.statusBadge} ${styles[`statusBadge--${update.statusColor}`]}`}
                >
                  {update.status}
                </span>
              </div>

              {/* Row 2 — provider • date & time */}
              <div className={styles.updateMeta}>
                <span className={styles.metaProvider}>
                  <PersonIcon />
                  {providerLabel}
                </span>
                <span className={styles.metaDot} aria-hidden="true">·</span>
                <span className={styles.metaDate}>
                  {update.date}, {update.time}
                </span>
              </div>

              {/* Row 3 — description */}
              <p className={styles.updateDescription}>{update.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export { LatestUpdate };