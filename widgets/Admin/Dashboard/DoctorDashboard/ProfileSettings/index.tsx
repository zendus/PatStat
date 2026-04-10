"use client";

import React from "react";
import styles from "./style.module.css"; // Reuse your existing CSS module

// ─── Component ────────────────────────────────────────────────────────────────

const ProfilePage: React.FC = () => {
  // Hardcoded user data for display
  const user = {
    fullName: "Dr. Tobenna Obi",
    email: "tobennaobi@hospital.ng",
    password: "***********", // Display as masked
    role: "Doctor",
    hospital: "Parklane General Hospital",
    avatarUrl: "https://via.placeholder.com/150/20232A/FFFFFF?text=TO" // Placeholder for avatar
  };

  return (
    <div className={styles.profileWrapper}>
      {/* Desktop Header */}
      <div className={styles.desktopHeader}>
        <h1>Profile & Settings</h1>
        <p className={styles.profileSubtitle}>Manage your account</p>
      </div>

      {/* Mobile Profile Header (conditionally rendered by CSS) */}
      <div className={styles.mobileProfileHeader}>
        <div className={styles.avatar}>
          <img src={user.avatarUrl} alt="User Avatar" />
        </div>
        <div className={styles.mobileProfileInfo}>
          <h2 className={styles.mobileProfileName}>{user.fullName}</h2>
          <p className={styles.mobileProfileRole}>{user.role}</p>
        </div>
      </div>

      {/* Profile Form Fields */}
      <div className={styles.profileFields}>
        {/* Full Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="fullName" className={styles.inputLabel}>Full Name</label>
          <div className={styles.readOnlyInput}>{user.fullName}</div>
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>Email</label>
          <div className={styles.readOnlyInput}>{user.email}</div>
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>Password</label>
          <div className={styles.readOnlyInput}>{user.password}</div>
        </div>

        {/* Role */}
        <div className={styles.inputGroup}>
          <label htmlFor="role" className={styles.inputLabel}>Role</label>
          <div className={styles.readOnlyInput}>{user.role}</div>
        </div>

        {/* Hospital */}
        <div className={styles.inputGroup}>
          <label htmlFor="hospital" className={styles.inputLabel}>Hospital</label>
          <div className={styles.readOnlyInput}>{user.hospital}</div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };