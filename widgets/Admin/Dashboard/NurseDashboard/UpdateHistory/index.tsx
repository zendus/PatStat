import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Stable" | "Getting Better" | "Being Monitored" | "Critical";

interface Vitals {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenLevel: string;
}

interface UpdateEntry {
  id: number;
  patientName: string;
  updatedBy: string;
  role: "doctor" | "nurse";
  ward?: string;
  bed?: string;
  dateTime: string;
  timeAgo: string;
  note: string;
  status: PatientStatus;
  vitals: Vitals;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const updates: UpdateEntry[] = [
  {
    id: 1,
    patientName: "John Eze",
    updatedBy: "Dr. Tobenna Obi",
    role: "doctor",
    ward: "ICU - Ward C",
    bed: "Bed 17",
    dateTime: "Today, 9 Feb 2026, 3:30 pm",
    timeAgo: "10h ago",
    note: "Patient showing significant improvement. Oxygen saturation stable at 95%. Reduced fever. Continue current medication.",
    status: "Getting Better",
    vitals: {
      bloodPressure: "128/82 mmHg",
      heartRate: "78 bpm",
      temperature: "37.2°C.",
      oxygenLevel: "95%",
    },
  },
  {
    id: 2,
    patientName: "Samuel Banda",
    updatedBy: "Nurse Jide Adeleke",
    role: "nurse",
    ward: "Cardiac Care Unit",
    bed: "Bed C-03",
    dateTime: "Yesterday, 8 Feb 2026, 10:15 am",
    timeAgo: "1d ago",
    note: "Heart rhythm showing improvement. Continue monitoring. ECG scheduled for tomorrow.",
    status: "Being Monitored",
    vitals: {
      bloodPressure: "135/88 mmHg",
      heartRate: "85 bpm",
      temperature: "36.9°C.",
      oxygenLevel: "96%",
    },
  },
  {
    id: 3,
    patientName: "Mary Ochieng",
    updatedBy: "Nurse Chisom Okeke",
    role: "nurse",
    ward: "General Ward B",
    bed: "Bed B-08",
    dateTime: "Yesterday, 8 Feb 2026, 3:15 pm",
    timeAgo: "12h ago",
    note: "Recovery progressing well. Patient mobile and eating normally. Pain management effective.",
    status: "Stable",
    vitals: {
      bloodPressure: "128/84 mmHg",
      heartRate: "76 bpm",
      temperature: "37.2°C.",
      oxygenLevel: "96%",
    },
  },
  {
    id: 4,
    patientName: "Grace Mwangi",
    updatedBy: "Dr. Tobenna Obi",
    role: "doctor",
    ward: "Maternity Ward",
    bed: "Bed M-15",
    dateTime: "Today, 9 Feb 2026, 8:00 am",
    timeAgo: "5h ago",
    note: "Post-delivery vitals are normal. Mother and baby doing well. Continue standard post-natal care.",
    status: "Stable",
    vitals: {
      bloodPressure: "120/78 mmHg",
      heartRate: "72 bpm",
      temperature: "36.8°C.",
      oxygenLevel: "98%",
    },
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusClass: Record<PatientStatus, string> = {
  "Getting Better":  styles.statusBlue,
  "Stable":          styles.statusGreen,
  "Being Monitored": styles.statusOrange,
  "Critical":        styles.statusRed,
};

const StatusBadge: React.FC<{ status: PatientStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${statusClass[status]}`}>{status}</span>
);

// ─── Icons ────────────────────────────────────────────────────────────────────

const PersonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PulseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// ─── Vitals grid ─────────────────────────────────────────────────────────────

const VitalsGrid: React.FC<{ vitals: Vitals; showHeading?: boolean }> = ({ vitals, showHeading = false }) => (
  <div className={styles.vitalsBlock}>
    {showHeading && (
      <div className={styles.vitalsHeading}>
        <span className={styles.vitalsHeadingIcon}><PulseIcon /></span>
        <span className={styles.vitalsHeadingText}>Vitals</span>
      </div>
    )}
    <div className={styles.vitalsGrid}>
      <div className={styles.vitalItem}>
        <span className={styles.vitalLabel}>Blood Pressure{showHeading ? ":" : ""}</span>
        <span className={styles.vitalValue}>{vitals.bloodPressure}</span>
      </div>
      <div className={styles.vitalItem}>
        <span className={styles.vitalLabel}>Heart Rate{showHeading ? ":" : ""}</span>
        <span className={styles.vitalValue}>{vitals.heartRate}</span>
      </div>
      <div className={styles.vitalItem}>
        <span className={styles.vitalLabel}>Temperature{showHeading ? ":" : ""}</span>
        <span className={styles.vitalValue}>{vitals.temperature}</span>
      </div>
      <div className={styles.vitalItem}>
        <span className={styles.vitalLabel}>Oxygen Level{showHeading ? ":" : ""}</span>
        <span className={styles.vitalValue}>{vitals.oxygenLevel}</span>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const NurseHistoryPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1>Update History</h1>
        <p className={styles.subtitle}>All patients status updates</p>
      </div>

      {/* ── Desktop layout: outer container wrapping all cards ── */}
      <div className={styles.desktopContainer}>
        {updates.map((entry, i) => (
          <div
            key={entry.id}
            className={`${styles.desktopEntry} ${i < updates.length - 1 ? styles.desktopEntryBorder : ""}`}
          >
            {/* Entry header */}
            <div className={styles.entryHeader}>
              <div className={styles.entryMeta}>
                <span className={styles.entryName}>{entry.patientName}</span>
                <div className={styles.entrySubrow}>
                  <span className={styles.entryMetaIcon}><PersonIcon /></span>
                  <span className={styles.entryBy}>
                    {entry.updatedBy} ({entry.role})
                  </span>
                  <span className={styles.entryDot}>•</span>
                  <span className={styles.entryDate}>{entry.dateTime}</span>
                </div>
              </div>
              <StatusBadge status={entry.status} />
            </div>

            {/* Note */}
            <p className={styles.entryNote}>{entry.note}</p>

            {/* Vitals — desktop style (no heading, label above value) */}
            <VitalsGrid vitals={entry.vitals} showHeading={false} />
          </div>
        ))}
      </div>

      {/* ── Mobile layout: individual cards with Vitals heading + quoted note ── */}
      <div className={styles.mobileList}>
        {updates.map((entry) => (
          <div key={entry.id} className={styles.mobileCard}>
            {/* Card header */}
            <div className={styles.entryHeader}>
              <div>
                <p className={styles.entryName}>{entry.patientName}</p>
                {entry.ward && entry.bed && (
                  <p className={styles.mobileLocation}>{entry.ward} • {entry.bed}</p>
                )}
              </div>
              <StatusBadge status={entry.status} />
            </div>

            {/* Quoted note */}
            <p className={styles.mobileNote}>"{entry.note}"</p>

            {/* Vitals — mobile style (with Vitals heading, label:value stacked) */}
            <VitalsGrid vitals={entry.vitals} showHeading={true} />

            {/* Footer row */}
            <div className={styles.mobileFooter}>
              <span className={styles.mobileFooterItem}>
                <PersonIcon /> {entry.updatedBy}
              </span>
              <span className={styles.mobileFooterItem}>
                <ClockIcon /> {entry.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export { NurseHistoryPage };