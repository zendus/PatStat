"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical" | "Discharged";
type TabId = "all" | "critical" | "needs-attention";

interface Patient {
  id: number;
  name: string;
  ward: string;
  bed: string;
  status: PatientStatus;
  lastUpdateAgo: string;
  needsAttention: boolean;
  isCritical: boolean;
}

interface StatusOption {
  value: PatientStatus;
  label: string;
  description: string;
}

interface ModalState {
  open: boolean;
  patient: Patient | null;
}

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenLevel: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const patients: Patient[] = [
  { id: 1, name: "John Eze",       ward: "ICU - Ward C",       bed: "Bed 17",       status: "Getting Better",  lastUpdateAgo: "20h ago", needsAttention: true,  isCritical: false },
  { id: 2, name: "Mary Ochieng",   ward: "General Ward B",     bed: "Bed B-08",     status: "Stable",          lastUpdateAgo: "21h ago", needsAttention: true,  isCritical: false },
  { id: 3, name: "Samuel Banda",   ward: "Cardiac Care Unit",  bed: "Bed C-03",     status: "Being Monitored", lastUpdateAgo: "23h ago", needsAttention: true,  isCritical: false },
  { id: 4, name: "Grace Mwangi",   ward: "Maternity Ward",     bed: "Bed M-15",     status: "Getting Better",  lastUpdateAgo: "5h ago",  needsAttention: false, isCritical: false },
  { id: 5, name: "Adebayo Ade",    ward: "Neurology Ward",     bed: "Bed N-11",     status: "Stable",          lastUpdateAgo: "3h ago",  needsAttention: false, isCritical: false },
  { id: 6, name: "Chukwudi Okafor",ward: "Oncology Ward",      bed: "Bed O-04",     status: "Getting Better",  lastUpdateAgo: "6h ago",  needsAttention: false, isCritical: false },
  { id: 7, name: "Joke Adesanya",  ward: "VIP Wing",           bed: "Room VIP-01",  status: "Being Monitored", lastUpdateAgo: "23h ago", needsAttention: true,  isCritical: false },
  { id: 8, name: "Kachi Onyema",   ward: "VIP Wing",           bed: "Room VIP-03",  status: "Being Monitored", lastUpdateAgo: "4h ago",  needsAttention: false, isCritical: false },
];

const statusOptions: StatusOption[] = [
  { value: "Stable",          label: "Stable",          description: "Patient condition is stable and improving as expected." },
  { value: "Being Monitored", label: "Being Monitored", description: "Care team is closely monitoring patient progress."      },
  { value: "Critical",        label: "Critical",        description: "Patient requires intensive medical attention."           },
  { value: "Getting Better",  label: "Getting Better",  description: "Patient showing positive signs of recovery."            },
  { value: "Discharged",      label: "Discharged",      description: "Patient has been discharged and released."              },
];

const tabs: { id: TabId; label: string; count: (p: Patient[]) => number }[] = [
  { id: "all",             label: "All Patients",   count: (p) => p.length },
  { id: "critical",        label: "Critical",        count: (p) => p.filter(x => x.isCritical).length },
  { id: "needs-attention", label: "Needs Attention", count: (p) => p.filter(x => x.needsAttention).length },
];

// ─── Status dot colour ────────────────────────────────────────────────────────

const statusDotClass: Record<PatientStatus, string> = {
  "Getting Better":  styles.dotBlue,
  "Stable":          styles.dotGreen,
  "Being Monitored": styles.dotOrange,
  "Critical":        styles.dotRed,
  "Discharged":      styles.dotGray,
};

const statusTextClass: Record<PatientStatus, string> = {
  "Getting Better":  styles.statusTextBlue,
  "Stable":          styles.statusTextGreen,
  "Being Monitored": styles.statusTextOrange,
  "Critical":        styles.statusTextRed,
  "Discharged":      styles.statusTextGray,
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TriangleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ─── Update Modal ─────────────────────────────────────────────────────────────

const UpdateModal: React.FC<{ patient: Patient; onClose: () => void }> = ({ patient, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState<PatientStatus>("Stable");
  const [notes, setNotes] = useState("");
  const [emergencyFlag, setEmergencyFlag] = useState(false);
  const [vitals, setVitals] = useState<VitalSigns>({
    bloodPressure: "120/80",
    heartRate: "72",
    temperature: "37.2",
    oxygenLevel: "98",
  });

  const handleVitalChange = (field: keyof VitalSigns, value: string) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Modal header */}
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Update Patient Status</h2>
            <p className={styles.modalSubtitle}>Patient: {patient.name}</p>
          </div>
          <button className={styles.modalClose} onClick={onClose} title="Close modal"><CloseIcon /></button>
        </div>

        {/* Status selector */}
        <div className={styles.modalSection}>
          <p className={styles.modalSectionLabel}>Patient Status</p>
          <div className={styles.statusGrid}>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                className={`${styles.statusOption} ${selectedStatus === opt.value ? styles.statusOptionActive : ""}`}
                onClick={() => setSelectedStatus(opt.value)}
              >
                <span className={styles.statusOptionLabel}>{opt.label}</span>
                <span className={styles.statusOptionDesc}>{opt.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clinical Notes */}
        <div className={styles.modalSection}>
          <p className={styles.modalSectionLabel}>Clinical Notes</p>
          <textarea
            className={styles.textarea}
            placeholder="Brief update on patient condition, observations, or care instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
          <p className={styles.textareaHint}>Keep it concise and clear for the care team</p>
        </div>

        {/* Vital Signs */}
        <div className={styles.modalSection}>
          <p className={styles.modalSectionLabel}>Vital Signs</p>
          <div className={styles.vitalsInputGrid}>
            <div className={styles.vitalInputGroup}>
              <label className={styles.vitalInputLabel}>Blood Pressure</label>
              <input
                className={styles.vitalInput}
                value={vitals.bloodPressure}
                onChange={(e) => handleVitalChange("bloodPressure", e.target.value)}
              />
            </div>
            <div className={styles.vitalInputGroup}>
              <label className={styles.vitalInputLabel}>Heart Rate (bpm)</label>
              <input
                className={styles.vitalInput}
                value={vitals.heartRate}
                onChange={(e) => handleVitalChange("heartRate", e.target.value)}
              />
            </div>
            <div className={styles.vitalInputGroup}>
              <label className={styles.vitalInputLabel}>Temperature (°C)</label>
              <input
                className={styles.vitalInput}
                value={vitals.temperature}
                onChange={(e) => handleVitalChange("temperature", e.target.value)}
              />
            </div>
            <div className={styles.vitalInputGroup}>
              <label className={styles.vitalInputLabel}>Oxygen Level (%)</label>
              <input
                className={styles.vitalInput}
                value={vitals.oxygenLevel}
                onChange={(e) => handleVitalChange("oxygenLevel", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Emergency Flag */}
        <div className={styles.emergencyRow}>
          <span className={styles.emergencyIcon}><TriangleIcon /></span>
          <div className={styles.emergencyText}>
            <p className={styles.emergencyLabel}>Emergency Flag</p>
            <p className={styles.emergencyDesc}>Mark this update as requiring urgent attention.</p>
          </div>
          <button
            className={`${styles.toggle} ${emergencyFlag ? styles.toggleOn : ""}`}
            onClick={() => setEmergencyFlag((v) => !v)}
            aria-label="Toggle emergency flag"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        {/* Actions */}
        <div className={styles.modalActions}>
          <button className={styles.btnSubmit}>Submit Update</button>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const NurseQuickUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [modal, setModal] = useState<ModalState>({ open: false, patient: null });

  const openModal = (patient: Patient) => setModal({ open: true, patient });
  const closeModal = () => setModal({ open: false, patient: null });

  const filteredPatients = patients.filter((p) => {
    if (activeTab === "critical")        return p.isCritical;
    if (activeTab === "needs-attention") return p.needsAttention;
    return true;
  });

  const isNeedsAttentionTab = activeTab === "needs-attention";

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1>Quick Status Update</h1>
        <p className={styles.subtitle}>Fast access to update all patients</p>
      </div>

      {/* Tabs */}
      {/* <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count(patients)})
          </button>
        ))}
      </div> */}

      {/* ── All Patients / Critical: 3-col card grid ── */}
      {!isNeedsAttentionTab && (
        filteredPatients.length === 0 ? (
          <div className={styles.emptyState} />
        ) : (
          <div className={styles.cardGrid}>
            {filteredPatients.map((p) => (
              <div key={p.id} className={styles.patientCard}>
                <p className={styles.cardName}>{p.name}</p>
                <p className={styles.cardLocation}>{p.ward} • {p.bed}</p>
                <div className={styles.cardStatus}>
                  <span className={`${styles.dot} ${statusDotClass[p.status]}`} />
                  <span className={`${styles.statusText} ${statusTextClass[p.status]}`}>{p.status}</span>
                </div>
                <div className={styles.cardActions}>
                  {/* <button className={styles.btnView} title={`View ${p.name}`}>View</button> */}
                  <button className={styles.btnUpdateBlue} onClick={() => openModal(p)} title={`Update ${p.name}`}>
                    {/* <PlusIcon />  */}
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Needs Attention: outer container list ── */}
      {isNeedsAttentionTab && (
        filteredPatients.length === 0 ? (
          <div className={styles.emptyState} />
        ) : (
          <div className={styles.attentionContainer}>
            {filteredPatients.map((p, i) => (
              <div
                key={p.id}
                className={`${styles.attentionRow} ${i < filteredPatients.length - 1 ? styles.attentionRowBorder : ""}`}
              >
                <div>
                  <p className={styles.attentionName}>{p.name}</p>
                  <p className={styles.attentionLocation}>{p.ward} · {p.bed}</p>
                  <p className={styles.attentionTime}>Last update {p.lastUpdateAgo}</p>
                </div>
                <button className={styles.btnUpdateDark} onClick={() => openModal(p)} title={`Update ${p.name}`}>Update</button>
              </div>
            ))}
          </div>
        )
      )}

      {/* Modal */}
      {modal.open && modal.patient && (
        <UpdateModal patient={modal.patient} onClose={closeModal} />
      )}
    </div>
  );
};

export { NurseQuickUpdate };