"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

const StaffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#646363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

// Reuse DropdownSelect from AdmitPatientModal — or paste it here if separate file
interface DropdownSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label, 
  options, 
  value, 
  onChange, 
  placeholder, 
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>
        {label}
        {required && <span className={styles.requiredStar}>*</span>}
      </label>
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={`${styles.formSelect} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selected?.label || placeholder}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {isOpen && (
          <ul className={styles.dropdownMenu} role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className={value === option.value ? styles.selectedOption : ""}
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface InviteStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess?: (staffName: string, email: string, role: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

const InviteStaffModal: React.FC<InviteStaffModalProps> = ({ isOpen, onClose, onInviteSuccess }) => {
  const [stage, setStage] = useState<"form" | "success">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const roleOptions = [
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Nurse" },
    { value: "admin", label: "Admin" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "lab-technician", label: "Lab Technician" },
  ];

  const inviteLink = `https://pat-stat.com/staff/join/${inviteCode}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateCode();
    setInviteCode(code);
    setStage("success");
    if (onInviteSuccess) onInviteSuccess(fullName, email, role);
  };

  const handleCopy = (text: string, type: "link" | "code") => {
    navigator.clipboard.writeText(text).catch(() => {});
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleClose = () => {
    setStage("form");
    setFullName("");
    setEmail("");
    setRole("");
    setInviteCode("");
    setCopiedLink(false);
    setCopiedCode(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>

        {/* ── Header (shared) ─────────────────────────────────────── */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <StaffIcon />
            <h2 className={styles.modalTitle}>Invite Staff Member</h2>
          </div>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close modal">
            <XIcon />
          </button>
        </div>

        {/* ── Stage: Form ─────────────────────────────────────────── */}
        {stage === "form" && (
          <form onSubmit={handleSubmit} className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="staffFullName" className={styles.formLabel}>
                Full Name<span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                id="staffFullName"
                className={styles.formInput}
                placeholder="Dr. Tobenna Obi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="staffEmail" className={styles.formLabel}>
                Email Address<span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="email"
                id="staffEmail"
                className={styles.formInput}
                placeholder="tobenna.obi@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <DropdownSelect
              label="Role"
              options={roleOptions}
              value={role}
              onChange={setRole}
              placeholder="Select role..."
              required
            />

            <div className={styles.infoBox}>
              <InfoIcon />
              <p>An invitation email will be sent with a secure access code and setup instructions.</p>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className={styles.sendInvitationBtn}>
                <SendIcon /> Send Invitation
              </button>
            </div>
          </form>
        )}

        {/* ── Stage: Success ──────────────────────────────────────── */}
        {stage === "success" && (
          <div className={styles.successContent}>
            <div className={styles.checkCircle}>
              <CheckCircleIcon />
            </div>

            <h3 className={styles.successMessage}>Invitation Sent!</h3>
            <p className={styles.admissionDetails}>
              Staff will receive an email at <strong>{email}</strong> with their secure invite link.
            </p>

            {/* Secure link row */}
            <div className={styles.inviteLinkCard}>
              <span className={styles.inviteLinkLabel}>Secure Invite Link</span>
              <div className={styles.inviteLinkRow}>
                <span className={styles.inviteLinkText}>{inviteLink}</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(inviteLink, "link")}
                  aria-label="Copy invite link"
                >
                  {copiedLink ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : <CopyIcon />}
                </button>
              </div>
            </div>

            {/* Access code row */}
            <p className={styles.codeHint}>
              Share this code with staff ({fullName || "staff name"}) if they don&apos;t receive the email
            </p>
            <div className={styles.accessCodeBox}>
              <span className={styles.accessCode}>{inviteCode}</span>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() => handleCopy(inviteCode, "code")}
                aria-label="Copy access code"
              >
                {copiedCode ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : <CopyIcon />}
              </button>
            </div>
            <p className={styles.accessNote}>This access is specific to ({fullName || "Patient Name"})</p>

            <button className={styles.doneBtn} onClick={handleClose}>
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export { InviteStaffModal };