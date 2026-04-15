// "use client";

// import { useState } from "react";
// import styles from "./style.module.css";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

// interface StatCard {
//   id: number;
//   label: string;
//   value: number;
//   subtext: string;
//   icon: "patients" | "critical" | "updates" | "attention";
// }

// interface CriticalPatient {
//   id: number;
//   name: string;
//   ward: string;
//   bed: string;
// }

// interface NeedsUpdatePatient {
//   id: number;
//   name: string;
//   ward: string;
//   bed: string;
//   lastUpdateAgo: string;
// }

// interface RecentUpdate {
//   id: number;
//   name: string;
//   status: PatientStatus;
//   note: string;
//   time: string;
// }

// interface QuickAction {
//   id: number;
//   icon: "pulse" | "notes" | "handover" | "emergency";
//   title: string;
//   subtitle: string;
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const EMERGENCY_COUNT = 0; // set to > 0 to show critical patients section

// const stats: StatCard[] = [
//   { id: 1, label: "My Patients",        value: 8,               subtext: "8 currently active",          icon: "patients"  },
//   { id: 2, label: "Critical/Emergency", value: EMERGENCY_COUNT, subtext: "Requires immediate attention", icon: "critical"  },
//   { id: 3, label: "Updates Today",      value: 6,               subtext: "30 total updates",             icon: "updates"   },
//   { id: 4, label: "Needs Attention",    value: 4,               subtext: "Update pending > 12 hours",    icon: "attention" },
// ];

// const criticalPatients: CriticalPatient[] = [
//   { id: 1, name: "Mary Ochieng",  ward: "General Ward B",    bed: "Bed B-08" },
//   { id: 2, name: "Grace Mwangi", ward: "Maternity Ward",    bed: "Bed M-15" },
//   { id: 3, name: "Samuel Banda", ward: "Cardiac Care Unit", bed: "Bed C-03" },
// ];

// const quickActions: QuickAction[] = [
//   { id: 1, icon: "pulse",     title: "Quick Update",   subtitle: "Update patient status" },
//   { id: 2, icon: "notes",     title: "Clinical Notes", subtitle: "View and add notes"    },
//   { id: 3, icon: "handover",  title: "Shift Handover", subtitle: "Handover notes"        },
//   { id: 4, icon: "emergency", title: "Emergencies",    subtitle: `${EMERGENCY_COUNT} active` },
// ];

// const needsUpdatePatients: NeedsUpdatePatient[] = [
//   { id: 1, name: "John Eze",     ward: "ICU - Ward C",      bed: "Bed 17", lastUpdateAgo: "20h ago" },
//   { id: 2, name: "Mary Ochieng", ward: "General Ward B",    bed: "B-08",   lastUpdateAgo: "21h ago" },
//   { id: 3, name: "Samuel Banda", ward: "Cardiac Care Unit", bed: "C-03",   lastUpdateAgo: "22h ago" },
//   { id: 4, name: "Grace Mwangi", ward: "Maternity Ward",    bed: "M-15",   lastUpdateAgo: "13h ago" },
// ];

// const recentUpdates: RecentUpdate[] = [
//   {
//     id: 1,
//     name: "Kachi Onyema",
//     status: "Getting Better",
//     note: "Patient showing significant improvement. Oxygen saturation stable at 95%. Reduced fever. Continue current medication.",
//     time: "30 mins ago",
//   },
//   {
//     id: 2,
//     name: "Chukwudi Okafor",
//     status: "Being Monitored",
//     note: "Heart rhythm showing improvement. Continue monitoring. ECG scheduled for tomorrow.",
//     time: "40 mins ago",
//   },
//   {
//     id: 3,
//     name: "Amara Nwosu",
//     status: "Stable",
//     note: "Vitals stable. Blood pressure normalized. Awaiting specialist review.",
//     time: "1 hr ago",
//   },
// ];

// // ─── Icons ────────────────────────────────────────────────────────────────────

// const PatientsIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// );

// const TriangleIcon = ({ size = 20 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
//     <line x1="12" y1="9" x2="12" y2="13" />
//     <line x1="12" y1="17" x2="12.01" y2="17" />
//   </svg>
// );

// const PulseIcon = ({ size = 20 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//   </svg>
// );

// const ClockIcon = ({ size = 16 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
// );

// const NotesIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="16" y1="13" x2="8" y2="13" />
//     <line x1="16" y1="17" x2="8" y2="17" />
//   </svg>
// );

// const HandoverIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//   </svg>
// );

// const FlagIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
//     <line x1="4" y1="22" x2="4" y2="15" />
//   </svg>
// );

// const quickActionIcon = (icon: QuickAction["icon"]) => {
//   switch (icon) {
//     case "pulse":     return <PulseIcon />;
//     case "notes":     return <NotesIcon />;
//     case "handover":  return <HandoverIcon />;
//     case "emergency": return <FlagIcon />;
//   }
// };

// const statIcon = (icon: StatCard["icon"]) => {
//   switch (icon) {
//     case "patients":  return <PatientsIcon />;
//     case "critical":  return <TriangleIcon />;
//     case "updates":   return <PulseIcon />;
//     case "attention": return <ClockIcon size={20} />;
//   }
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const statusClass: Record<PatientStatus, string> = {
//   "Getting Better":  styles.statusBlue,
//   "Stable":          styles.statusGreen,
//   "Being Monitored": styles.statusOrange,
//   "Critical":        styles.statusRed,
// };

// const StatusBadge: React.FC<{ status: PatientStatus }> = ({ status }) => (
//   <span className={`${styles.badge} ${statusClass[status]}`}>{status}</span>
// );

// const iconColorClass: Record<StatCard["icon"], string> = {
//   patients:  styles.iconGreen,
//   critical:  styles.iconRed,
//   updates:   styles.iconBlue,
//   attention: styles.iconOrange,
// };

// // ─── Component ────────────────────────────────────────────────────────────────

// const NurseDashboardPage: React.FC = () => {
//   const today = new Date().toLocaleDateString("en-GB", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//   });

//   const hasEmergencies = EMERGENCY_COUNT > 0;

//   return (
//     <div className={styles.wrapper}>

//       {/* Top bar */}
//       <div className={styles.topBar}>
//         <div className={styles.topBarLeft}>
//           <div className={styles.avatar}>
//             <PatientsIcon />
//           </div>
//           <div>
//             <h1 className={styles.pageTitle}>Doctor Dashboard</h1>
//             <p className={styles.pageSubtitle}>Welcome back, Dr.</p>
//           </div>
//         </div>
//         <span className={styles.dateLabel}>{today}</span>
//       </div>

//       {/* Stats — horizontal scroll at specified breakpoints */}
//       <div className={styles.statsScrollWrapper}>
//         <div className={styles.statsGrid}>
//           {stats.map((s) => (
//             <div key={s.id} className={styles.statCard}>
//               <div className={styles.statTop}>
//                 <span className={styles.statLabel}>{s.label}</span>
//                 <span className={`${styles.statIcon} ${iconColorClass[s.icon]}`}>
//                   {statIcon(s.icon)}
//                 </span>
//               </div>
//               <span className={styles.statValue}>{s.value}</span>
//               <span className={styles.statSubtext}>{s.subtext}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Critical patients — only shown when EMERGENCY_COUNT > 0 */}
//       {hasEmergencies && (
//         <div className={styles.criticalBox}>
//           <div className={styles.criticalHeader}>
//             <span className={styles.criticalIcon}><TriangleIcon size={18} /></span>
//             <h2 className={styles.criticalTitle}>Critical Patients Requiring Urgent Attention</h2>
//           </div>
//           <div className={styles.criticalList}>
//             {criticalPatients.map((p, i) => (
//               <div
//                 key={p.id}
//                 className={`${styles.criticalRow} ${i < criticalPatients.length - 1 ? styles.criticalRowBorder : ""}`}
//               >
//                 <div>
//                   <p className={styles.criticalName}>{p.name}</p>
//                   <p className={styles.criticalSub}>{p.ward} • {p.bed}</p>
//                 </div>
//                 <div className={styles.criticalActions}>
//                   <button className={styles.btnView}>View</button>
//                   <button className={styles.btnUpdateRed}>Update</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Quick actions */}
//       <div className={styles.quickGrid}>
//         {quickActions.map((a) => (
//           <button key={a.id} className={styles.quickCard}>
//             <span className={`${styles.quickIcon} ${a.icon === "emergency" ? styles.iconRed : styles.iconBlue}`}>
//               {quickActionIcon(a.icon)}
//             </span>
//             <p className={styles.quickTitle}>{a.title}</p>
//             <p className={styles.quickSub}>{a.subtitle}</p>
//           </button>
//         ))}
//       </div>

//       {/* Bottom panels */}
//       <div className={styles.bottomGrid}>

//         {/* Needs Update */}
//         <div className={styles.panel}>
//           <div className={styles.panelHeader}>
//             <div className={styles.panelHeaderLeft}>
//               <span className={styles.iconOrange}><ClockIcon size={16} /></span>
//               <h3 className={styles.panelTitle}>Needs Update</h3>
//             </div>
//             <span className={styles.panelBadge}>{needsUpdatePatients.length}</span>
//           </div>

//           <div className={styles.updateList}>
//             {needsUpdatePatients.map((p) => (
//               <div key={p.id} className={styles.updateRow}>
//                 <div>
//                   <p className={styles.updateName}>{p.name}</p>
//                   <p className={styles.updateSub}>{p.ward} · {p.bed}</p>
//                   <p className={styles.updateTime}>Last update {p.lastUpdateAgo}</p>
//                 </div>
//                 <button className={styles.btnUpdateDark}>Update</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* My Recent Updates */}
//         <div className={styles.panel}>
//           <div className={styles.panelHeader}>
//             <div className={styles.panelHeaderLeft}>
//               <span className={styles.iconBlue}><PulseIcon size={16} /></span>
//               <h3 className={styles.panelTitle}>My Recent Updates</h3>
//             </div>
//             <span className={styles.panelBadge}>{recentUpdates.length}</span>
//           </div>

//           <div className={styles.recentList}>
//             {recentUpdates.map((r) => (
//               <div key={r.id} className={styles.recentCard}>
//                 <div className={styles.recentCardTop}>
//                   <p className={styles.recentName}>{r.name}</p>
//                   <StatusBadge status={r.status} />
//                 </div>
//                 <p className={styles.recentNote}>{r.note}</p>
//                 <p className={styles.recentTime}>{r.time}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export { NurseDashboardPage };


"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

interface StatCard {
  id: number;
  label: string;
  value: string | number; // Changed to string to allow "<5 min"
  icon: "patients" | "critical" | "updates" | "clock"; // Changed icon type
}

interface QuickPatientUpdate {
  id: number;
  name: string;
  location: string;
  status: PatientStatus;
}

interface RecentUpdate {
  id: number;
  name: string;
  note: string;
  time: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { id: 1, label: "Assigned Patients", value: 6, icon: "patients" },
  { id: 2, label: "Emergency Alerts", value: 0, icon: "critical" },
  { id: 3, label: "Updates Today", value: 8, icon: "updates" },
  { id: 4, label: "Avg Response Time", value: "<5 min", icon: "clock" },
];

const quickPatientUpdates: QuickPatientUpdate[] = [
  { id: 1, name: "John Eze", location: "ICU - Ward C • Bed 17", status: "Being Monitored" },
  { id: 2, name: "Mary Ochieng", location: "General Ward B • Bed B-08", status: "Getting Better" },
  { id: 3, name: "Grace Mwangi", location: "Maternity Ward • Bed M-15", status: "Stable" },
];

const myRecentUpdates: RecentUpdate[] = [
  {
    id: 1,
    name: "John Eze",
    note: "Night shift update: Patient rested well. Minimal coughing. Vitals stable.",
    time: "2 mins ago",
  },
  {
    id: 2,
    name: "Mary Ochieng",
    note: "Recovery progressing well. Patient mobile and eating normally. Pain management effective.",
    time: "9 mins ago",
  },
  {
    id: 3,
    name: "Grace Mwangi",
    note: "Mother and baby doing well. Breastfeeding established. Discharge planned for tomorrow.",
    time: "18 mins ago",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const AssignedPatientsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TriangleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const PulseIcon = ({ size = 20 }: { size?: number }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//   </svg>
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_10702_7416)">
<path d="M3.79365 13.2804C3.61414 13.281 3.43814 13.2307 3.28609 13.1352C3.13405 13.0398 3.01221 12.9032 2.93472 12.7413C2.85724 12.5793 2.82729 12.3987 2.84835 12.2205C2.86942 12.0422 2.94063 11.8736 3.05373 11.7342L12.445 2.05827C12.5155 1.97695 12.6115 1.922 12.7173 1.90244C12.8231 1.88288 12.9324 1.89986 13.0272 1.9506C13.1221 2.00135 13.1969 2.08283 13.2393 2.18169C13.2818 2.28055 13.2894 2.3909 13.2608 2.49463L11.4395 8.2053C11.3858 8.34904 11.3678 8.50366 11.3869 8.6559C11.4061 8.80814 11.4619 8.95346 11.5496 9.07938C11.6373 9.20531 11.7542 9.30808 11.8904 9.37889C12.0265 9.4497 12.1778 9.48643 12.3312 9.48593H18.9715C19.151 9.48532 19.327 9.53566 19.4791 9.63109C19.6311 9.72653 19.753 9.86315 19.8304 10.0251C19.9079 10.187 19.9379 10.3676 19.9168 10.5459C19.8957 10.7241 19.8245 10.8928 19.7114 11.0322L10.3201 20.7081C10.2497 20.7894 10.1537 20.8443 10.0479 20.8639C9.9421 20.8835 9.8328 20.8665 9.73794 20.8157C9.64307 20.765 9.56827 20.6835 9.52582 20.5846C9.48337 20.4858 9.47579 20.3754 9.50432 20.2717L11.3257 14.561C11.3794 14.4173 11.3974 14.2627 11.3782 14.1104C11.359 13.9582 11.3032 13.8129 11.2155 13.687C11.1279 13.561 11.0109 13.4583 10.8748 13.3874C10.7387 13.3166 10.5874 13.2799 10.434 13.2804H3.79365Z" stroke="#E17100" stroke-width="1.89723" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_10702_7416">
<rect width="22.7668" height="22.7668" fill="white"/>
</clipPath>
</defs>
</svg>

);

const ClockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const statIcon = (icon: StatCard["icon"]) => {
  switch (icon) {
    case "patients": return <AssignedPatientsIcon />;
    case "critical": return <TriangleIcon />;
    case "updates": return <PulseIcon />;
    case "clock": return <ClockIcon size={20} />;
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusClass: Record<PatientStatus, string> = {
  "Getting Better": styles.statusBlue,
  "Stable": styles.statusGreen,
  "Being Monitored": styles.statusOrange,
  "Critical": styles.statusRed,
};

const StatusBadge: React.FC<{ status: PatientStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${statusClass[status]}`}>{status}</span>
);

const iconColorClass: Record<StatCard["icon"], string> = {
  patients: styles.iconGreen,
  critical: styles.iconRed,
  updates: styles.iconBlue,
  clock: styles.iconGrey, // New icon color for Avg Response Time
};

// ─── Component ────────────────────────────────────────────────────────────────

const NurseDashboardPage: React.FC = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className={styles.wrapper}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div>
            <h1 className={styles.pageTitle}>Nurse Dashboard</h1>
            <p className={styles.pageSubtitle}>Current Shift - Nurse Fatima Ibrahim</p>
          </div>
        </div>
        <span className={styles.dateLabel}>{today}</span>
      </div>

      {/* Stats — horizontal scroll at specified breakpoints */}
      <div className={styles.statsScrollWrapper}>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.id} className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={`${styles.statIcon} ${iconColorClass[s.icon]}`}>
                  {statIcon(s.icon)}
                </span>
              </div>
              <span className={styles.statValue}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Patient Updates */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderLeft}>
          <PulseIcon size={18} />
          <h2 className={styles.sectionTitle}>Quick Patient Updates</h2>
        </div>
        <button className={styles.viewAllBtn}>View All Patients</button>
      </div>

      <div className={styles.quickUpdatesGrid}>
        {quickPatientUpdates.map((p) => (
          <div key={p.id} className={styles.quickUpdateCard}>
            <div className={styles.quickUpdateInfo}>
              <p className={styles.quickUpdateName}>{p.name}</p>
              <StatusBadge status={p.status} />
            </div>
            <p className={styles.quickUpdateLocation}>{p.location}</p>
            <button className={styles.quickUpdateBtn}>+ Quick Update</button>
          </div>
        ))}
      </div>

      {/* My Recent Updates */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Recent Updates</h2>
      </div>

      <div className={styles.recentList}>
        {myRecentUpdates.map((r) => (
          <div key={r.id} className={styles.recentCard}>
            <div className={styles.recentCardTop}>
              <p className={styles.recentName}>{r.name}</p>
              <p className={styles.recentTime}>{r.time}</p>
            </div>
            <p className={styles.recentNote}>{r.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NurseDashboardPage };