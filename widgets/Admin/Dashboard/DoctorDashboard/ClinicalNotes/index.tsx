"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NoteEntry {
  id: number;
  author: string;
  role: "doctor" | "nurse";
  timeAgo: string;
  text: string;
}

interface PatientNotes {
  id: number;
  name: string;
  ward: string;
  bed: string;
  notes: NoteEntry[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const patientNotesList: PatientNotes[] = [
  {
    id: 1,
    name: "John Eze",
    ward: "ICU - Ward C",
    bed: "Bed 17",
    notes: [
      {
        id: 1,
        author: "Dr. Tobenna Obi",
        role: "doctor",
        timeAgo: "10h ago",
        text: "Patient showing significant improvement. Oxygen saturation stable at 95%. Reduced fever. Continue current medication.",
      },
      {
        id: 2,
        author: "Nurse Chisom Okeke",
        role: "nurse",
        timeAgo: "1d ago",
        text: "Night shift update: Patient rested well. Minimal coughing. Vitals stable.",
      },
    ],
  },
  {
    id: 2,
    name: "Mary Ochieng",
    ward: "General Ward B",
    bed: "Bed B-08",
    notes: [
      {
        id: 3,
        author: "Nurse Chisom Okeke",
        role: "nurse",
        timeAgo: "12h ago",
        text: "Recovery progressing well. Patient mobile and eating normally. Pain management effective.",
      },
      {
        id: 4,
        author: "Nurse Jide Adeleke",
        role: "nurse",
        timeAgo: "1d ago",
        text: "Night shift update: Patient rested well. Minimal coughing. Vitals stable.",
      },
    ],
  },
  {
    id: 3,
    name: "Samuel Banda",
    ward: "Cardiac Care Unit",
    bed: "Bed C-03",
    notes: [
      {
        id: 5,
        author: "Dr. Tobenna Obi",
        role: "doctor",
        timeAgo: "5d ago",
        text: "Heart rhythm showing improvement. Continue monitoring. ECG scheduled for tomorrow.",
      },
    ],
  },
  {
    id: 4,
    name: "Joke Adesanya",
    ward: "VIP Wing",
    bed: "Room VIP-01",
    notes: [
      {
        id: 6,
        author: "Dr. Tobenna Obi",
        role: "doctor",
        timeAgo: "5d ago",
        text: "Patient showing significant improvement. Oxygen saturation stable at 95%. Reduced fever. Continue current medication.",
      },
    ],
  },
];

// Recent notes for desktop list (flat, sorted by recency)
const recentNotes = [
  { id: 1, patientName: "John Eze",      timeAgo: "4d ago", text: "Patient showing significant improvement. Oxygen saturation stable at 95%. Reduced fever. Continue current medication." },
  { id: 2, patientName: "Samuel Banda",  timeAgo: "5d ago", text: "Heart rhythm showing improvement. Continue monitoring. ECG scheduled for tomorrow." },
  { id: 3, patientName: "Joke Adesanya", timeAgo: "5d ago", text: "Patient showing significant improvement. Oxygen saturation stable at 95%. Reduced fever. Continue current medication." },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const NoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PersonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ClinicalNotesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [noteText, setNoteText] = useState("");

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1>Clinical Notes</h1>
        <p className={styles.subtitle}>Detailed patient observations and care notes</p>
      </div>

      {/* ── Desktop layout ── */}
      <div className={styles.desktopLayout}>

        {/* Add New Clinical Note card */}
        <div className={styles.desktopCard}>
          <h2 className={styles.cardTitle}>Add New Clinical Note</h2>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Select Patient</label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
              >
                <option value="" disabled>Choose  a Patient</option>
                {patientNotesList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <span className={styles.selectChevron}><ChevronIcon /></span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Clinical Notes</label>
            <textarea
              className={styles.textarea}
              placeholder="Detailed observation, diagnosis notes, treatment plans..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
            />
          </div>

          <button className={styles.btnSave}>
            <NoteIcon />
            Save Clinical Note
          </button>
        </div>

        {/* Recent Clinical Notes card */}
        <div className={styles.desktopCard}>
          <h2 className={styles.cardTitle}>Recent Clinical Notes</h2>
          <div className={styles.recentList}>
            {recentNotes.map((note) => (
              <div key={note.id} className={styles.recentEntry}>
                <div className={styles.recentEntryAccent} />
                <div className={styles.recentEntryContent}>
                  <div className={styles.recentEntryHeader}>
                    <span className={styles.recentPatientName}>{note.patientName}</span>
                    <span className={styles.recentTime}>{note.timeAgo}</span>
                  </div>
                  <p className={styles.recentNoteText}>{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile layout: per-patient cards ── */}
      <div className={styles.mobileLayout}>
        {patientNotesList.map((patient) => (
          <div key={patient.id} className={styles.mobileCard}>

            {/* Patient header */}
            <div className={styles.mobileCardHeader}>
              <p className={styles.mobilePatientName}>{patient.name}</p>
              <p className={styles.mobilePatientLocation}>{patient.ward} • {patient.bed}</p>
            </div>

            {/* Note bubbles */}
            <div className={styles.noteBubbleList}>
              {patient.notes.map((note) => (
                <div key={note.id} className={styles.noteBubble}>
                  <p className={styles.noteBubbleText}>"{note.text}"</p>
                  <div className={styles.noteBubbleFooter}>
                    <span className={styles.noteBubbleMeta}>
                      <PersonIcon /> {note.author}
                    </span>
                    <span className={styles.noteBubbleMeta}>
                      <ClockIcon /> {note.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Note button */}
            <button className={styles.btnAddNote}>
              <NoteIcon />
              Add Note
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export { ClinicalNotesPage };