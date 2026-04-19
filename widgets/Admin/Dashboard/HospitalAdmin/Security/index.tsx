"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EditPermissionsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoleItem {
  title: string;
  description: string;
  badge: string;
  badgeVariant: "primary" | "secondary" | "neutral";
}

interface AccessControlItem {
  title: string;
  description: string;
  defaultValue?: string;
  type: "toggle" | "select";
  options?: string[];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, action }) => (
  <div className={styles.sectionHeader}>
    <div className={styles.sectionHeaderLeft}>
      <div className={styles.sectionIconWrap}>{icon}</div>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
    {action && <div className={styles.sectionHeaderAction}>{action}</div>}
  </div>
);

interface RoleRowProps {
  role: RoleItem;
}

const RoleRow: React.FC<RoleRowProps> = ({ role }) => (
  <div className={styles.roleRow}>
    <div className={styles.roleText}>
      <p className={styles.roleTitle}>{role.title}</p>
      <p className={styles.roleDescription}>{role.description}</p>
    </div>
    <span className={`${styles.badge} ${styles[`badge_${role.badgeVariant}`]}`}>
      {role.badge}
    </span>
  </div>
);

interface AuthRowProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthRow: React.FC<AuthRowProps> = ({ title, description, children }) => (
  <div className={styles.authRow}>
    <div className={styles.authText}>
      <p className={styles.authTitle}>{title}</p>
      <p className={styles.authDescription}>{description}</p>
    </div>
    <div className={styles.authControl}>{children}</div>
  </div>
);

interface ToggleProps {
  checked: boolean;
  id: string;
  onChange: () => void;
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, id, onChange, label }) => (
  <label className={styles.switch} htmlFor={id}>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} aria-label={label} />
    <span className={styles.slider}></span>
  </label>
);

interface AccessControlRowProps {
  title: string;
  description: string;
  badge: string;
  badgeVariant: "allow" | "deny" | "conditional";
}

const AccessControlRow: React.FC<AccessControlRowProps> = ({ title, description, badge, badgeVariant }) => (
  <div className={styles.accessRow}>
    <div className={styles.accessText}>
      <p className={styles.accessTitle}>{title}</p>
      <p className={styles.accessDescription}>{description}</p>
    </div>
    <span className={`${styles.accessBadge} ${styles[`access_${badgeVariant}`]}`}>{badge}</span>
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES: RoleItem[] = [
  {
    title: "Hospital Admin",
    description: "Full access to all system features",
    badge: "Full Access",
    badgeVariant: "primary",
  },
  {
    title: "Doctor",
    description: "Manage patients, status updates, and notes",
    badge: "Patient Care",
    badgeVariant: "secondary",
  },
  {
    title: "Nurse",
    description: "Update status and monitor patients",
    badge: "Monitoring",
    badgeVariant: "neutral",
  },
];

const ACCESS_CONTROL_ROWS: AccessControlRowProps[] = [
  {
    title: "Patient Record Access",
    description: "View and edit patient records and history",
    badge: "All Roles",
    badgeVariant: "allow",
  },
  {
    title: "Billing & Invoices",
    description: "Access financial data and generate invoices",
    badge: "Admin Only",
    badgeVariant: "deny",
  },
  {
    title: "Staff Management",
    description: "Add, remove, and manage staff accounts",
    badge: "Admin Only",
    badgeVariant: "deny",
  },
  {
    title: "Reports & Analytics",
    description: "View performance metrics and generate reports",
    badge: "Admin + Doctor",
    badgeVariant: "conditional",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

const SecurityPermissionsPage: React.FC = () => {
  const [enforcePasswords, setEnforcePasswords] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("1 hour");

  return (
    <div className={styles.wrapper}>

      {/* Page Header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Security &amp; Permissions</h1>
          <p className={styles.subtitle}>Manage access control, roles, and security settings</p>
        </div>
      </div>

      {/* ── Role Permissions ─────────────────────────────────────────────── */}
      <div className={styles.settingsSection}>
        <SectionHeader
          icon={<ShieldIcon />}
          title="Role Permissions"
          action={
            <button className={styles.editPermissionsBtn} type="button">
              <EditPermissionsIcon /> Edit Permissions
            </button>
          }
        />
        <div className={styles.roleList}>
          {ROLES.map(role => (
            <RoleRow key={role.title} role={role} />
          ))}
        </div>
      </div>

      {/* ── Authentication Settings ──────────────────────────────────────── */}
      <div className={styles.settingsSection}>
        <SectionHeader icon={<LockIcon />} title="Authentication Settings" />

        <AuthRow
          title="Enforce Strong Passwords"
          description="Require 8+ chars, numbers, and symbols."
        >
          <Toggle
            id="enforcePasswords"
            checked={enforcePasswords}
            onChange={() => setEnforcePasswords(v => !v)}
            label="Enforce Strong Passwords"
          />
        </AuthRow>

        <AuthRow
          title="Two-Factor Authentication (2FA)"
          description="Require all staff to use 2FA."
        >
          <Toggle
            id="twoFactorAuth"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(v => !v)}
            label="Two-Factor Authentication"
          />
        </AuthRow>

        <AuthRow
          title="Session Timeout"
          description="Auto-logout after inactivity."
        >
          <select
            className={styles.timeoutSelect}
            value={sessionTimeout}
            onChange={e => setSessionTimeout(e.target.value)}
            aria-label="Session timeout duration"
          >
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="4 hours">4 hours</option>
            <option value="Never">Never</option>
          </select>
        </AuthRow>
      </div>

      {/* ── Access Control ───────────────────────────────────────────────── */}
      <div className={styles.settingsSection}>
        <SectionHeader icon={<UsersIcon />} title="Access Control" />
        <div className={styles.accessList}>
          {ACCESS_CONTROL_ROWS.map(row => (
            <AccessControlRow key={row.title} {...row} />
          ))}
        </div>
      </div>

    </div>
  );
};

export { SecurityPermissionsPage };