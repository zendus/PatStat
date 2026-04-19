"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

// Reusing icons from existing codebase or defining new ones if needed
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#646363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// DropdownSelect Component (will be in its own file later)
interface DropdownSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiSelect?: boolean;
  required?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  multiSelect = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptions = Array.isArray(value)
    ? options.filter((opt) => value.includes(opt.value))
    : options.find((opt) => opt.value === value);

  const displayValue = Array.isArray(selectedOptions)
    ? selectedOptions.map((opt) => opt.label).join(", ")
    : selectedOptions?.label || "";

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter((val) => val !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>
        {label}
        {required && <span className={styles.requiredStar}>*</span>}
      </label>
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={`${styles.formSelect} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {displayValue || placeholder}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {isOpen && (
          <ul className={styles.dropdownMenu} role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={
                  multiSelect
                    ? Array.isArray(value) && value.includes(option.value)
                    : value === option.value
                }
                onClick={() => handleSelect(option.value)}
                className={
                  (multiSelect && Array.isArray(value) && value.includes(option.value)) ||
                  (!multiSelect && value === option.value)
                    ? styles.selectedOption
                    : ""
                }
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


interface AdmitPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdmitSuccess?: (patientName: string, ward: string, bed: string, doctor: string, nurses: string[]) => void;
}

const AdmitPatientModal: React.FC<AdmitPatientModalProps> = ({ isOpen, onClose, onAdmitSuccess }) => {
  const [stage, setStage] = useState<"form" | "success">("form");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ward, setWard] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [patientDiagnosis, setPatientDiagnosis] = useState("");
  const [primaryDoctor, setPrimaryDoctor] = useState("");
  const [assignedNurses, setAssignedNurses] = useState<string[]>([]);

  // Sample data for dropdowns
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const wardOptions = [
    { value: "icu-a", label: "ICU - Ward A" },
    { value: "icu-b", label: "ICU - Ward B" },
    { value: "icu-c", label: "ICU - Ward C" },
    { value: "general-a", label: "General Ward A" },
  ];

  const doctorOptions = [
    { value: "dr-kwame-mensah", label: "Dr. Kwame Mensah" },
    { value: "dr-adanna-ejike", label: "Dr. Adanna Ejike" },
    { value: "dr-chinedu-okoro", label: "Dr. Chinedu Okoro" },
  ];

  const nurseOptions = [
    { value: "nurse-chisom-okeke", label: "Nurse Chisom Okeke" },
    { value: "nurse-jide-adeleke", label: "Nurse Jide Adeleke" },
    { value: "nurse-amina-garba", label: "Nurse Amina Garba" },
    { value: "nurse-tola-olamide", label: "Nurse Tola Olamide" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to an API
    console.log({ fullName, age, gender, ward, bedNumber, patientDiagnosis, primaryDoctor, assignedNurses });
    setStage("success");
    if (onAdmitSuccess) {
      onAdmitSuccess(fullName, ward, bedNumber, primaryDoctor, assignedNurses);
    }
  };

  const handleCloseModal = () => {
    setStage("form"); // Reset stage for next time modal opens
    setFullName("");
    setAge("");
    setGender("");
    setWard("");
    setBedNumber("");
    setPatientDiagnosis("");
    setPrimaryDoctor("");
    setAssignedNurses([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {stage === "form" && (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <UserIcon />
                <h2 className={styles.modalTitle}>Admit New Patient</h2>
              </div>
              <button className={styles.closeButton} onClick={handleCloseModal} aria-label="Close modal">
                <XIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.formLabel}>Full Name<span className={styles.requiredStar}>*</span></label>
                  <input
                    type="text"
                    id="fullName"
                    className={styles.formInput}
                    placeholder="John Oko"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age" className={styles.formLabel}>Age<span className={styles.requiredStar}>*</span></label>
                  <input
                    type="number"
                    id="age"
                    className={styles.formInput}
                    placeholder="45"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
              </div>

              <DropdownSelect
                label="Gender"
                options={genderOptions}
                value={gender}
                onChange={setGender}
                placeholder="Select gender..."
                required
              />

              <div className={styles.formRow}>
                <DropdownSelect
                  label="Ward/Department"
                  options={wardOptions}
                  value={ward}
                  onChange={setWard}
                  placeholder="Select ward..."
                  required
                />
                <div className={styles.formGroup}>
                  <label htmlFor="bedNumber" className={styles.formLabel}>Bed Number<span className={styles.requiredStar}>*</span></label>
                  <input
                    type="text"
                    id="bedNumber"
                    className={styles.formInput}
                    placeholder="A-12"
                    value={bedNumber}
                    onChange={(e) => setBedNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="patientDiagnosis" className={styles.formLabel}>Patient</label>
                <textarea
                  id="patientDiagnosis"
                  className={`${styles.formInput} ${styles.textarea}`}
                  placeholder="Patient presenting symptoms and initial diagnosis..."
                  rows={3}
                  value={patientDiagnosis}
                  onChange={(e) => setPatientDiagnosis(e.target.value)}
                ></textarea>
              </div>

              <DropdownSelect
                label="Assign Primary Doctor"
                options={doctorOptions}
                value={primaryDoctor}
                onChange={setPrimaryDoctor}
                placeholder="Select doctor..."
                required
              />

              <DropdownSelect
                label="Assign Nurses (select one or more)"
                options={nurseOptions}
                value={assignedNurses}
                onChange={setAssignedNurses}
                placeholder="Select nurses..."
                multiSelect
                required
              />

              <div className={styles.infoBox}>
                <InfoIcon />
                <p>After admission, the care team will be notified and can begin updating the patient's status.</p>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.sendInvitationBtn}>
                  <SendIcon /> Send Invitation
                </button>
              </div>
            </form>
          </>
        )}

        {stage === "success" && (
          <div className={styles.successScreen}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <UserIcon />
                <h2 className={styles.modalTitle}>Admit New Patient</h2>
              </div>
              <button className={styles.closeButton} onClick={handleCloseModal} aria-label="Close modal">
                <XIcon />
              </button>
            </div>
            <div className={styles.successContent}>
              <div className={styles.checkCircle}>
                <CheckCircleIcon />
              </div>
              <h3 className={styles.successMessage}>Patient Admitted Successfully!</h3>
              <p className={styles.admissionDetails}>
                Adanna Johnson has been admitted to ICU -Ward A, Bed 05
              </p>

              <div className={styles.careTeamAssigned}>
                <h4 className={styles.careTeamTitle}>Care Team Assigned:</h4>
                <p>Doctor: Dr. Kwame Mensah</p>
                <p>Nurses: Nurse Chisom Okeke, Nurse Jide Adeleke</p>
              </div>

              <button className={styles.doneBtn} onClick={handleCloseModal}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { AdmitPatientModal };