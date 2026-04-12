"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

interface HandoverPatient {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
  ward: string;
  bed: string;
  status: PatientStatus;
  diagnosis: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const handoverPatients: HandoverPatient[] = [
  {
    id: 1,
    name: "John Eze",
    age: 45,
    gender: "M",
    ward: "ICU - Ward C",
    bed: "Bed 17",
    status: "Getting Better",
    diagnosis: "Pneumonia with complications",
  },
  {
    id: 2,
    name: "Mary Ochieng",
    age: 32,
    gender: "F",
    ward: "General Ward B",
    bed: "Bed B-08",
    status: "Stable",
    diagnosis: "Post-surgical recovery (Appendectomy)",
  },
  {
    id: 3,
    name: "Samuel Banda",
    age: 37,
    gender: "M",
    ward: "Cardiac Care Unit",
    bed: "Bed C-03",
    status: "Being Monitored",
    diagnosis: "Cardiac arrhythmia",
  },
  {
    id: 4,
    name: "Adebayo Ade",
    age: 41,
    gender: "M",
    ward: "Neurology Ward",
    bed: "Bed N-11",
    status: "Stable",
    diagnosis: "Post-stroke rehabilitation",
  },
  {
    id: 5,
    name: "Grace Mwangi",
    age: 28,
    gender: "F",
    ward: "Maternity Ward",
    bed: "Bed M-15",
    status: "Getting Better",
    diagnosis: "Post-delivery monitoring",
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

const NoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ShiftHandoverPage: React.FC = () => {
  const [handoverNote, setHandoverNote] = useState("");

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1>Shift Handover</h1>
        <p className={styles.subtitle}>Prepare handover notes for incoming doctors</p>
      </div>

      {/* Create Handover Summary card */}
      <div className={styles.summaryCard}>
        <h2 className={styles.cardTitle}>Create Handover Summary</h2>
        <textarea
          className={styles.textarea}
          placeholder="Key points for incoming doctor: patient updates, pending tasks, concerns..."
          value={handoverNote}
          onChange={(e) => setHandoverNote(e.target.value)}
          rows={4}
        />
        <button className={styles.btnSubmit}>
          <NoteIcon />
          Submit Handover Notes
        </button>
      </div>

      {/* Recent Clinical Notes card */}
      <div className={styles.recentCard}>
        <h2 className={styles.cardTitle}>Recent Clinical Notes</h2>

        <div className={styles.patientList}>
          {handoverPatients.map((p) => (
            <div key={p.id} className={styles.patientEntry}>
              {/* Name + badge row */}
              <div className={styles.patientEntryHeader}>
                <span className={styles.patientName}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>

              {/* Age / gender / ward / bed */}
              <p className={styles.patientMeta}>
                {p.age}y, {p.gender} • {p.ward} • {p.bed}
              </p>

              {/* Diagnosis */}
              <p className={styles.patientDiagnosis}>{p.diagnosis}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export { ShiftHandoverPage };