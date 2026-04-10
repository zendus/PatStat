"use client";

import { useState } from "react";
import styles from "./style.module.css"; // Reuse dashboard styles for consistency

// ─── Types (from Dashboard, extended for PatientPage) ──────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
  location: string; // e.g., "ICU - Ward C • Bed 17"
  status: PatientStatus;
  description: string; // e.g., "Pneumonia with complications"
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const allPatients: Patient[] = [
  {
    id: 1,
    name: "John Eze",
    age: 45,
    gender: "M",
    location: "ICU - Ward C • Bed 17",
    status: "Getting Better",
    description: "Pneumonia with complications",
  },
  {
    id: 2,
    name: "Mary Ochieng",
    age: 32,
    gender: "F",
    location: "General Ward B • Bed B-08",
    status: "Stable",
    description: "Post-surgical recovery (Appendectomy)",
  },
  {
    id: 3,
    name: "Samuel Banda",
    age: 37,
    gender: "M",
    location: "Cardiac Care Unit • Bed C-03",
    status: "Being Monitored",
    description: "Cardiac arrhythmia",
  },
  {
    id: 4,
    name: "Grace Mwangi",
    age: 28,
    gender: "F",
    location: "Maternity Ward • Bed M-15",
    status: "Getting Better",
    description: "Post-delivery observation",
  },
  {
    id: 5,
    name: "Adebayo Ade",
    age: 41,
    gender: "M",
    location: "Neurology Ward • Bed N-11",
    status: "Stable",
    description: "Seizure management and monitoring",
  },
  {
    id: 6,
    name: "Kemi Ojo",
    age: 55,
    gender: "F",
    location: "Oncology Ward • Bed O-02",
    status: "Being Monitored",
    description: "Chemotherapy side effect management",
  },
  {
    id: 7,
    name: "David Obi",
    age: 68,
    gender: "M",
    location: "Geriatric Ward • Bed G-05",
    status: "Critical",
    description: "Acute kidney injury",
  },
  {
    id: 8,
    name: "Fatima Yusuf",
    age: 24,
    gender: "F",
    location: "Surgical Ward A • Bed S-10",
    status: "Getting Better",
    description: "Post-op wound care",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ─── Helpers (reusing from Dashboard for consistency) ──────────────────────────

const statusClass: Record<PatientStatus, string> = {
  "Getting Better":  styles.statusBlue,
  "Stable":          styles.statusGreen,
  "Being Monitored": styles.statusOrange,
  "Critical":        styles.statusRed,
};

const StatusBadge: React.FC<{ status: PatientStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${statusClass[status]}`}>{status}</span>
);

// ─── Main PatientPage Component ───────────────────────────────────────────────

const PatientPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = allPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toString().includes(searchTerm)
  );

  return (
    <div className={styles.patientWrapper}>
      <div className={styles.patientHeader}>
        <h1>My Patients</h1>
        <p className={styles.patientSubtitle}>Managing {allPatients.length} Patients</p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search patient name, ID, ward"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient List */}
      <div className={styles.patientList}>
        {filteredPatients.map((patient) => (
          <div key={patient.id} className={styles.patientCard}>
            <div className={styles.patientInfo}>
              <div className={styles.patientNameHeader}>
                <p className={styles.patientCardName}>{patient.name}</p>
                <StatusBadge status={patient.status} />
              </div>
              <p className={styles.patientDetails}>
                {patient.age}y, {patient.gender} • {patient.location}
              </p>
              <p className={styles.patientDescription}>{patient.description}</p>
            </div>
            <button className={styles.updatePatientButton}>
              + Update
            </button>
          </div>
        ))}

        {filteredPatients.length === 0 && (
          <div className={styles.noPatientsFound}>
            <p>No patients found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { PatientPage };