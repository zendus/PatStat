"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlatformInfo {
  platformName: string;
  supportEmail: string;
  defaultRegion: string;
}

interface AdminProfile {
  fullName: string;
  email: string;
  role: string;
}

interface SecuritySettings {
  twoFactor: boolean;
  sessionTimeout: string;
  loginAlerts: boolean;
}

interface Preferences {
  emailNotifications: boolean;
  timezone: string;
  language: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#015DDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#015DDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

// ─── Toggle ───────────────────────────────────────────────────────────────────

const Toggle: React.FC<{ checked: boolean; onChange: () => void; id: string }> = ({ checked, onChange, id }) => (
  <label htmlFor={id} className={styles.toggleLabel}>
    <input type="checkbox" id={id} className={styles.toggleInput} checked={checked} onChange={onChange} />
    <span className={`${styles.toggleTrack} ${checked ? styles.toggleTrackOn : ""}`}>
      <span className={styles.toggleThumb} />
    </span>
  </label>
);

// ─── Save Toast ───────────────────────────────────────────────────────────────

const SaveToast: React.FC<{ message: string }> = ({ message }) => (
  <div className={styles.toast}>
    <span className={styles.toastIcon}><CheckIcon /></span>
    {message}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const SettingsPage: React.FC = () => {
  const [platform, setPlatform] = useState<PlatformInfo>({
    platformName: "Pat-Stat",
    supportEmail: "support@patstat.ng",
    defaultRegion: "",
  });

  const [profile, setProfile] = useState<AdminProfile>({
    fullName: "Super Admin",
    email: "superadmin@patstat.ng",
    role: "Super Admin",
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactor: false,
    sessionTimeout: "30",
    loginAlerts: true,
  });

  const [prefs, setPrefs] = useState<Preferences>({
    emailNotifications: true,
    timezone: "Africa/Lagos",
    language: "English",
  });

  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handlePlatformSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Platform information saved.");
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Admin profile updated.");
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Security settings saved.");
  };

  const handlePrefsSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Preferences saved.");
  };

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage platform-level configurations and admin account settings</p>
      </div>

      {/* ── Platform Information ─────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Platform Information</h2>
        <div className={styles.divider} />
        <form onSubmit={handlePlatformSave} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Platform Name</label>
              <input
                type="text"
                className={styles.formInput}
                value={platform.platformName}
                onChange={(e) => setPlatform({ ...platform, platformName: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Support Email</label>
              <input
                type="email"
                className={styles.formInput}
                value={platform.supportEmail}
                onChange={(e) => setPlatform({ ...platform, supportEmail: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Default Region</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Nigeria"
              value={platform.defaultRegion}
              onChange={(e) => setPlatform({ ...platform, defaultRegion: e.target.value })}
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn}>Save Changes</button>
          </div>
        </form>
      </div>

      {/* ── Admin Profile ────────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Admin Profile</h2>
        <div className={styles.divider} />
        <form onSubmit={handleProfileSave} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <input
                type="text"
                className={styles.formInput}
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                type="email"
                className={styles.formInput}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role</label>
            <input
              type="text"
              className={`${styles.formInput} ${styles.formInputDisabled}`}
              value={profile.role}
              disabled
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn}>Update Profile</button>
          </div>
        </form>
      </div>

      {/* ── Bottom two-column grid ───────────────────────────────── */}
      <div className={styles.bottomGrid}>

        {/* Security */}
        <div className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <ShieldIcon />
            <h2 className={styles.sectionTitle}>Security</h2>
          </div>
          <div className={styles.divider} />
          <form onSubmit={handleSecuritySave} className={styles.form}>

            <div className={styles.toggleRow}>
              <div>
                <p className={styles.toggleTitle}>Two-Factor Authentication</p>
                <p className={styles.toggleDesc}>Require 2FA for all admin logins</p>
              </div>
              <Toggle
                id="twoFactor"
                checked={security.twoFactor}
                onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
              />
            </div>

            <div className={styles.toggleRow}>
              <div>
                <p className={styles.toggleTitle}>Login Alerts</p>
                <p className={styles.toggleDesc}>Email alert on new device login</p>
              </div>
              <Toggle
                id="loginAlerts"
                checked={security.loginAlerts}
                onChange={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Session Timeout (minutes)</label>
              <input
                type="number"
                className={styles.formInput}
                value={security.sessionTimeout}
                min="5"
                max="480"
                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.primaryBtn}>Save Security</button>
            </div>
          </form>
        </div>

        {/* Preferences */}
        <div className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <BellIcon />
            <h2 className={styles.sectionTitle}>Preferences</h2>
          </div>
          <div className={styles.divider} />
          <form onSubmit={handlePrefsSave} className={styles.form}>

            <div className={styles.toggleRow}>
              <div>
                <p className={styles.toggleTitle}>Email Notifications</p>
                <p className={styles.toggleDesc}>Receive platform activity emails</p>
              </div>
              <Toggle
                id="emailNotifs"
                checked={prefs.emailNotifications}
                onChange={() => setPrefs({ ...prefs, emailNotifications: !prefs.emailNotifications })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Timezone</label>
              <select
                className={styles.formSelect}
                value={prefs.timezone}
                onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
              >
                <option value="Africa/Lagos">Africa/Lagos (WAT, UTC+1)</option>
                <option value="Africa/Nairobi">Africa/Nairobi (EAT, UTC+3)</option>
                <option value="Africa/Accra">Africa/Accra (GMT, UTC+0)</option>
                <option value="Europe/London">Europe/London (GMT/BST)</option>
                <option value="America/New_York">America/New_York (EST/EDT)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Language</label>
              <select
                className={styles.formSelect}
                value={prefs.language}
                onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Hausa">Hausa</option>
                <option value="Yoruba">Yoruba</option>
                <option value="Igbo">Igbo</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.primaryBtn}>Save Preferences</button>
            </div>
          </form>
        </div>

      </div>

      {/* Toast */}
      {toast && <SaveToast message={toast} />}

    </div>
  );
};

export { SettingsPage };