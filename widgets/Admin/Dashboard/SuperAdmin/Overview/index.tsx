"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type HospitalStatus = "Pending" | "Active";

interface NeedsActionItem {
  id: number;
  name: string;
  location: string;
}

interface RecentHospital {
  id: number;
  name: string;
  type: string;
  status: HospitalStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const needsActionList: NeedsActionItem[] = [
  { id: 1, name: "Kauna Maternity Hospital", location: "Jos, Nigeria" },
  { id: 2, name: "Living Spring Specialist Hospital", location: "Ibadan, Nigeria" },
  { id: 3, name: "Apex Medical Centre", location: "Abuja, Nigeria" },
  { id: 4, name: "Unity Health Clinic", location: "Lagos, Nigeria" },
];

const recentHospitals: RecentHospital[] = [
  { id: 1, name: "Kauna Maternity Hospital", type: "Specialist Hospital", status: "Pending" },
  { id: 2, name: "Enugu General Hospital", type: "Public", status: "Active" },
  { id: 3, name: "Healthy Hearts Clinic", type: "Specialist Hospital", status: "Pending" },
  { id: 4, name: "Plateau General Hospital", type: "Public", status: "Active" },
];

const chartData = [
  { week: "Week 1", value: 12 },
  { week: "Week 2", value: 14 },
  { week: "Week 3", value: 18 },
  { week: "Week 4", value: 23 },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const HospitalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#015DDD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E17100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0CA54D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#015DDD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="7 17 17 7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0CA54D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

// ─── Sparkline Chart ──────────────────────────────────────────────────────────

const LineChart: React.FC = () => {
  const width = 560;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const maxVal = 24;
  const yTicks = [0, 6, 12, 18, 24];

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const toX = (i: number) => paddingLeft + (i / (chartData.length - 1)) * chartW;
  const toY = (v: number) => paddingTop + chartH - (v / maxVal) * chartH;

  const pathD = chartData
    .map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(d.value)}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${toX(chartData.length - 1)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#015DDD" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#015DDD" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y-axis gridlines + labels */}
      {yTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={paddingLeft}
            y1={toY(tick)}
            x2={width - paddingRight}
            y2={toY(tick)}
            stroke="#E4E9EB"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x={paddingLeft - 8}
            y={toY(tick) + 4}
            textAnchor="end"
            fontSize="11"
            fill="#8A9099"
            fontFamily="inherit"
          >
            {tick}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {chartData.map((d, i) => (
        <text
          key={d.week}
          x={toX(i)}
          y={height - 8}
          textAnchor="middle"
          fontSize="11"
          fill="#8A9099"
          fontFamily="inherit"
        >
          {d.week}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaD} fill="url(#areaGrad)" />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke="#015DDD"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      {chartData.map((d, i) => (
        <circle
          key={i}
          cx={toX(i)}
          cy={toY(d.value)}
          r="5"
          fill="#015DDD"
          stroke="#fff"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const SuperAdminOverviewPage: React.FC = () => {
  const [reviewedIds, setReviewedIds] = useState<number[]>([]);

  const handleReview = (id: number) => {
    setReviewedIds((prev) => [...prev, id]);
  };

  return (
    <div className={styles.wrapper}>

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Overview</h1>
          <p className={styles.pageSubtitle}>Current Shift - Nurse Fatima Ibrahim</p>
        </div>
        <div className={styles.topBarRight}>
          <button className={styles.bellBtn} aria-label="Notifications">
            <BellIcon />
            <span className={styles.bellDot} />
          </button>
          <div className={styles.userChip}>
            <div className={styles.userAvatar}>J</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>John Sunday</span>
              <span className={styles.userRole}>Super Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────────── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardLeft}>
            <p className={styles.statLabel}>Total Hospitals</p>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>124</span>
              <span className={styles.statBadgeGreen}>
                <TrendUpIcon /> +12%
              </span>
            </div>
          </div>
          <div className={styles.statIcon}><HospitalIcon /></div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardLeft}>
            <p className={styles.statLabel}>Pending Reviews</p>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>4</span>
              <span className={styles.statBadgeOrange}>Needs action</span>
            </div>
          </div>
          <div className={styles.statIcon}><ClockIcon /></div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardLeft}>
            <p className={styles.statLabel}>Verified Hospitals</p>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>110</span>
              <span className={styles.statBadgeGreen}>Active</span>
            </div>
          </div>
          <div className={styles.statIcon}><ShieldCheckIcon /></div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardLeft}>
            <p className={styles.statLabel}>New This Week</p>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>5</span>
            </div>
          </div>
          <div className={styles.statIcon}><ArrowUpRightIcon /></div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className={styles.mainGrid}>

        {/* Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.cardTitle}>Hospital Onboarding Trends</h2>
          <div className={styles.chartWrapper}>
            <LineChart />
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightColumn}>

          {/* Needs Action */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <h2 className={styles.cardTitle}>Needs Action</h2>
              <span className={styles.pendingBadge}>{needsActionList.length} Pending</span>
            </div>
            <div className={styles.needsActionList}>
              {needsActionList.map((item) => (
                <div key={item.id} className={styles.needsActionItem}>
                  <div>
                    <p className={styles.hospitalName}>{item.name}</p>
                    <p className={styles.hospitalLocation}>{item.location}</p>
                  </div>
                  <button
                    className={`${styles.reviewBtn} ${reviewedIds.includes(item.id) ? styles.reviewedBtn : ""}`}
                    onClick={() => handleReview(item.id)}
                    disabled={reviewedIds.includes(item.id)}
                  >
                    {reviewedIds.includes(item.id) ? "Reviewed" : "Review Application"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <h2 className={styles.cardTitle}>Recently Added</h2>
              <span className={styles.countBadge}>{recentHospitals.length}</span>
            </div>
            <div className={styles.recentList}>
              {recentHospitals.map((h) => (
                <div key={h.id} className={styles.recentItem}>
                  <div>
                    <p className={styles.hospitalName}>{h.name}</p>
                    <p className={styles.hospitalLocation}>{h.type}</p>
                  </div>
                  <span className={h.status === "Active" ? styles.statusActive : styles.statusPending}>
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export { SuperAdminOverviewPage };