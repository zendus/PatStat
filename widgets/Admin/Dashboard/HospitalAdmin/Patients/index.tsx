"use client";

import { useState } from "react";
import styles from "./style.module.css";
import { AdmitPatientModal } from "@/components/layout";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F" | "Other"; // Added 'Other' for gender
  ward: string;
  bed: string;
  status: PatientStatus;
  diagnosis: string;
  doctor?: string; // Added doctor
  nurses?: string[]; // Added nurses
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialPatients: Patient[] = [ // Changed to initialPatients
  { id: 1, name: "Martha Caleb", age: 37, gender: "F", ward: "ICU - Ward A", bed: "Bed 01", status: "Getting Better", diagnosis: "Pneumonia with complications" },
  { id: 2, name: "Ujunwa Ngozi", age: 42, gender: "F", ward: "ICU - Ward A", bed: "Bed 02", status: "Stable", diagnosis: "Acute Respiratory Distress Syndrome" },
  { id: 3, name: "Nkiruka Ozoemena", age: 38, gender: "F", ward: "ICU - Ward C", bed: "Bed 03", status: "Critical", diagnosis: "Post-operative Sepsis Monitoring" },
  { id: 4, name: "Precious Abel", age: 25, gender: "F", ward: "ICU - Ward C", bed: "Bed 04", status: "Being Monitored", diagnosis: "Myocardial Infarction Recovery" },
  { id: 5, name: "Sarah John", age: 35, gender: "F", ward: "ICU - Ward C", bed: "Bed 05", status: "Being Monitored", diagnosis: "Diabetic Ketoacidosis" },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusClass: Record<PatientStatus, string> = {
  "Getting Better": styles.statusBlue,
  "Stable": styles.statusGreen,
  "Being Monitored": styles.statusOrange,
  "Critical": styles.statusRed,
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

const FilterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const PatientManagementPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [allPatients, setAllPatients] = useState<Patient[]>(initialPatients); // State for all patients

  const filtered = allPatients.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ward.toLowerCase().includes(q) ||
      p.bed.toLowerCase().includes(q)
    );
  });

  // Group patients by ward for display, as seen in the screenshot
  const patientsByWard: { [key: string]: Patient[] } = filtered.reduce((acc, patient) => {
    // Extract main ward name, e.g., "ICU" from "ICU - Ward A"
    const wardName = patient.ward.split(' - ')[0]; 
    if (!acc[wardName]) {
      acc[wardName] = [];
    }
    acc[wardName].push(patient);
    return acc;
  }, {} as { [key: string]: Patient[] });

  const handleAdmitSuccess = (patientName: string, ward: string, bed: string, doctor: string, nurses: string[]) => {
    const newPatient: Patient = {
      id: allPatients.length + 1, // Simple ID generation
      name: patientName,
      age: parseInt('0'), // You might want to pass age from modal
      gender: "Other", // You might want to pass gender from modal
      ward: ward,
      bed: bed,
      status: "Being Monitored", // Default status for new admissions
      diagnosis: "Newly admitted", // Default diagnosis
      doctor: doctor,
      nurses: nurses,
    };
    setAllPatients((prev) => [...prev, newPatient]);
  };

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Patient Management</h1>
          <p className={styles.subtitle}>View and manage all patient records</p>
        </div>
        <button className={styles.admitPatientBtn} onClick={() => setIsAdmitModalOpen(true)}>
          <PlusIcon /> Admit Patient
        </button>
      </div>

      {/* Main content container */}
      <div className={styles.mainContent}>

        {/* Search and Filter bar */}
        <div className={styles.searchFilterBar}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}><SearchIcon /></span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search patient by name, ward"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className={styles.filterBtn}>
            <FilterIcon /> Filters
          </button>
        </div>

        {/* Patient list grouped by ward */}
        <div className={styles.patientListGroup}>
          {Object.entries(patientsByWard).map(([wardGroup, patientsInGroup]) => (
            <div key={wardGroup} className={styles.wardGroupContainer}>
              <div className={styles.wardHeader}>
                <h2 className={styles.wardGroupName}>{wardGroup} - Ward A</h2> {/* Adjust as per screenshot */}
                <span className={styles.wardPatientCount}>{patientsInGroup.length} Patients</span>
              </div>
              <div className={styles.patientList}>
                {patientsInGroup.map((p) => (
                  <div key={p.id} className={styles.patientRow}>
                    <div className={styles.patientCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.patientName}>{p.name}</span>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className={styles.patientMeta}>
                        {p.age}y, {p.gender} • {p.ward} • {p.bed}
                      </p>
                      <p className={styles.patientDiagnosis}>{p.diagnosis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}


          {filtered.length === 0 && (
            <p className={styles.emptyText}>No patients match your search.</p>
          )}
        </div>
      </div>

      <AdmitPatientModal
        isOpen={isAdmitModalOpen}
        onClose={() => setIsAdmitModalOpen(false)}
        onAdmitSuccess={handleAdmitSuccess}
      />
    </div>
  );
};

export { PatientManagementPage };