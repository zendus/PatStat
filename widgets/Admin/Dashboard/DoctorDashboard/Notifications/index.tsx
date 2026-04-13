"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertSeverity = "critical" | "warning" | "info";
type TabId = "critical" | "system" | "shift";

interface CriticalAlert {
  id: number;
  severity: AlertSeverity;
  title: string;
  patient: string;
  location: string;
  description: string;
  time: string;
}

interface SystemAlert {
  id: number;
  icon: "shield" | "bell";
  title: string;
  description: string;
  time: string;
}

interface ShiftLog {
  id: number;
  title: string;
  description: string;
  time: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const criticalAlerts: CriticalAlert[] = [
  {
    id: 1,
    severity: "critical",
    title: "Critical Patient Alert",
    patient: "John Eze",
    location: "Bed C-17",
    description:
      "SpO2 levels fell to 89%. Immediate clinical review and respiratory support may be required.",
    time: "30 mins ago",
  },
  {
    id: 2,
    severity: "critical",
    title: "Critical Lab Result",
    patient: "Samuel Banda",
    location: "Cardiac Care Unit-03",
    description:
      "Potassium levels reported at 6.2 mmol/L. High risk of arrhythmia; please review treatment plan immediately.",
    time: "40 mins ago",
  },
  {
    id: 3,
    severity: "warning",
    title: "Patient Status Update Overdue",
    patient: "Mary Ochieng",
    location: "General Ward B-Bed 08",
    description: "Patient has not had status update in over 20 hours",
    time: "40 mins ago",
  },
  {
    id: 4,
    severity: "critical",
    title: "Emergency Flag",
    patient: "Joke Adesanya",
    location: "VIP Wing • Room VIP-01",
    description:
      "SpO2 levels fell to 89%. Immediate clinical review and respiratory support may be required.",
    time: "1hr ago",
  },
];

const systemAlerts: SystemAlert[] = [
  {
    id: 1,
    icon: "shield",
    title: "Security Alert: New Device Login",
    description:
      "Your account was accessed from a new mobile device (iPhone 15). If this wasn't you, reset your credentials immediately.",
    time: "1 hr ago",
  },
  {
    id: 2,
    icon: "bell",
    title: "Privacy Reminder: HIPAA/Data Protection",
    description:
      "You have been active for 4 hours. Please ensure you are not leaving patient data visible on shared terminal screens.",
    time: "2 hrs ago",
  },
];

const shiftLogs: ShiftLog[] = [
  {
    id: 1,
    title: "Night Shift Report — ICU (Ward A)",
    description:
      "Nurse Fatima Ibrahim completed her shift. All patients are stable; 1 new admission recorded at 03:00 AM (Bed A-14).",
    time: "1 hr ago",
  },
  {
    id: 2,
    title: "Rounding Reminder: Ward B",
    description:
      "Morning rounds for General Ward B are scheduled to begin in 15 minutes. Check the patient list for updates.",
    time: "2 hrs ago",
  },
  {
    id: 3,
    title: "Shift Roster Change: Neurology",
    description:
      "Dr. Kwame Mensah will be covering the Night Shift (20:00 - 08:00) in place of Dr. T. Obi.",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title: "Weekend Rotation Summary: VIP Wing",
    description:
      "Summary of the last 48 hours for VIP Room 01 to 08 is now available for review by the incoming consultant.",
    time: "2 hrs ago",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const TriangleAlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const CriticalAlertCard: React.FC<{ alert: CriticalAlert }> = ({ alert }) => {
  const isCritical = alert.severity === "critical";
  const severityClass = isCritical ? styles.critical : styles.warning;

  return (
    <div className={`${styles.card} ${severityClass}`}>
      <div className={styles.cardHeader}>
        <div className={`${styles.iconWrap} ${severityClass}`}>
          {isCritical ? <TriangleAlertIcon /> : <ClockIcon />}
        </div>
        <span className={styles.cardTitle}>{alert.title}</span>
        <span className={styles.cardTime}>{alert.time}</span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.patientName}>
          {alert.patient}{" "}
          <span className={styles.patientLocation}>({alert.location})</span>
        </p>
        <p className={styles.cardDesc}>{alert.description}</p>
      </div>
    </div>
  );
};

const SystemAlertCard: React.FC<{ alert: SystemAlert }> = ({ alert }) => (
  <div className={`${styles.card} ${styles.system}`}>
    <div className={styles.cardHeader}>
      <div className={`${styles.iconWrap} ${styles.system}`}>
        {alert.icon === "shield" ? <ShieldIcon /> : <BellIcon />}
      </div>
      <span className={styles.cardTitle}>{alert.title}</span>
      <span className={styles.cardTime}>{alert.time}</span>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.cardDesc}>{alert.description}</p>
    </div>
  </div>
);

const ShiftLogCard: React.FC<{ log: ShiftLog }> = ({ log }) => (
  <div className={`${styles.card} ${styles.shift}`}>
    <div className={styles.cardHeader}>
      <div className={`${styles.iconWrap} ${styles.shift}`}>
        <BellIcon />
      </div>
      <span className={styles.cardTitle}>{log.title}</span>
      <span className={styles.cardTime}>{log.time}</span>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.cardDesc}>{log.description}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const tabs: { id: TabId; label: string }[] = [
  { id: "critical", label: "Critical Alerts" },
  { id: "system", label: "System Alerts" },
  { id: "shift", label: "Shift Logs" },
];

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("critical");

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Notifications</h1>
          <p className={styles.subtitle}>System alerts and updates</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.list} key={activeTab}>
        {activeTab === "critical" &&
          criticalAlerts.map((alert) => (
            <CriticalAlertCard key={alert.id} alert={alert} />
          ))}

        {activeTab === "system" &&
          systemAlerts.map((alert) => (
            <SystemAlertCard key={alert.id} alert={alert} />
          ))}

        {activeTab === "shift" &&
          shiftLogs.map((log) => (
            <ShiftLogCard key={log.id} log={log} />
          ))}
      </div>
    </div>
  );
};

export { NotificationsPage };