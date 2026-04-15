"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogType = "STATUS UPDATE" | "PATIENT ADMISSION" | "SYSTEM LOG";

interface AuditLog {
  id: number;
  actorName: string;
  actorRole: string; // Doctor, Nurse, Admin
  description: string;
  patientName?: string; // Optional, as some logs might not relate to a specific patient
  timestamp: string; // "9 Feb 2026, 2:30"
  type: LogType;
}

type DateRangeFilter = "Today" | "Last 7 Days" | "Last 30 Days" | "Custom Range";

// ─── Data ─────────────────────────────────────────────────────────────────────

const auditLogs: AuditLog[] = [
  {
    id: 1,
    actorName: "Dr. Tobenna Obi",
    actorRole: "Doctor",
    description: "Updated patient status to Getting Better",
    patientName: "John Eze",
    timestamp: "9 Feb 2026, 2:30",
    type: "STATUS UPDATE",
  },
  {
    id: 2,
    actorName: "Dr. Kwame Mensah",
    actorRole: "Doctor",
    description: "Updated patient status to Stable",
    patientName: "Amina Yusuf",
    timestamp: "9 Feb 2026, 2:15",
    type: "STATUS UPDATE",
  },
  {
    id: 3,
    actorName: "Nurse Chisom Okeke",
    actorRole: "Nurse",
    description: "Updated patient status to Critical",
    patientName: "Samuel Banda",
    timestamp: "9 Feb 2026, 2:10",
    type: "STATUS UPDATE",
  },
  {
    id: 4,
    actorName: "Amara Okafor",
    actorRole: "Admin",
    description: "New patient admitted to Maternity Ward",
    patientName: "Grace Mwangi",
    timestamp: "9 Feb 2026, 2:00",
    type: "PATIENT ADMISSION",
  },
  {
    id: 5,
    actorName: "Nurse Fatima Ibrahim",
    actorRole: "Nurse",
    description: "Updated patient status to Being Monitored",
    patientName: "Adebayo Ade",
    timestamp: "9 Feb 2026, 1:50",
    type: "STATUS UPDATE",
  },
  {
    id: 6,
    actorName: "Nurse Jide Adeleke",
    actorRole: "Nurse",
    description: "Updated patient status to Stable",
    patientName: "Jessica Okpara",
    timestamp: "9 Feb 2026, 1:40",
    type: "STATUS UPDATE",
  },
  {
    id: 7,
    actorName: "Dr. Sarah Abiola",
    actorRole: "Doctor",
    description: "Reviewed patient discharge plan",
    patientName: "Kofi Mensah",
    timestamp: "9 Feb 2026, 1:30",
    type: "STATUS UPDATE",
  },
  {
    id: 8,
    actorName: "System",
    actorRole: "System",
    description: "Database backup initiated",
    timestamp: "9 Feb 2026, 1:20",
    type: "SYSTEM LOG",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const ExportIcon = () => (
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 4.371V12.75H8.25V4.371L5.81775 6.80325L4.75725 5.74275L9 1.5L13.2428 5.74275L12.1823 6.80325L9.75 4.371ZM3 12H4.5V15H13.5V12H15V15C15 15.825 14.325 16.5 13.5 16.5H4.5C3.675 16.5 3 15.7778 3 15V12Z" fill="#414141"/>
</svg>

);

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#015DDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);


// ─── Log Type Badge ───────────────────────────────────────────────────────────

const logTypeClass: Record<LogType, string> = {
  "STATUS UPDATE": styles.badgeGreen,
  "PATIENT ADMISSION": styles.badgeBlue,
  "SYSTEM LOG": styles.badgeGray,
};

const LogTypeBadge: React.FC<{ type: LogType }> = ({ type }) => (
  <span className={`${styles.logBadge} ${logTypeClass[type]}`}>{type}</span>
);


// ─── Main Page ────────────────────────────────────────────────────────────────

const ActivityAuditPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<DateRangeFilter>("Today");

  // In a real application, you'd filter `auditLogs` based on `activeFilter`
  const filteredLogs = auditLogs; // For now, just show all

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Activity & Audit Logs</h1>
          <p className={styles.subtitle}>Complete audit trail of all system activities</p>
        </div>
        <button className={styles.exportLogsBtn}>
          <ExportIcon /> Export Logs
        </button>
      </div>

      {/* Main content container */}
      <div className={styles.mainContent}>

        {/* Date range filters */}
        <div className={styles.dateFilters}>
          {["Today", "Last 7 Days", "Last 30 Days", "Custom Range"].map((filter) => (
            <button
              key={filter}
              className={`${styles.filterButton} ${activeFilter === filter ? styles.activeFilter : ""}`}
              onClick={() => setActiveFilter(filter as DateRangeFilter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Audit Log List */}
        <div className={styles.auditLogList}>
          {filteredLogs.map((log) => (
            <div key={log.id} className={styles.auditLogRow}>
              <div className={styles.logLeft}>
                <div className={styles.logIconWrapper}>
                  <ActivityIcon />
                </div>
                <div className={styles.logDetails}>
                  <p className={styles.actorName}>
                    {log.actorName} <span className={styles.actorRole}>{log.actorRole}</span>
                  </p>
                  <p className={styles.logDescription}>{log.description}</p>
                  {log.patientName && (
                    <p className={styles.patientInfo}>Patient: {log.patientName}</p>
                  )}
                </div>
              </div>
              <div className={styles.logRight}>
                <p className={styles.logTimestamp}>{log.timestamp}</p>
                <LogTypeBadge type={log.type} />
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <p className={styles.emptyText}>No audit logs found for the selected period.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ActivityAuditPage };