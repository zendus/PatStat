"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface VitalForm {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenLevel: string;
}

interface PatientOption {
  id: number;
  name: string;
  ward: string;
  bed: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const patients: PatientOption[] = [
  { id: 1, name: "John Eze",       ward: "ICU - Ward C",      bed: "Bed 17"       },
  { id: 2, name: "Mary Ochieng",   ward: "General Ward B",    bed: "Bed B-08"     },
  { id: 3, name: "Samuel Banda",   ward: "Cardiac Care Unit", bed: "Bed C-03"     },
  { id: 4, name: "Grace Mwangi",   ward: "Maternity Ward",    bed: "Bed M-15"     },
  { id: 5, name: "Adebayo Ade",    ward: "Neurology Ward",    bed: "Bed N-11"     },
  { id: 6, name: "Chukwudi Okafor",ward: "Oncology Ward",     bed: "Bed O-04"     },
  { id: 7, name: "Joke Adesanya",  ward: "VIP Wing",          bed: "Room VIP-01"  },
  { id: 8, name: "Kachi Onyema",   ward: "VIP Wing",          bed: "Room VIP-03"  },
];

const defaultVitals: VitalForm = {
  bloodPressure: "120/80",
  heartRate:     "72",
  temperature:   "37.0",
  oxygenLevel:   "98",
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const VitalSignsPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [vitals, setVitals] = useState<VitalForm>(defaultVitals);
  const [saved, setSaved] = useState(false);

  const handleVitalChange = (field: keyof VitalForm, value: string) => {
    setSaved(false);
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: wire to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1>Vital Signs</h1>
        <p className={styles.subtitle}>Track and record patient vitals</p>
      </div>

      {/* Record Vital Signs card */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Record Vital Signs</h2>

        {/* Select Patient */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Select Patient</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="" disabled>Choose  a Patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.ward} · {p.bed}
                </option>
              ))}
            </select>
            <span className={styles.selectChevron}><ChevronIcon /></span>
          </div>
        </div>

        {/* Vitals 2-col grid */}
        <div className={styles.vitalsGrid}>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Blood Pressure</label>
            <input
              className={styles.fieldInput}
              type="text"
              value={vitals.bloodPressure}
              placeholder="120/80"
              onChange={(e) => handleVitalChange("bloodPressure", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Heart Rate (bpm)</label>
            <input
              className={styles.fieldInput}
              type="text"
              value={vitals.heartRate}
              placeholder="72"
              onChange={(e) => handleVitalChange("heartRate", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Temperature (°C)</label>
            <input
              className={styles.fieldInput}
              type="text"
              value={vitals.temperature}
              placeholder="37.0"
              onChange={(e) => handleVitalChange("temperature", e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Oxygen Level (%)</label>
            <input
              className={styles.fieldInput}
              type="text"
              value={vitals.oxygenLevel}
              placeholder="98"
              onChange={(e) => handleVitalChange("oxygenLevel", e.target.value)}
            />
          </div>

        </div>

        {/* Save button */}
        <button
          className={`${styles.btnSave} ${saved ? styles.btnSaved : ""}`}
          onClick={handleSave}
        >
          <StethoscopeIcon />
          {saved ? "Vitals Saved!" : "Save Vital Signs"}
        </button>

      </div>
    </div>
  );
};

export { VitalSignsPage };