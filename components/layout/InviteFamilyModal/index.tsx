"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

// ─── Icons ────────────────────────────────────────────────────────────────────

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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

// ─── Dropdown ────────────────────────────────────────────────────────────────

interface DropdownSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label, options, value, onChange, placeholder, required = false,
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface InviteFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess?: (name: string, email: string, patientName: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

const InviteFamilyModal: React.FC<InviteFamilyModalProps> = ({ isOpen, onClose, onInviteSuccess }) => {
  const [stage, setStage] = useState<"form" | "success">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState("");
  const [relationship, setRelationship] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const patientOptions = [
    { value: "john-eze", label: "John Eze" },
    { value: "mary-ochieng", label: "Mary Ochieng" },
    { value: "samuel-banda", label: "Samuel Banda" },
    { value: "grace-mwangi", label: "Grace Mwangi" },
    { value: "adebayo-williams", label: "Adebayo Williams" },
    { value: "amina-yusuf", label: "Amina Yusuf" },
  ];

  const relationshipOptions = [
    { value: "spouse", label: "Spouse" },
    { value: "parent", label: "Parent" },
    { value: "child", label: "Child" },
    { value: "sibling", label: "Sibling" },
    { value: "guardian", label: "Guardian" },
    { value: "other", label: "Other" },
  ];

  const selectedPatientLabel = patientOptions.find((p) => p.value === patient)?.label || "Patient Name";
  const inviteLink = `https://pat-stat.com/family/join/${inviteCode}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateCode();
    setInviteCode(code);
    setStage("success");
    if (onInviteSuccess) onInviteSuccess(fullName, email, selectedPatientLabel);
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
    setPhone("");
    setPatient("");
    setRelationship("");
    setInviteCode("");
    setCopiedLink(false);
    setCopiedCode(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>

        {/* ── Shared Header ───────────────────────────────────── */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <HeartIcon />
            <h2 className={styles.modalTitle}>Invite Family Member</h2>
          </div>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close modal">
            <XIcon />
          </button>
        </div>

        {/* ── Stage: Form ─────────────────────────────────────── */}
        {stage === "form" && (
          <form onSubmit={handleSubmit} className={styles.modalBody}>

            <div className={styles.formGroup}>
              <label htmlFor="familyFullName" className={styles.formLabel}>
                Family Member Name<span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                id="familyFullName"
                className={styles.formInput}
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="familyEmail" className={styles.formLabel}>
                Email Address<span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="email"
                id="familyEmail"
                className={styles.formInput}
                placeholder="family@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="familyPhone" className={styles.formLabel}>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="familyPhone"
                className={styles.formInput}
                placeholder="+234 XXX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <DropdownSelect
              label="Patient"
              options={patientOptions}
              value={patient}
              onChange={setPatient}
              placeholder="Select patient..."
              required
            />

            <DropdownSelect
              label="Relationship to Patient"
              options={relationshipOptions}
              value={relationship}
              onChange={setRelationship}
              placeholder="Select relationship..."
              required
            />

            <div className={styles.infoBox}>
              <InfoIcon />
              <p>The family member will receive read-only access to patient status updates and care team information.</p>
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

        {/* ── Stage: Success ──────────────────────────────────── */}
        {stage === "success" && (
          <div className={styles.successContent}>

            <div className={styles.checkCircle}>
              <CheckCircleIcon />
            </div>

            <h3 className={styles.successMessage}>Invitation Sent!</h3>
            <p className={styles.admissionDetails}>
              Patient family member ({fullName}) will receive an email with secure access instructions.
            </p>

            {/* Secure link */}
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

            {/* Access code */}
            <p className={styles.codeHint}>Or share this access code:</p>
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
            <p className={styles.accessNote}>This access is specific to ({selectedPatientLabel})</p>

            <button className={styles.doneBtn} onClick={handleClose}>
              Done
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export { InviteFamilyModal };