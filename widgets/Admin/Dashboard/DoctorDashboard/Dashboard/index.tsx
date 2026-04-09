import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type PatientStatus = "Getting Better" | "Stable" | "Being Monitored" | "Critical";

interface StatCard {
  id: number;
  label: string;
  value: number;
  subtext: string;
  icon: "patients" | "critical" | "updates" | "attention";
}

interface CriticalPatient {
  id: number;
  name: string;
  ward: string;
  bed: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
  ward: string;
  bed: string;
  diagnosis: string;
  status: PatientStatus;
  updatedAgo: string;
  needsUpdate?: boolean;
}

interface QuickAction {
  id: number;
  icon: "pulse" | "notes" | "handover" | "emergency";
  title: string;
  subtitle: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { id: 1, label: "My Patients",        value: 8, subtext: "8 currently active",          icon: "patients"   },
  { id: 2, label: "Critical/Emergency", value: 3, subtext: "Requires immediate attention", icon: "critical"   },
  { id: 3, label: "Updates Today",      value: 6, subtext: "30 total updates",             icon: "updates"    },
  { id: 4, label: "Needs Attention",    value: 4, subtext: "Update pending > 12 hours",    icon: "attention"  },
];

const criticalPatients: CriticalPatient[] = [
  { id: 1, name: "Mary Ochieng",  ward: "General Ward B",    bed: "Bed B-08" },
  { id: 2, name: "Grace Mwangi", ward: "Maternity Ward",    bed: "Bed M-15" },
  { id: 3, name: "Samuel Banda", ward: "Cardiac Care Unit", bed: "Bed C-03" },
];

const patients: Patient[] = [
  { id: 1, name: "John Eze",     age: 45, gender: "M", ward: "ICU – Ward C",        bed: "Bed 17",  diagnosis: "Pneumonia with complications",        status: "Getting Better",  updatedAgo: "10h ago"  },
  { id: 2, name: "Mary Ochieng", age: 32, gender: "F", ward: "General Ward B",      bed: "Bed B-08",diagnosis: "Post-surgical recovery (Appendectomy)", status: "Stable",          updatedAgo: "12h ago"  },
  { id: 3, name: "Samuel Banda", age: 37, gender: "M", ward: "Cardiac Care Unit",   bed: "Bed C-03",diagnosis: "Cardiac arrhythmia",                   status: "Being Monitored", updatedAgo: "16h ago", needsUpdate: true },
  { id: 4, name: "Grace Mwangi", age: 28, gender: "F", ward: "Maternity Ward",      bed: "Bed M-15",diagnosis: "Post-delivery monitoring",              status: "Getting Better",  updatedAgo: "5h ago"   },
];

const quickActions: QuickAction[] = [
  { id: 1, icon: "pulse",     title: "Quick Update",   subtitle: "Update patient status" },
  { id: 2, icon: "notes",     title: "Clinical Notes", subtitle: "View and add notes"    },
  { id: 3, icon: "handover",  title: "Shift Handover", subtitle: "Handover notes"        },
  { id: 4, icon: "emergency", title: "Emergencies",    subtitle: "3 active"              },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const PatientsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TriangleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const PulseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ClockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const NotesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const HandoverIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const FlagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const quickActionIcon = (icon: QuickAction["icon"]) => {
  switch (icon) {
    case "pulse":     return <PulseIcon />;
    case "notes":     return <NotesIcon />;
    case "handover":  return <HandoverIcon />;
    case "emergency": return <FlagIcon />;
  }
};

const statIcon = (icon: StatCard["icon"]) => {
  switch (icon) {
    case "patients":   return <PatientsIcon />;
    case "critical":   return <TriangleIcon />;
    case "updates":    return <PulseIcon />;
    case "attention":  return <ClockIcon size={22} />;
  }
};

// ─── Status badge ──────────────────────────────────────────────────────────────

const statusClass: Record<PatientStatus, string> = {
  "Getting Better":  styles.statusBlue,
  "Stable":          styles.statusGreen,
  "Being Monitored": styles.statusOrange,
  "Critical":        styles.statusRed,
};

const StatusBadge: React.FC<{ status: PatientStatus }> = ({ status }) => (
  <span className={`${styles.badge} ${statusClass[status]}`}>{status}</span>
);

// ─── Stat card icon colour ─────────────────────────────────────────────────────

const iconColorClass: Record<StatCard["icon"], string> = {
  patients:  styles.iconGreen,
  critical:  styles.iconRed,
  updates:   styles.iconBlue,
  attention: styles.iconOrange,
};

// ─── Main Component ───────────────────────────────────────────────────────────

const DocDashboardPage: React.FC = () => {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className={styles.wrapper}>

      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.avatar}>
            <PatientsIcon />
          </div>
          <div>
            <h1 className={styles.pageTitle}>Doctor Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome back, Dr.</p>
          </div>
        </div>
        <span className={styles.dateLabel}>{today}</span>
      </div>

      {/* ── Stats grid ── */}
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.id} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={`${styles.statIcon} ${iconColorClass[s.icon]}`}>{statIcon(s.icon)}</span>
            </div>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statSubtext}>{s.subtext}</span>
          </div>
        ))}
      </div>

      {/* ── Critical patients ── */}
      <div className={styles.criticalBox}>
        <div className={styles.criticalHeader}>
          <span className={styles.criticalIcon}><TriangleIcon /></span>
          <h2 className={styles.criticalTitle}>Critical Patients Requiring Urgent Attention</h2>
        </div>
        <div className={styles.criticalList}>
          {criticalPatients.map((p, i) => (
            <div key={p.id} className={`${styles.criticalRow} ${i < criticalPatients.length - 1 ? styles.criticalRowBorder : ""}`}>
              <div>
                <p className={styles.criticalName}>{p.name}</p>
                <p className={styles.criticalSub}>{p.ward} • {p.bed}</p>
              </div>
              <div className={styles.criticalActions}>
                <button className={styles.btnView}>View</button>
                <button className={styles.btnUpdate}>Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className={styles.quickGrid}>
        {quickActions.map((a) => (
          <button key={a.id} className={styles.quickCard}>
            <span className={`${styles.quickIcon} ${a.icon === "emergency" ? styles.iconRed : styles.iconBlue}`}>
              {quickActionIcon(a.icon)}
            </span>
            <p className={styles.quickTitle}>{a.title}</p>
            <p className={styles.quickSub}>{a.subtitle}</p>
          </button>
        ))}
      </div>

      {/* ── Bottom panels ── */}
      <div className={styles.bottomGrid}>

        {/* Needs Update */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderLeft}>
              <span className={styles.iconOrange}><ClockIcon size={17} /></span>
              <h3 className={styles.panelTitle}>Needs Update</h3>
            </div>
            <span className={styles.panelBadge}>{patients.filter(p => p.needsUpdate).length + 3}</span>
          </div>
          <div className={styles.panelList}>
            {patients.filter(p => p.needsUpdate).map(p => (
              <div key={p.id} className={styles.miniRow}>
                <div>
                  <p className={styles.miniName}>{p.name}</p>
                  <p className={styles.miniSub}>{p.ward} • {p.bed}</p>
                </div>
                <span className={`${styles.badge} ${styles.statusOrange}`}>Overdue</span>
              </div>
            ))}
            {/* placeholder filler rows */}
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.miniRow}>
                <div>
                  <p className={styles.miniName}>Patient —</p>
                  <p className={styles.miniSub}>Ward • Bed</p>
                </div>
                <span className={`${styles.badge} ${styles.statusOrange}`}>Overdue</span>
              </div>
            ))}
          </div>
        </div>

        {/* My Patients */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderLeft}>
              <span className={styles.iconBlue}><PulseIcon /></span>
              <h3 className={styles.panelTitle}>My Recent Updates</h3>
            </div>
            <span className={styles.panelBadge}>3</span>
          </div>
          <div className={styles.panelList}>
            {patients.slice(0, 3).map(p => (
              <div key={p.id} className={styles.miniRow}>
                <div>
                  <p className={styles.miniName}>{p.name}</p>
                  <p className={styles.miniSub}>{p.age}y, {p.gender} • {p.ward} • {p.bed}</p>
                  <p className={styles.miniDiag}>{p.diagnosis}</p>
                  <p className={`${styles.miniTime} ${p.needsUpdate ? styles.miniTimeWarn : ""}`}>
                    <ClockIcon size={12} /> Updated {p.updatedAgo} {p.needsUpdate ? "(Needs update)" : ""}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export { DocDashboardPage };