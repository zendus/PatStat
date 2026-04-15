"use client";

import React from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
}

interface QuickReportProps {
  title: string;
  description: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const GenerateReportIcon = () => (
 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.25 12.75L6.75 8.25L9.75 11.25L15.75 5.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.75 5.25H15.75V8.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const AdmissionsIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0014 14.1673C20.1322 14.1673 22.6681 11.6315 22.6681 8.50065C22.6681 5.36982 20.1322 2.83398 17.0014 2.83398C13.8706 2.83398 11.3347 5.36982 11.3347 8.50065C11.3347 11.6315 13.8706 14.1673 17.0014 14.1673ZM17.0014 5.66732C18.5597 5.66732 19.8347 6.94232 19.8347 8.50065C19.8347 10.059 18.5597 11.334 17.0014 11.334C15.4431 11.334 14.1681 10.059 14.1681 8.50065C14.1681 6.94232 15.4431 5.66732 17.0014 5.66732ZM26.0539 17.794C23.6739 16.5757 20.5856 15.584 17.0014 15.584C13.4172 15.584 10.3289 16.5757 7.94889 17.794C7.25764 18.15 6.67857 18.6906 6.27595 19.3558C5.87333 20.021 5.66292 20.7848 5.66806 21.5623V31.1673H8.50139V21.5623C8.50139 21.024 8.78473 20.5423 9.20973 20.3157C10.9239 19.4515 13.6439 18.4173 17.0014 18.4173C18.0781 18.4173 19.0839 18.5165 20.0189 18.7007L17.8231 23.3757H13.8139C11.6606 23.3757 9.91806 25.1182 9.91806 27.2715C9.91806 29.4248 11.6606 31.1673 13.8139 31.1673H25.5014C27.0597 31.1673 28.3347 29.8923 28.3347 28.334V21.5623C28.3347 19.9757 27.4706 18.5165 26.0539 17.794ZM15.4997 28.334H13.8139C13.2331 28.334 12.7514 27.8523 12.7514 27.2715C12.7514 26.6907 13.2331 26.209 13.8139 26.209H16.4914L15.4997 28.334ZM25.5014 28.334H18.6306L22.7956 19.4515C23.5606 19.7348 24.2264 20.0323 24.7931 20.3157C25.2181 20.5423 25.5014 21.024 25.5014 21.5623V28.334Z" fill="#015DDD"/>
</svg>

);

const AverageStayIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9987 2.83301C24.8229 2.83301 31.1654 9.17542 31.1654 16.9997C31.1654 24.8239 24.8229 31.1663 16.9987 31.1663C9.17445 31.1663 2.83203 24.8239 2.83203 16.9997C2.83203 9.17542 9.17445 2.83301 16.9987 2.83301ZM16.9987 5.66634C13.9929 5.66634 11.1102 6.86039 8.98482 8.9858C6.85941 11.1112 5.66536 13.9939 5.66536 16.9997C5.66536 20.0055 6.85941 22.8881 8.98482 25.0136C11.1102 27.139 13.9929 28.333 16.9987 28.333C20.0045 28.333 22.8872 27.139 25.0126 25.0136C27.138 22.8881 28.332 20.0055 28.332 16.9997C28.332 13.9939 27.138 11.1112 25.0126 8.9858C22.8872 6.86039 20.0045 5.66634 16.9987 5.66634ZM16.9987 8.49967C17.3457 8.49972 17.6806 8.62711 17.9399 8.85769C18.1992 9.08826 18.3649 9.40598 18.4054 9.75059L18.4154 9.91634V16.4132L22.2503 20.2481C22.5044 20.503 22.6519 20.8451 22.6629 21.2049C22.6738 21.5646 22.5475 21.9151 22.3094 22.1851C22.0714 22.455 21.7395 22.6243 21.3812 22.6584C21.0229 22.6925 20.665 22.589 20.3803 22.3688L20.2471 22.2513L15.9971 18.0013C15.7769 17.7809 15.6355 17.4941 15.5948 17.1853L15.582 16.9997V9.91634C15.582 9.54062 15.7313 9.18028 15.997 8.91461C16.2626 8.64893 16.623 8.49967 16.9987 8.49967Z" fill="#0CA54D"/>
</svg>

);

const StatusUpdatesIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4782 4.25019C13.7838 4.25444 14.0799 4.35745 14.3222 4.54384C14.5646 4.73023 14.7401 4.99 14.8226 5.28436L20.026 23.786L22.7573 16.5029C22.8585 16.233 23.0397 16.0003 23.2766 15.836C23.5136 15.6717 23.795 15.5836 24.0833 15.5835H28.3333C28.7091 15.5835 29.0694 15.7328 29.3351 15.9985C29.6007 16.2641 29.75 16.6245 29.75 17.0002C29.75 17.3759 29.6007 17.7362 29.3351 18.0019C29.0694 18.2676 28.7091 18.4169 28.3333 18.4169H25.0651L21.1593 28.8308C21.0545 29.1104 20.8641 29.3498 20.6151 29.5147C20.3662 29.6796 20.0715 29.7616 19.7731 29.749C19.4748 29.7365 19.188 29.6299 18.9538 29.4447C18.7197 29.2594 18.55 29.0049 18.4691 28.7174L13.3875 10.645L11.2682 17.4224C11.1782 17.7105 10.9986 17.9623 10.7555 18.1412C10.5124 18.3201 10.2185 18.4167 9.91667 18.4169H5.66667C5.29094 18.4169 4.93061 18.2676 4.66493 18.0019C4.39926 17.7362 4.25 17.3759 4.25 17.0002C4.25 16.6245 4.39926 16.2641 4.66493 15.9985C4.93061 15.7328 5.29094 15.5835 5.66667 15.5835H8.87542L12.1054 5.24469C12.1966 4.9526 12.3798 4.69788 12.6278 4.51861C12.8757 4.33934 13.1751 4.24517 13.481 4.25019H13.4782Z" fill="#E17100"/>
</svg>

);

const StaffUtilizationIcon = () => (
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25 24.0837L12.75 15.5837L18.4167 21.2503L29.75 9.91699" stroke="#007A71" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.082 9.91699H29.7487V15.5837" stroke="#007A71" stroke-width="2.83333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const ArrowUpIcon = () => (
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8847 7.18342C13.9935 7.28547 14.0573 7.42655 14.062 7.57564C14.0668 7.72472 14.0122 7.8696 13.9102 7.97842H9.56241V14.6249C9.56241 14.7741 9.50315 14.9172 9.39766 15.0227C9.29217 15.1282 9.1491 15.1874 8.99991 15.1874C8.85073 15.1874 8.70766 15.1282 8.60217 15.0227C8.49668 14.9172 8.43741 14.7741 8.43741 14.6249V7.97842H4.08966C3.98764 7.8696 3.93301 7.72472 3.93779 7.57564C3.94257 7.42655 4.00637 7.28547 4.11516 7.18342L8.61516 2.96467C8.71942 2.86691 8.85699 2.8125 8.99991 2.8125C9.14284 2.8125 9.2804 2.86691 9.38466 2.96467L13.8847 7.18342Z" fill="#007A71"/>
</svg>

);

const ArrowDownIcon = () => (
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.11534 10.8166C4.00655 10.7145 3.94274 10.5735 3.93796 10.4244C3.93318 10.2753 3.98781 10.1304 4.08984 10.0216H8.43759L8.43759 3.37508C8.43759 3.2259 8.49685 3.08282 8.60234 2.97733C8.70783 2.87185 8.8509 2.81258 9.00009 2.81258C9.14927 2.81258 9.29234 2.87185 9.39783 2.97733C9.50332 3.08282 9.56259 3.2259 9.56259 3.37508L9.56259 10.0216H13.9103C14.0124 10.1304 14.067 10.2753 14.0622 10.4244C14.0574 10.5735 13.9936 10.7145 13.8848 10.8166L9.38484 15.0353C9.28058 15.1331 9.14301 15.1875 9.00009 15.1875C8.85716 15.1875 8.7196 15.1331 8.61534 15.0353L4.11534 10.8166Z" fill="#A41607"/>
</svg>

);

// ─── Components ───────────────────────────────────────────────────────────────

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, changeType, icon }) => (
  <div className={styles.metricCard}>
    <div className={styles.metricInfo}>
      <p className={styles.metricLabel}>{label}</p>
      <p className={styles.metricValue}>{value}</p>
      <div className={`${styles.metricChange} ${styles[changeType]}`}>
        {changeType === "increase" && <ArrowUpIcon />}
        {changeType === "decrease" && <ArrowDownIcon />}
        <span>{change}</span>
      </div>
    </div>
    <div className={styles.metricIcon}>{icon}</div>
  </div>
);

const QuickReportCard: React.FC<QuickReportProps> = ({ title, description }) => (
  <div className={styles.quickReportCard}>
    <h3 className={styles.reportTitle}>{title}</h3>
    <p className={styles.reportDescription}>{description}</p>
  </div>
);


// ─── Main Page ────────────────────────────────────────────────────────────────

const ReportsAnalyticsPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Reports & Analytics</h1>
          <p className={styles.subtitle}>Insights and performance metrics</p>
        </div>
        <button className={styles.generateReportBtn}>
          <GenerateReportIcon /> Generate Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className={styles.metricCardsGrid}>
        <MetricCard
          label="Patient Admissions"
          value={8}
          change="+12% this month"
          changeType="increase"
          icon={<AdmissionsIcon />}
        />
        <MetricCard
          label="Average Stay"
          value="4.2 days"
          change="-8% from last month"
          changeType="decrease"
          icon={<AverageStayIcon />}
        />
        <MetricCard
          label="Status Updates"
          value={20}
          change="+23% this week"
          changeType="increase"
          icon={<StatusUpdatesIcon />}
        />
        <MetricCard
          label="Staff Utilization"
          value="87%"
          change="+5% this month"
          changeType="increase"
          icon={<StaffUtilizationIcon />}
        />
      </div>

      {/* Quick Reports Section */}
      <div className={styles.mainContent}>
        <h2 className={styles.quickReportsTitle}>Quick Reports</h2>
        <div className={styles.quickReportsGrid}>
          <QuickReportCard
            title="Patient Status Summary"
            description="Generate detailed report"
          />
          <QuickReportCard
            title="Staff Performance"
            description="Generate detailed report"
          />
          <QuickReportCard
            title="Ward Occupancy"
            description="Generate detailed report"
          />
          <QuickReportCard
            title="Update Frequency"
            description="Generate detailed report"
          />
          <QuickReportCard
            title="Emergency Response Times"
            description="Generate detailed report"
          />
          <QuickReportCard
            title="Family Engagement"
            description="Generate detailed report"
          />
        </div>
      </div>
    </div>
  );
};

export { ReportsAnalyticsPage };