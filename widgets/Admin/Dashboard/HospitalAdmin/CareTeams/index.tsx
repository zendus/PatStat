"use client";

import { useState } from "react";
import styles from "./style.module.css";
import { InviteStaffModal } from "@/components/layout";

// ─── Types ────────────────────────────────────────────────────────────────────

type StaffRole = "Doctor" | "Nurse";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  patientsCount: number;
  avatar: string; // URL for the avatar image
}

type Tab = "All Staff" | "Doctors" | "Nurses";

// ─── Data ─────────────────────────────────────────────────────────────────────

const allStaff: StaffMember[] = [
  // Doctors
  { id: 1, name: "Dr. Tobenna Obi", email: "tobenna.obi@hospital.ng", role: "Doctor", patientsCount: 8, avatar: "/avatars/doctors.svg" },
  { id: 2, name: "Dr. Kwame Mensah", email: "kwame.mensah@hospital.ng", role: "Doctor", patientsCount: 10, avatar: "/avatars/doctors.svg" },
  { id: 3, name: "Dr. Maryam Bello", email: "maryam.bello@hospital.ng", role: "Doctor", patientsCount: 6, avatar: "/avatars/doctors.svg" },
  { id: 4, name: "Dr. Sarah Abiola", email: "sarah.abiola@hospital.ng", role: "Doctor", patientsCount: 8, avatar: "/avatars/doctors.svg" },
  { id: 5, name: "Dr. Chioma Eze", email: "chioma.eze@hospital.ng", role: "Doctor", patientsCount: 6, avatar: "/avatars/doctors.svg" },
  { id: 6, name: "Dr. Ibrahim Musa", email: "ibrahim.musa@hospital.ng", role: "Doctor", patientsCount: 10, avatar: "/avatars/doctors.svg" },

  // Nurses
  { id: 7, name: "Nurse Chisom Okeke", email: "chisom.okeke@hospital.ng", role: "Nurse", patientsCount: 6, avatar: "/avatars/nurses.svg" },
  { id: 8, name: "Nurse Blessing Udoh", email: "blessing.udoh@hospital.ng", role: "Nurse", patientsCount: 6, avatar: "/avatars/nurses.svg" },
  { id: 9, name: "Nurse Fatima Ibrahim", email: "fatima.ibrahim@hospital.ng", role: "Nurse", patientsCount: 8, avatar: "/avatars/nurses.svg" },
  { id: 10, name: "Nurse Jide Adeleke", email: "jide.adeleke@hospital.ng", role: "Nurse", patientsCount: 8, avatar: "/avatars/nurses.svg" },
  { id: 11, name: "Nurse Rose Mensah", email: "rose.mensah@hospital.ng", role: "Nurse", patientsCount: 6, avatar: "/avatars/nurses.svg" },
  { id: 12, name: "Nurse Halima Sani", email: "halima.sani@hospital.ng", role: "Nurse", patientsCount: 8, avatar: "/avatars/nurses.svg" },
];

const doctors = allStaff.filter(member => member.role === "Doctor");
const nurses = allStaff.filter(member => member.role === "Nurse");

// ─── Icons ────────────────────────────────────────────────────────────────────

const InviteIcon = () => (

  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 15C2.5875 15 2.2345 14.8533 1.941 14.5597C1.6475 14.2662 1.5005 13.913 1.5 13.5V4.5C1.5 4.0875 1.647 3.7345 1.941 3.441C2.235 3.1475 2.588 3.0005 3 3H15C15.4125 3 15.7657 3.147 16.0597 3.441C16.3538 3.735 16.5005 4.088 16.5 4.5V13.5C16.5 13.9125 16.3533 14.2657 16.0597 14.5597C15.7662 14.8538 15.413 15.0005 15 15H3ZM9 9.75L3 6V13.5H15V6L9 9.75ZM9 8.25L15 4.5H3L9 8.25ZM3 6V4.5V13.5V6Z" fill="white"/>
</svg>

);

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const DoctorIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.3346 31.167V26.917C28.3346 22.9107 28.3346 20.9061 27.0894 19.6622C25.8456 18.417 23.841 18.417 19.8346 18.417L17.0013 21.2503L14.168 18.417C10.1616 18.417 8.15705 18.417 6.91322 19.6622C5.66797 20.9061 5.66797 22.9107 5.66797 26.917V31.167M22.668 18.417V26.2087" stroke="#015DDD" stroke-width="2.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.0443 18.4168V24.0835M12.0443 24.0835C12.7957 24.0835 13.5164 24.382 14.0477 24.9134C14.5791 25.4447 14.8776 26.1654 14.8776 26.9168V28.3335M12.0443 24.0835C11.2928 24.0835 10.5722 24.382 10.0408 24.9134C9.50945 25.4447 9.21094 26.1654 9.21094 26.9168V28.3335M21.9609 9.2085V7.79183C21.9609 7.14069 21.8327 6.49593 21.5835 5.89436C21.3343 5.29278 20.9691 4.74618 20.5087 4.28576C20.0483 3.82533 19.5016 3.46011 18.9001 3.21093C18.2985 2.96175 17.6537 2.8335 17.0026 2.8335C16.3515 2.8335 15.7067 2.96175 15.1051 3.21093C14.5036 3.46011 13.957 3.82533 13.4965 4.28576C13.0361 4.74618 12.6709 5.29278 12.4217 5.89436C12.1725 6.49593 12.0443 7.14069 12.0443 7.79183V9.2085C12.0443 9.85963 12.1725 10.5044 12.4217 11.106C12.6709 11.7075 13.0361 12.2541 13.4965 12.7146C13.957 13.175 14.5036 13.5402 15.1051 13.7894C15.7067 14.0386 16.3515 14.1668 17.0026 14.1668C17.6537 14.1668 18.2985 14.0386 18.9001 13.7894C19.5016 13.5402 20.0483 13.175 20.5087 12.7146C20.9691 12.2541 21.3343 11.7075 21.5835 11.106C21.8327 10.5044 21.9609 9.85963 21.9609 9.2085Z" stroke="#015DDD" stroke-width="2.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.7305 27.271C23.7305 27.5528 23.6185 27.823 23.4193 28.0223C23.22 28.2216 22.9498 28.3335 22.668 28.3335C22.3862 28.3335 22.1159 28.2216 21.9167 28.0223C21.7174 27.823 21.6055 27.5528 21.6055 27.271C21.6055 26.9892 21.7174 26.719 21.9167 26.5197C22.1159 26.3204 22.3862 26.2085 22.668 26.2085C22.9498 26.2085 23.22 26.3204 23.4193 26.5197C23.6185 26.719 23.7305 26.9892 23.7305 27.271Z" stroke="#015DDD" stroke-width="2.125"/>
</svg>

);

const NurseIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.66797 31.1668V29.7502C5.66797 27.1024 5.66797 25.7778 6.23747 24.7918C6.61047 24.1458 7.14694 23.6093 7.79297 23.2363C8.77897 22.6668 10.1021 22.6668 12.7513 22.6668L17.0013 28.3335L21.2513 22.6668C23.9005 22.6668 25.2236 22.6668 26.2096 23.2363C26.8557 23.6093 27.3921 24.1458 27.7651 24.7918C28.3346 25.7778 28.3346 27.1024 28.3346 29.7502V31.1668M22.5787 11.3335L24.0209 5.47416C24.351 4.13258 23.3522 2.8335 21.9922 2.8335H12.0104C10.6504 2.8335 9.65164 4.13258 9.98172 5.47416L11.4239 11.3335M22.5787 11.3335V14.1668C22.5787 17.2962 20.0826 19.8335 17.0013 19.8335C13.9201 19.8335 11.4239 17.2962 11.4239 14.1668V11.3335M22.5787 11.3335H11.4239M17.0013 5.66683V8.50016M18.418 7.0835H15.5846" stroke="#1A949D" stroke-width="2.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

// ─── Main Page ────────────────────────────────────────────────────────────────

const CareTeamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All Staff");
  const [query, setQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  console.log("isInviteModalOpen:", isInviteModalOpen); 

  const getFilteredStaff = () => {
    let currentStaff: StaffMember[] = [];
    if (activeTab === "All Staff") {
      currentStaff = allStaff;
    } else if (activeTab === "Doctors") {
      currentStaff = doctors;
    } else { // Nurses
      currentStaff = nurses;
    }

    const q = query.toLowerCase();
    return currentStaff.filter(member =>
      member.name.toLowerCase().includes(q) ||
      member.email.toLowerCase().includes(q)
    );
  };

  const filteredStaff = getFilteredStaff();

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Care Teams</h1>
          <p className={styles.subtitle}>Manage doctors, nurses and medical staff</p>
        </div>
        <button 
        className={styles.inviteStaffBtn} 
        onClick={() => setIsInviteModalOpen(true)}
        >
           <InviteIcon /> Invite Staff
        </button>
      </div>

      {/* Staff stats cards */}
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Doctors</p>
            <p className={styles.statValue}>{doctors.length}</p>
          </div>
          <DoctorIcon />
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Nurses</p>
            <p className={styles.statValue}>{nurses.length}</p>
          </div>
          <NurseIcon />
        </div>
      </div>

      {/* Main content container */}
      <div className={styles.mainContent}>

        {/* Tabs and Search */}
        <div className={styles.tabsAndSearch}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "All Staff" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("All Staff")}
            >
              All Staff ({allStaff.length})
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "Doctors" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("Doctors")}
            >
              Doctors ({doctors.length})
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "Nurses" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("Nurses")}
            >
              Nurses ({nurses.length})
            </button>
          </div>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}><SearchIcon /></span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search staff by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Staff List */}
        <div className={styles.staffList}>
          {filteredStaff.map((member) => (
            <div key={member.id} className={styles.staffRow}>
              <div className={styles.staffInfo}>
                <img src={member.avatar} alt={member.name} className={styles.staffAvatar} />
                <div className={styles.staffDetails}>
                  <p className={styles.staffName}>{member.name}</p>
                  <p className={styles.staffEmail}>{member.email}</p>
                </div>
              </div>
              <div className={styles.staffActions}>
                <p className={styles.patientsCount}>{member.patientsCount} patients</p>
                <span className={styles.staffRoleBadge}>{member.role}</span>
                <button className={styles.viewProfileBtn}>View Profile</button>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <p className={styles.emptyText}>No staff found matching your search.</p>
          )}
        </div>
      </div>
      <InviteStaffModal
      isOpen={isInviteModalOpen}
      onClose={() => setIsInviteModalOpen(false)}
      onInviteSuccess={(name, email, role) => {
      console.log("Invited:", name, email, role);
      }}
      />
    </div>
  );
};

export { CareTeamsPage };