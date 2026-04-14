import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  id: number;
  label: string;
  value: number;
  subtext: string;
  icon: "patients" | "staff" | "critical" | "updates";
}

interface StatusDistribution {
  label: string;
  count: number;
  colorClass: string;
  bgClass: string;
}

interface ActivityEntry {
  id: number;
  name: string;
  action: string;
  target: string;
  date: string;
  role: "doctor" | "nurse" | "admin";
}

interface SystemAlert {
  id: number;
  type: "warning" | "info";
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { id: 1, label: "Total Patients", value: 40, subtext: "40 currently admitted",  icon: "patients" },
  { id: 2, label: "Medical Staff",  value: 25, subtext: "10 doctors, 15 nurses",  icon: "staff"    },
  { id: 3, label: "Critical Cases", value: 5,  subtext: "5 emergency flags active", icon: "critical" },
  { id: 4, label: "Updates Today",  value: 20, subtext: "Last update: 2:30 pm",   icon: "updates"  },
];

const statusDistribution: StatusDistribution[] = [
  { label: "Stable",          count: 15, colorClass: styles.distGreen,  bgClass: styles.distBgGreen  },
  { label: "Being Monitored", count: 15, colorClass: styles.distOrange, bgClass: styles.distBgOrange },
  { label: "Critical",        count: 5,  colorClass: styles.distRed,    bgClass: styles.distBgRed    },
  { label: "Getting Better",  count: 10, colorClass: styles.distBlue,   bgClass: styles.distBgBlue   },
  { label: "Discharged",      count: 10, colorClass: styles.distGray,   bgClass: styles.distBgGray   },
];

const recentActivity: ActivityEntry[] = [
  { id: 1, name: "Dr. Tobenna Obi",   action: "Updated patient status to", target: "Getting Better", date: "9 Feb 2026, 2:30", role: "doctor" },
  { id: 2, name: "Dr. Kwame Mensah",  action: "Updated patient status to", target: "Stable",         date: "9 Feb 2026, 2:15", role: "doctor" },
  { id: 3, name: "Nurse Chisom Okeke",action: "Updated patient status to", target: "Critical",       date: "9 Feb 2026, 2:10", role: "nurse"  },
  { id: 4, name: "Amara Okafor",      action: "New patient admitted to",   target: "Maternity Ward", date: "9 Feb 2026, 2:00", role: "admin"  },
];

const systemAlerts: SystemAlert[] = [
  { id: 1, type: "warning", title: "Pending Family Member Invitations", description: "3 patients' family members haven't accepted invitations" },
  { id: 2, type: "warning", title: "Pending Staff Invitation",          description: "1 staff hasn't accepted invitations"                     },
  { id: 3, type: "info",    title: "Security Update Available",         description: "New security features ready for deployment"              },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const PatientsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const StaffIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);

const TriangleIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const PulseIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const PersonPlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const statIcon = (icon: StatCard["icon"]) => {
  switch (icon) {
    case "patients": return <PatientsIcon />;
    case "staff":    return <StaffIcon />;
    case "critical": return <TriangleIcon />;
    case "updates":  return <PulseIcon />;
  }
};

const iconColorClass: Record<StatCard["icon"], string> = {
  patients: styles.iconBlue,
  staff:    styles.iconGreen,
  critical: styles.iconRed,
  updates:  styles.iconOrange,
};

// ─── Activity Avatar ──────────────────────────────────────────────────────────

const ActivityAvatar = () => (
  <div className={styles.activityAvatar}>
    <PulseIcon size={16} />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminDashboardPage: React.FC = () => {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  const todayMobile = new Date().toLocaleDateString("en-GB", { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className={styles.wrapper}>

      {/* ── Desktop top bar ── */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Hospital Overview</h1>
          <p className={styles.pageSubtitle}>Real-time monitoring of patient care and hospital operations.</p>
        </div>
        <span className={styles.dateLabel}>{today}</span>
      </div>

      {/* ── Mobile date ── */}
      <p className={styles.mobileDateLabel}>{todayMobile}</p>

      {/* ── Stats (horizontal scroll on mobile) ── */}
      <div className={styles.statsScrollWrapper}>
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
      </div>

      {/* ── Patient Status Distribution (desktop only) ── */}
      <div className={styles.distributionCard}>
        <h2 className={styles.cardTitle}>Patient Status Distribution</h2>
        <div className={styles.distributionGrid}>
          {statusDistribution.map((d) => (
            <div key={d.label} className={`${styles.distBox} ${d.bgClass}`}>
              <span className={`${styles.distCount} ${d.colorClass}`}>{d.count}</span>
              <span className={`${styles.distLabel} ${d.colorClass}`}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Quick Actions ── */}
      <div className={styles.mobileQuickActions}>
        <h2 className={styles.cardTitle}>Quick Actions</h2>
        <div className={styles.quickActionsRow}>
          <button className={styles.btnAdmit}>
            <PlusIcon />
            Admit Patient
          </button>
          <button className={styles.btnInvite}>
            <PersonPlusIcon />
            Invite Staff
          </button>
        </div>
      </div>

      {/* ── Bottom two-col grid ── */}
      <div className={styles.bottomGrid}>

        {/* Recent Activity */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Recent Activity</h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>

          <div className={styles.activityList}>
            {recentActivity.map((entry) => (
              <div key={entry.id} className={styles.activityRow}>
                <ActivityAvatar />
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <strong>{entry.name}</strong> {entry.action} {entry.target}
                  </p>
                  <p className={styles.activityDate}>{entry.date}</p>
                </div>
                <span className={styles.rolePill}>{entry.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>System Alerts</h3>
            <span className={styles.alertBadge}>{systemAlerts.length} Active</span>
          </div>

          <div className={styles.alertList}>
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${styles.alertRow} ${alert.type === "warning" ? styles.alertWarning : styles.alertInfo}`}
              >
                <span className={`${styles.alertIcon} ${alert.type === "warning" ? styles.alertIconWarning : styles.alertIconInfo}`}>
                  {alert.type === "warning" ? <TriangleIcon size={18} /> : <ShieldIcon />}
                </span>
                <div>
                  <p className={styles.alertTitle}>{alert.title}</p>
                  <p className={`${styles.alertDesc} ${alert.type === "warning" ? styles.alertDescWarning : styles.alertDescInfo}`}>
                    {alert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export { AdminDashboardPage };