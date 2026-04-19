"use client";
import { useState } from "react";
import styles from "./style.module.css";
import { InviteFamilyModal } from "@/components/layout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FamilyMemberAccess {
  id: number;
  name: string;
  email: string;
  initial: string; // First letter of the name for the avatar
  patientName: string;
  patientId: number; // Assuming a patient ID for linking
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const activeFamilyAccess: FamilyMemberAccess[] = [
  { id: 1, name: "Chioma Eze", email: "chioma.eze@email.com", initial: "C", patientName: "John Eze", patientId: 101 },
  { id: 2, name: "David Ochieng", email: "david.ochieng@email.com", initial: "D", patientName: "Mary Ochieng", patientId: 102 },
  { id: 3, name: "Sarah Banda", email: "sarah.banda@email.com", initial: "S", patientName: "Samuel Banda", patientId: 103 },
  { id: 4, name: "Kofi Mwangi", email: "kofi.mwangi@email.com", initial: "K", patientName: "Grace Mwangi", patientId: 104 },
  { id: 5, name: "Blessing Williams", email: "blessing.w@email.com", initial: "B", patientName: "Adebayo Williams", patientId: 105 },
  { id: 6, name: "Fatima Yusuf", email: "f.yusuf@email.com", initial: "F", patientName: "Amina Yusuf", patientId: 106 },
  { id: 7, name: "Michael Okoro", email: "michael.o@email.com", initial: "M", patientName: "Chukwudi Okoro", patientId: 107 },
  { id: 8, name: "Jessica Kim", email: "jessica.k@email.com", initial: "J", patientName: "Lee Kim", patientId: 108 },
];

const totalFamilyMembers = activeFamilyAccess.length + 39; // Just an example to match 45
const activeAccessLinks = activeFamilyAccess.length + 32; // Just an example to match 38
const accessRequests = 0;

// ─── Icons ────────────────────────────────────────────────────────────────────

const InviteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 15C2.5875 15 2.2345 14.8533 1.941 14.5597C1.6475 14.2662 1.5005 13.913 1.5 13.5V4.5C1.5 4.0875 1.647 3.7345 1.941 3.441C2.235 3.1475 2.588 3.0005 3 3H15C15.4125 3 15.7657 3.147 16.0597 3.441C16.3538 3.735 16.5005 4.088 16.5 4.5V13.5C16.5 13.9125 16.3533 14.2657 16.0597 14.5597C15.7662 14.8538 15.413 15.0005 15 15H3ZM9 9.75L3 6V13.5H15V6L9 9.75ZM9 8.25L15 4.5H3L9 8.25ZM3 6V4.5V13.5V6Z" fill="white" />
  </svg>

);

const FamilyIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.25034 11.6874C4.25019 10.4547 4.55647 9.24119 5.14163 8.15615C5.72679 7.07112 6.57248 6.14854 7.60264 5.47142C8.6328 4.79429 9.81511 4.38385 11.0432 4.27701C12.2714 4.17017 13.5068 4.37028 14.6384 4.85934C15.77 5.3484 16.7623 6.11107 17.5261 7.07876C18.2898 8.04645 18.801 9.18881 19.0138 10.4031C19.2265 11.6174 19.1341 12.8655 18.7448 14.0352C18.3555 15.2049 17.6816 16.2594 16.7836 17.1041C18.4766 17.926 19.9465 19.1439 21.0688 20.6546C22.1911 22.1654 22.9328 23.9243 23.2308 25.7826C23.2636 25.9893 23.2554 26.2006 23.2065 26.4042C23.1577 26.6077 23.0692 26.7997 22.9462 26.9691C22.8232 27.1385 22.668 27.282 22.4895 27.3915C22.311 27.5009 22.1127 27.5741 21.9059 27.6069C21.6991 27.6397 21.4879 27.6314 21.2843 27.5826C21.0807 27.5337 20.8887 27.4453 20.7193 27.3222C20.5499 27.1992 20.4064 27.044 20.297 26.8655C20.1876 26.687 20.1144 26.4887 20.0816 26.2819C19.7629 24.2851 18.7427 22.4673 17.2043 21.1549C15.6658 19.8426 13.71 19.1217 11.6878 19.1217C9.66572 19.1217 7.70983 19.8426 6.17141 21.1549C4.63299 22.4673 3.61282 24.2851 3.29409 26.2819C3.26116 26.4887 3.18783 26.687 3.07827 26.8654C2.96872 27.0439 2.82509 27.199 2.65559 27.3219C2.48608 27.4449 2.29403 27.5332 2.09039 27.5819C1.88674 27.6306 1.6755 27.6387 1.46872 27.6058C1.26193 27.5729 1.06366 27.4995 0.88522 27.39C0.706779 27.2804 0.551663 27.1368 0.42873 26.9673C0.305797 26.7978 0.217454 26.6058 0.168744 26.4021C0.120034 26.1985 0.111911 25.9872 0.14484 25.7804C0.441857 23.9224 1.1831 22.1635 2.30557 20.6533C3.42804 19.1431 4.89855 17.9263 6.59209 17.1062C5.85259 16.4106 5.26333 15.571 4.86059 14.6391C4.45786 13.7072 4.25017 12.7027 4.25034 11.6874ZM23.3753 8.49994C24.61 8.5008 25.8178 8.86005 26.8523 9.53407C27.8867 10.2081 28.7033 11.1679 29.2028 12.297C29.7023 13.4261 29.8633 14.6759 29.6663 15.8947C29.4693 17.1136 28.9227 18.249 28.0928 19.1632C29.387 19.8043 30.5369 20.7025 31.4722 21.803C32.4075 22.9035 33.1087 24.1831 33.5328 25.5637C33.6171 25.8316 33.6289 26.117 33.5672 26.391C33.5055 26.6649 33.3723 26.9177 33.1814 27.1236C32.9904 27.3294 32.7483 27.4811 32.4797 27.5632C32.2112 27.6453 31.9257 27.6549 31.6522 27.5909C31.3788 27.5277 31.127 27.3934 30.9221 27.2016C30.7173 27.0098 30.5667 26.7673 30.4856 26.4987C30.1042 25.2669 29.41 24.1551 28.4707 23.2717C27.5314 22.3883 26.3791 21.7634 25.1263 21.4582C24.7784 21.3742 24.4688 21.1755 24.2475 20.8941C24.0262 20.6126 23.9061 20.2649 23.9066 19.9069V19.1589C23.9064 18.8622 23.989 18.5713 24.1452 18.3191C24.3014 18.0668 24.5249 17.8631 24.7906 17.7309C25.4348 17.4117 25.9522 16.884 26.2586 16.2336C26.5651 15.5831 26.6426 14.8482 26.4787 14.1482C26.3148 13.4481 25.919 12.824 25.3556 12.3773C24.7922 11.9306 24.0943 11.6875 23.3753 11.6874C22.9527 11.6874 22.5473 11.5195 22.2484 11.2206C21.9495 10.9218 21.7816 10.5164 21.7816 10.0937C21.7816 9.671 21.9495 9.26562 22.2484 8.96674C22.5473 8.66785 22.9527 8.49994 23.3753 8.49994ZM11.6878 7.43744C11.1219 7.42464 10.559 7.52504 10.0324 7.73275C9.50578 7.94046 9.02595 8.2513 8.6211 8.647C8.21624 9.0427 7.89453 9.5153 7.67483 10.037C7.45514 10.5588 7.3419 11.1192 7.34176 11.6853C7.34162 12.2514 7.45458 12.8118 7.67401 13.3337C7.89344 13.8556 8.21492 14.3283 8.61958 14.7242C9.02423 15.1201 9.50391 15.4312 10.0304 15.6392C10.557 15.8471 11.1197 15.9478 11.6857 15.9353C12.7962 15.9108 13.8529 15.4525 14.6296 14.6585C15.4064 13.8646 15.8415 12.7981 15.8418 11.6874C15.842 10.5767 15.4075 9.51001 14.6311 8.71569C13.8547 7.92138 12.7983 7.46255 11.6878 7.43744Z" fill="#0CA54D" />
  </svg>

);

const ShieldIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.0013 2.83301L5.66797 7.79134V16.9997C5.66797 21.958 10.6263 28.333 17.0013 31.1663C23.3763 29.7497 28.3346 21.958 28.3346 16.9997V7.79134L17.0013 2.83301Z" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const MailIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.66536 28.3337C4.8862 28.3337 4.21942 28.0565 3.66503 27.5021C3.11064 26.9477 2.83298 26.2804 2.83203 25.5003V8.50033C2.83203 7.72116 3.1097 7.05438 3.66503 6.49999C4.22036 5.9456 4.88714 5.66794 5.66536 5.66699H28.332C29.1112 5.66699 29.7784 5.94466 30.3338 6.49999C30.8891 7.05533 31.1663 7.7221 31.1654 8.50033V25.5003C31.1654 26.2795 30.8882 26.9467 30.3338 27.5021C29.7794 28.0574 29.1121 28.3346 28.332 28.3337H5.66536ZM16.9987 18.417L5.66536 11.3337V25.5003H28.332V11.3337L16.9987 18.417ZM16.9987 15.5837L28.332 8.50033H5.66536L16.9987 15.5837ZM5.66536 11.3337V8.50033V25.5003V11.3337Z" fill="#E17100" />
  </svg>

);


// ─── Main Page ────────────────────────────────────────────────────────────────

const FamilyAccessPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Family Access Management</h1>
          <p className={styles.subtitle}>Control and monitor family member access to patient information</p>
        </div>
        <button
          className={styles.inviteFamilyMemberBtn}
          onClick={() => setIsInviteModalOpen(true)}
        >
          <InviteIcon /> Invite Family Member
        </button>
      </div>

      {/* Stats cards */}
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Family Members</p>
            <p className={styles.statValue}>{totalFamilyMembers}</p>
          </div>
          <FamilyIcon />
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Access Links</p>
            <p className={styles.statValue}>{activeAccessLinks}</p>
          </div>
          <ShieldIcon />
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Access Requests</p>
            <p className={styles.statValue}>{accessRequests}</p>
          </div>
          <MailIcon />
        </div>
      </div>

      {/* Active Family Access List */}
      <div className={styles.mainContent}>
        <h2 className={styles.listTitle}>Active Family Access</h2>
        <div className={styles.familyAccessList}>
          {activeFamilyAccess.map((member) => (
            <div key={member.id} className={styles.familyAccessRow}>
              <div className={styles.familyMemberInfo}>
                <div className={styles.initialAvatar}>{member.initial}</div>
                <div className={styles.memberDetails}>
                  <p className={styles.memberName}>{member.name}</p>
                  <p className={styles.memberEmail}>{member.email}</p>
                </div>
              </div>
              <div className={styles.accessDetails}>
                <p className={styles.patientsAccess}>1 patient(s)</p>
                <p className={styles.patientName}>{member.patientName}</p>
              </div>
              <button className={styles.manageBtn}>Manage</button>
            </div>
          ))}

          {activeFamilyAccess.length === 0 && (
            <p className={styles.emptyText}>No active family access found.</p>
          )}
        </div>
      </div>
      <InviteFamilyModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInviteSuccess={(name, email, patientName) => {
          console.log("Family invited:", name, email, patientName);
        }}
      />
    </div>
  );
};

export { FamilyAccessPage };