"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileForm {
  fullName: string;
  email: string;
  password: string;
  role: string;
  hospital: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const PersonIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProfilePage: React.FC = () => {
  const [form, setForm] = useState<ProfileForm>({
    fullName: "Dr. Tobenna Obi",
    email:    "tobennaobi@hospital.ng",
    password: "password123",
    role:     "Doctor",
    hospital: "Parklane General Hospital",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: wire to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.wrapper}>

      {/* ── Desktop page header (hidden on mobile) ── */}
      <div className={styles.desktopHeader}>
        <h1>Profile &amp; Settings</h1>
        <p className={styles.subtitle}>Manage your account</p>
      </div>

      {/* ── Mobile profile header (hidden on desktop) ── */}
      <div className={styles.mobileProfileHeader}>
        <div className={styles.avatarCircle}>
          <PersonIcon />
        </div>
        <div>
          <p className={styles.mobileProfileName}>{form.fullName}</p>
          <p className={styles.mobileProfileRole}>{form.role}</p>
        </div>
      </div>

      {/* ── Form card ── */}
      <div className={styles.formCard}>

        {/* Full Name */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Full Name</label>
          <input
            className={styles.fieldInput}
            type="text"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        {/* Email */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Email</label>
          <input
            className={styles.fieldInput}
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Password */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={`${styles.fieldInput} ${styles.passwordInput}`}
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <button
              className={styles.eyeBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Role</label>
          <input
            className={styles.fieldInput}
            type="text"
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
          />
        </div>

        {/* Hospital */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Hospital</label>
          <input
            className={styles.fieldInput}
            type="text"
            value={form.hospital}
            onChange={(e) => handleChange("hospital", e.target.value)}
          />
        </div>

        {/* Update button */}
        <button
          className={`${styles.btnUpdate} ${saved ? styles.btnSaved : ""}`}
          onClick={handleSave}
        >
          {saved ? "Changes Saved!" : "Update Profile"}
        </button>

      </div>
    </div>
  );
};

export { ProfilePage };