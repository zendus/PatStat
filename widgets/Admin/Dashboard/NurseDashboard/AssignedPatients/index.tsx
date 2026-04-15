"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

interface Patient {
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

const allPatients: Patient[] = [
  { id: 1, name: "John Eze",      age: 45, gender: "M", ward: "ICU - Ward C",      bed: "Bed 17",   status: "Getting Better",  diagnosis: "Pneumonia with complications"          },
  { id: 2, name: "Mary Ochieng",  age: 32, gender: "F", ward: "General Ward B",    bed: "Bed B-08", status: "Stable",          diagnosis: "Post-surgical recovery (Appendectomy)" },
  { id: 3, name: "Samuel Banda",  age: 37, gender: "M", ward: "Cardiac Care Unit", bed: "Bed C-03", status: "Being Monitored", diagnosis: "Cardiac arrhythmia"                    },
  { id: 4, name: "Grace Mwangi",  age: 28, gender: "F", ward: "Maternity Ward",    bed: "Bed M-15", status: "Getting Better",  diagnosis: "Post-delivery observation"             },
  { id: 5, name: "Adebayo Ade",   age: 41, gender: "M", ward: "Neurology Ward",    bed: "Bed N-11", status: "Stable",          diagnosis: "Seizure management and monitoring"     },
  { id: 6, name: "Chukwudi Okafor",age: 55,gender: "M", ward: "Oncology Ward",     bed: "Bed O-04", status: "Getting Better",  diagnosis: "Post-chemotherapy monitoring"          },
  { id: 7, name: "Joke Adesanya", age: 62, gender: "F", ward: "VIP Wing",          bed: "Room VIP-01", status: "Being Monitored", diagnosis: "Hypertensive crisis observation"   },
  { id: 8, name: "Kachi Onyema",  age: 34, gender: "M", ward: "VIP Wing",          bed: "Room VIP-03", status: "Stable",          diagnosis: "Diabetes management"              },
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

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const AssignedPatientPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = allPatients.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ward.toLowerCase().includes(q) ||
      p.bed.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1>My Patients</h1>
        <p className={styles.subtitle}>Managing {allPatients.length} Patients</p>
      </div>

      {/* Outer container */}
      <div className={styles.outerContainer}>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search patient name, ID, ward"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Patient rows */}
        <div className={styles.patientList}>
          {filtered.map((p) => (
            <div key={p.id} className={styles.patientRow}>

              {/* Inner patient card */}
              <div className={styles.patientCard}>
                {/* Name + badge */}
                <div className={styles.cardHeader}>
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

              {/* Update button — outside the card, to the right */}
              <button className={styles.btnUpdate}>
                <PlusIcon /> Update
              </button>

            </div>
          ))}

          {filtered.length === 0 && (
            <p className={styles.emptyText}>No patients match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { AssignedPatientPage };