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
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 31.1673V5.66732C8.5 4.91587 8.79851 4.1952 9.32986 3.66385C9.86122 3.1325 10.5819 2.83398 11.3333 2.83398H22.6667C23.4181 2.83398 24.1388 3.1325 24.6701 3.66385C25.2015 4.1952 25.5 4.91587 25.5 5.66732V31.1673H8.5Z" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.4987 17H5.66536C4.91392 17 4.19325 17.2985 3.6619 17.8299C3.13054 18.3612 2.83203 19.0819 2.83203 19.8333V28.3333C2.83203 29.0848 3.13054 29.8054 3.6619 30.3368C4.19325 30.8682 4.91392 31.1667 5.66536 31.1667H8.4987" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.5 12.75H28.3333C29.0848 12.75 29.8054 13.0485 30.3368 13.5799C30.8682 14.1112 31.1667 14.8319 31.1667 15.5833V28.3333C31.1667 29.0848 30.8682 29.8054 30.3368 30.3368C29.8054 30.8682 29.0848 31.1667 28.3333 31.1667H25.5" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.168 8.5H19.8346" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.168 14.166H19.8346" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.168 19.834H19.8346" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.168 25.5H19.8346" stroke="#015DDD" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const ClockIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9987 2.83398C24.8229 2.83398 31.1654 9.1764 31.1654 17.0007C31.1654 24.8249 24.8229 31.1673 16.9987 31.1673C9.17445 31.1673 2.83203 24.8249 2.83203 17.0007C2.83203 9.1764 9.17445 2.83398 16.9987 2.83398ZM16.9987 5.66732C13.9929 5.66732 11.1102 6.86136 8.98482 8.98677C6.85941 11.1122 5.66536 13.9949 5.66536 17.0007C5.66536 20.0064 6.85941 22.8891 8.98482 25.0145C11.1102 27.1399 13.9929 28.334 16.9987 28.334C20.0045 28.334 22.8872 27.1399 25.0126 25.0145C27.138 22.8891 28.332 20.0064 28.332 17.0007C28.332 13.9949 27.138 11.1122 25.0126 8.98677C22.8872 6.86136 20.0045 5.66732 16.9987 5.66732ZM16.9987 8.50065C17.3457 8.5007 17.6806 8.62809 17.9399 8.85866C18.1992 9.08924 18.3649 9.40696 18.4054 9.75157L18.4154 9.91732V16.4142L22.2503 20.2491C22.5044 20.504 22.6519 20.8461 22.6629 21.2059C22.6738 21.5656 22.5475 21.9161 22.3094 22.186C22.0714 22.456 21.7395 22.6252 21.3812 22.6594C21.0229 22.6935 20.665 22.59 20.3803 22.3698L20.2471 22.2522L15.9971 18.0022C15.7769 17.7819 15.6355 17.4951 15.5948 17.1862L15.582 17.0007V9.91732C15.582 9.54159 15.7313 9.18126 15.997 8.91558C16.2626 8.64991 16.623 8.50065 16.9987 8.50065Z" fill="#E88E00"/>
</svg>

);

const ShieldCheckIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5143 17.9912L13.4602 15.9725C13.2004 15.7128 12.876 15.5829 12.4869 15.5829C12.0978 15.5829 11.7611 15.7246 11.4768 16.0079C11.2171 16.2676 11.0872 16.5982 11.0872 16.9996C11.0872 17.401 11.2171 17.7315 11.4768 17.9912L14.5227 21.0371C14.806 21.3204 15.1365 21.4621 15.5143 21.4621C15.8921 21.4621 16.2227 21.3204 16.506 21.0371L22.5268 15.0162C22.8102 14.7329 22.9457 14.4023 22.9334 14.0246C22.9211 13.6468 22.7856 13.3162 22.5268 13.0329C22.2435 12.7496 21.9073 12.6022 21.5182 12.5909C21.129 12.5796 20.7924 12.7151 20.5081 12.9975L15.5143 17.9912ZM11.5477 30.8121L9.49349 27.3412L5.59766 26.4912C5.24349 26.4204 4.96016 26.2376 4.74766 25.943C4.53516 25.6483 4.45252 25.3234 4.49974 24.9683L4.88932 20.9662L2.23307 17.9204C1.99696 17.6607 1.87891 17.3537 1.87891 16.9996C1.87891 16.6454 1.99696 16.3385 2.23307 16.0787L4.88932 13.0329L4.49974 9.03082C4.45252 8.67665 4.53516 8.35176 4.74766 8.05615C4.96016 7.76054 5.24349 7.57779 5.59766 7.5079L9.49349 6.6579L11.5477 3.18707C11.7365 2.88012 11.9963 2.67329 12.3268 2.56657C12.6574 2.45985 12.9879 2.47779 13.3185 2.6204L17.0018 4.17873L20.6852 2.6204C21.0157 2.47873 21.3463 2.46079 21.6768 2.56657C22.0074 2.67235 22.2671 2.87918 22.456 3.18707L24.5102 6.6579L28.406 7.5079C28.7602 7.57873 29.0435 7.76196 29.256 8.05757C29.4685 8.35318 29.5511 8.67759 29.5039 9.03082L29.1143 13.0329L31.7706 16.0787C32.0067 16.3385 32.1247 16.6454 32.1247 16.9996C32.1247 17.3537 32.0067 17.6607 31.7706 17.9204L29.1143 20.9662L29.5039 24.9683C29.5511 25.3225 29.4685 25.6474 29.256 25.943C29.0435 26.2386 28.7602 26.4213 28.406 26.4912L24.5102 27.3412L22.456 30.8121C22.2671 31.119 22.0074 31.3258 21.6768 31.4326C21.3463 31.5393 21.0157 31.5213 20.6852 31.3787L17.0018 29.8204L13.3185 31.3787C12.9879 31.5204 12.6574 31.5383 12.3268 31.4326C11.9963 31.3268 11.7365 31.12 11.5477 30.8121ZM13.3893 28.2621L17.0018 26.7037L20.6852 28.2621L22.6685 24.8621L26.5643 23.9412L26.2102 19.9746L28.831 16.9996L26.2102 13.9537L26.5643 9.98707L22.6685 9.13707L20.6143 5.73707L17.0018 7.2954L13.3185 5.73707L11.3352 9.13707L7.43932 9.98707L7.79349 13.9537L5.17266 16.9996L7.79349 19.9746L7.43932 24.0121L11.3352 24.8621L13.3893 28.2621Z" fill="#0CA54D"/>
</svg>

);

const ArrowUpRightIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2487 5.66602C21.6973 5.66602 22.1223 5.7666 22.5237 5.96777C22.9251 6.16893 23.2556 6.44613 23.5154 6.79935L29.8904 15.2993C30.2681 15.7952 30.457 16.3618 30.457 16.9993C30.457 17.6368 30.2681 18.2035 29.8904 18.6993L23.5154 27.1994C23.2556 27.5535 22.9251 27.8312 22.5237 28.0323C22.1223 28.2335 21.6973 28.3336 21.2487 28.3327H18.4154C18.014 28.3327 17.6778 28.1967 17.4067 27.9247C17.1356 27.6527 16.9996 27.3165 16.9987 26.916C16.9978 26.5156 17.1338 26.1793 17.4067 25.9073C17.6796 25.6353 18.0159 25.4993 18.4154 25.4993H21.2487L27.6237 16.9993L21.2487 8.49935H5.66537V14.166C5.66537 14.5674 5.52937 14.9041 5.25737 15.1761C4.98537 15.4481 4.64915 15.5836 4.2487 15.5827C3.84826 15.5817 3.51204 15.4457 3.24004 15.1747C2.96804 14.9036 2.83204 14.5674 2.83204 14.166V8.49935C2.83204 7.72018 3.1097 7.0534 3.66504 6.49902C4.22037 5.94463 4.88715 5.66696 5.66537 5.66602H21.2487ZM7.49004 29.3428C7.21804 29.0708 7.08204 28.7341 7.08204 28.3327V25.4993H4.2487C3.84731 25.4993 3.51109 25.3633 3.24004 25.0913C2.96898 24.8193 2.83298 24.4831 2.83204 24.0827C2.83109 23.6822 2.96709 23.346 3.24004 23.074C3.51298 22.802 3.8492 22.666 4.2487 22.666H7.08204V19.8327C7.08204 19.4313 7.21804 19.0951 7.49004 18.824C7.76204 18.553 8.09826 18.417 8.4987 18.416C8.89915 18.4151 9.23584 18.5511 9.50879 18.824C9.78173 19.097 9.91726 19.4332 9.91537 19.8327V22.666H12.7487C13.1501 22.666 13.4868 22.802 13.7588 23.074C14.0308 23.346 14.1663 23.6822 14.1654 24.0827C14.1644 24.4831 14.0284 24.8198 13.7574 25.0928C13.4863 25.3657 13.1501 25.5012 12.7487 25.4993H9.91537V28.3327C9.91537 28.7341 9.77937 29.0708 9.50737 29.3428C9.23537 29.6148 8.89915 29.7503 8.4987 29.7493C8.09826 29.7484 7.76204 29.6138 7.49004 29.3428Z" fill="#1A949D"/>
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