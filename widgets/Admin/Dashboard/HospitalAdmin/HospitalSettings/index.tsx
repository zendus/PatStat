"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

// ─── Icons ────────────────────────────────────────────────────────────────────

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const CancelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HospitalIcon = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.13672 22.5082V4.09301C6.13672 3.55034 6.35229 3.0299 6.73602 2.64617C7.11974 2.26245 7.64018 2.04688 8.18285 2.04688H16.3674C16.91 2.04688 17.4305 2.26245 17.8142 2.64617C18.1979 3.0299 18.4135 3.55034 18.4135 4.09301V22.5082H6.13672Z" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.13914 12.2773H4.09301C3.55034 12.2773 3.0299 12.4929 2.64617 12.8766C2.26245 13.2604 2.04688 13.7808 2.04688 14.3235V20.4619C2.04688 21.0045 2.26245 21.525 2.64617 21.9087C3.0299 22.2924 3.55034 22.508 4.09301 22.508H6.13914" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.4141 9.20801H20.4602C21.0029 9.20801 21.5233 9.42358 21.907 9.80731C22.2908 10.191 22.5063 10.7115 22.5063 11.2541V20.4617C22.5063 21.0044 22.2908 21.5248 21.907 21.9086C21.5233 22.2923 21.0029 22.5079 20.4602 22.5079H18.4141" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.2266 6.13867H14.3188" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.2266 10.2305H14.3188" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.2266 14.3232H14.3188" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.2266 18.415H14.3188" stroke="#1A949D" strokeWidth="2.04613" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const NotificationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  hospitalName: string;
  hospitalType: string;
  location: string;
  contactEmail: string;
  phoneNumber: string;
  timeZone: string;
  startTime: string;
  endTime: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface NotificationRowProps {
  title: string;
  description: string;
  checked: boolean;
  id: string;
  onChange: () => void;
}

const NotificationRow: React.FC<NotificationRowProps> = ({ title, description, checked, id, onChange }) => (
  <div className={styles.notificationItem}>
    <div className={styles.notificationText}>
      <p className={styles.notificationTitle}>{title}</p>
      <p className={styles.notificationDescription}>{description}</p>
    </div>
    <label className={styles.switch} htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} aria-label={title} />
      <span className={styles.slider}></span>
    </label>
  </div>
);

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => (
  <div className={styles.sectionHeader}>
    <div className={styles.sectionIconWrap}>{icon}</div>
    <h2 className={styles.sectionTitle}>{title}</h2>
  </div>
);

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  hospitalName: "Parklane General Hospital",
  hospitalType: "Specialist",
  location: "Enugu, Nigeria",
  contactEmail: "admin@hospital.ng",
  phoneNumber: "+234 800 000 0000",
  timeZone: "West Africa Time (WAT)",
  startTime: "00:00",
  endTime: "23:59",
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const HospitalSettingsPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [draftData, setDraftData] = useState<FormData>(INITIAL_FORM);
  const [criticalPatientAlerts, setCriticalPatientAlerts] = useState(true);
  const [staffActivityNotifications, setStaffActivityNotifications] = useState(false);

  const handleEdit = () => {
    setDraftData({ ...formData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setFormData({ ...draftData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftData({ ...formData });
    setIsEditing(false);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setDraftData(prev => ({ ...prev, [field]: value }));
  };

  // Use draft values while editing, saved values otherwise
  const display = isEditing ? draftData : formData;

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Hospital Settings</h1>
          <p className={styles.subtitle}>Configure hospital-level details and preferences</p>
        </div>

        <div className={styles.headerActions}>
          {isEditing ? (
            <>
              <button className={styles.cancelBtn} type="button" onClick={handleCancel}>
                <CancelIcon /> Cancel
              </button>
              <button className={styles.saveBtn} type="button" onClick={handleSave}>
                <SaveIcon /> Save Changes
              </button>
            </>
          ) : (
            <button className={styles.editInformationBtn} type="button" onClick={handleEdit}>
              <EditIcon /> Edit Information
            </button>
          )}
        </div>
      </div>

      <div className={styles.settingsSection}>
        <SectionHeader icon={<HospitalIcon />} title="Hospital Information" />
        <div className={styles.formGrid}>

          <div className={styles.formGroup}>
            <label htmlFor="hospitalName" className={styles.formLabel}>Hospital Name</label>
            <input
              type="text"
              id="hospitalName"
              className={`${styles.formInput} ${isEditing ? styles.editable : ""}`}
              value={display.hospitalName}
              onChange={e => handleChange("hospitalName", e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hospitalType" className={styles.formLabel}>Hospital Type</label>
            <select
              id="hospitalType"
              className={`${styles.formSelect} ${isEditing ? styles.editable : ""}`}
              value={display.hospitalType}
              onChange={e => handleChange("hospitalType", e.target.value)}
              disabled={!isEditing}
            >
              <option value="General">General</option>
              <option value="Specialist">Specialist</option>
              <option value="Teaching">Teaching</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.formLabel}>Location</label>
            <input
              type="text"
              id="location"
              className={`${styles.formInput} ${isEditing ? styles.editable : ""}`}
              value={display.location}
              onChange={e => handleChange("location", e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactEmail" className={styles.formLabel}>Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              className={`${styles.formInput} ${isEditing ? styles.editable : ""}`}
              value={display.contactEmail}
              onChange={e => handleChange("contactEmail", e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.formLabel}>Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              className={`${styles.formInput} ${isEditing ? styles.editable : ""}`}
              value={display.phoneNumber}
              onChange={e => handleChange("phoneNumber", e.target.value)}
              readOnly={!isEditing}
            />
          </div>

        </div>
      </div>

      {/* ── Operating Preferences ───────────────────────────────────────── */}
      <div className={styles.settingsSection}>
        <SectionHeader icon={<ClockIcon />} title="Operating Preferences" />
        <div className={styles.formGrid}>

          <div className={styles.formGroup}>
            <label htmlFor="timeZone" className={styles.formLabel}>Time Zone</label>
            <select
              id="timeZone"
              className={`${styles.formSelect} ${isEditing ? styles.editable : ""}`}
              value={display.timeZone}
              onChange={e => handleChange("timeZone", e.target.value)}
              disabled={!isEditing}
            >
              <option value="GMT (UTC+0)">GMT (UTC+0)</option>
              <option value="West Africa Time (WAT)">West Africa Time (WAT)</option>
              <option value="Central Africa Time (CAT)">Central Africa Time (CAT)</option>
              <option value="Eastern Africa Time (EAT)">Eastern Africa Time (EAT)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Operating Hours</label>
            <div className={styles.timeInputs}>
              <input
                type="text"
                className={`${styles.timeInput} ${isEditing ? styles.editable : ""}`}
                value={display.startTime}
                onChange={e => handleChange("startTime", e.target.value)}
                readOnly={!isEditing}
                aria-label="Operating hours start time"
                placeholder="00:00"
              />
              <span className={styles.timeSeparator}>to</span>
              <input
                type="text"
                className={`${styles.timeInput} ${isEditing ? styles.editable : ""}`}
                value={display.endTime}
                onChange={e => handleChange("endTime", e.target.value)}
                readOnly={!isEditing}
                aria-label="Operating hours end time"
                placeholder="23:59"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Notification Preferences ─────────────────────────────────────── */}
      <div className={styles.settingsSection}>
        <SectionHeader icon={<NotificationIcon />} title="Notification Preferences" />
        <NotificationRow
          id="criticalAlerts"
          title="Critical Patient Alerts"
          description="Receive alerts when a patient status becomes critical."
          checked={criticalPatientAlerts}
          onChange={() => setCriticalPatientAlerts(v => !v)}
        />
        <NotificationRow
          id="staffActivity"
          title="Staff Activity Notifications"
          description="Daily summary of staff check-ins, actions, and shift changes."
          checked={staffActivityNotifications}
          onChange={() => setStaffActivityNotifications(v => !v)}
        />
      </div>

    </div>
  );
};

export { HospitalSettingsPage };