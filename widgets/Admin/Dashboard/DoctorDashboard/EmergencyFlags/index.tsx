"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmergencyFlag {
  id: number;
  patientName: string;
  location: string;
  description: string;
  isEmergency: boolean; // To mark specific emergencies for the badge
  status?: string; // e.g., "Post-surgical recovery", "Post-delivery observation"
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const emergencyFlagsData: EmergencyFlag[] = [
  {
    id: 1,
    patientName: "Mary Ochieng",
    location: "General Ward B • Bed B-08",
    description: "Post-surgical recovery (Appendectomy)",
    isEmergency: false, // This is a flag, but not marked with the 'EMERGENCY' badge in the screenshot
  },
  {
    id: 2,
    patientName: "Grace Mwangi",
    location: "Maternity Ward • Bed M-15",
    description: "Post-delivery observation",
    isEmergency: false,
  },
  {
    id: 3,
    patientName: "Samuel Banda",
    location: "Cardiac Care Unit • Bed C-03",
    description: "Cardiac arrhythmia",
    isEmergency: true, // This one has the 'EMERGENCY' badge
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const TriangleAlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#21B573" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.9" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);


// ─── Sub-components ───────────────────────────────────────────────────────────

const EmergencyFlagCard: React.FC<{ flag: EmergencyFlag }> = ({ flag }) => {
  return (
    <div className={styles.emergencyCard}>
      <div className={styles.flagIcon}>
        <TriangleAlertIcon />
      </div>
      <div className={styles.flagContent}>
        <div className={styles.flagHeader}>
          <span className={styles.patientName}>{flag.patientName}</span>
          {flag.isEmergency && <span className={styles.emergencyBadge}>EMERGENCY</span>}
        </div>
        <p className={styles.patientLocation}>{flag.location}</p>
        <p className={styles.flagDescription}>{flag.description}</p>
        <div className={styles.flagActions}>
          <button className={styles.viewDetailsButton}>View Full Details</button>
          <button className={styles.updateStatusButton}>Update Status</button>
        </div>
      </div>
    </div>
  );
};

const NoEmergencyCases: React.FC = () => (
  <div className={styles.noEmergencyContainer}>
    <CheckCircleIcon />
    <h3 className={styles.noEmergencyTitle}>No Emergency Cases</h3>
    <p className={styles.noEmergencyText}>
      All patients are stable. No critical or emergency cases at this time.
    </p>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const EmergencyFlagsPage: React.FC = () => {
  // Use a state to simulate emergency cases being active or not
  const [hasEmergencies, setHasEmergencies] = useState(true); // Set to true initially for the active state

  // You can toggle this state for testing the "no emergencies" view
  // useEffect(() => {
  //   const timer = setTimeout(() => setHasEmergencies(false), 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className={styles.emergencyWrapper}>
      <div className={styles.emergencyHeader}>
        <h1>Emergency Flags</h1>
        <p className={styles.emergencySubtitle}>Patients requiring immediate attention</p>
      </div>

      <div className={styles.emergencyList}>
        {hasEmergencies && emergencyFlagsData.length > 0 ? (
          emergencyFlagsData.map((flag) => (
            <EmergencyFlagCard key={flag.id} flag={flag} />
          ))
        ) : (
          <NoEmergencyCases />
        )}
      </div>
    </div>
  );
};

export { EmergencyFlagsPage };