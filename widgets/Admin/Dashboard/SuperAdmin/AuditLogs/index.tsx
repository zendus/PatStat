"use client";

import { useState, useMemo } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActionType = "Created" | "Updated" | "Deleted" | "Generated";

interface AuditLog {
  id: number;
  admin: string;
  target: string;
  action: ActionType;
  date: string;
  time: string;
  details: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const auditLogs: AuditLog[] = [
  { id: 1,  admin: "John Sunday",    target: "Lagos Central Hospital",  action: "Created",   date: "2026-03-25", time: "10:32 AM", details: "New hospital profile created and submitted for review" },
  { id: 2,  admin: "David Omale",    target: "Admin Account",           action: "Updated",   date: "2026-03-25", time: "11:15 AM", details: "Role changed to Admin" },
  { id: 3,  admin: "System",         target: "Hospital",                action: "Updated",   date: "2026-03-25", time: "12:05 PM", details: "Status changed to Verified" },
  { id: 4,  admin: "Jessica Okpara", target: "Nairobi Heart Clinic",    action: "Deleted",   date: "2026-03-24", time: "2:45 PM",  details: "Hospital record removed" },
  { id: 5,  admin: "Mary Edeh",      target: "Accra Maternity Ward",    action: "Created",   date: "2026-03-24", time: "2:45 PM",  details: "New hospital application submitted" },
  { id: 6,  admin: "System",         target: "Weekly Report",           action: "Generated", date: "2026-03-24", time: "11:32 AM", details: "System generated analytics report" },
  { id: 7,  admin: "David Brown",    target: "Support Ticket #402",     action: "Updated",   date: "2026-03-23", time: "9:15 AM",  details: "Ticket marked as resolved" },
  { id: 8,  admin: "Jessica Wilson", target: "Global Settings",         action: "Updated",   date: "2026-03-23", time: "10:05 AM", details: "Changed default notification preferences" },
  { id: 9,  admin: "John Doe",       target: "System Backup",           action: "Created",   date: "2026-03-22", time: "11:30 AM", details: "Manual backup triggered" },
  { id: 10, admin: "Aliyu Musa",     target: "Kano Central Hospital",   action: "Created",   date: "2026-03-22", time: "9:00 AM",  details: "New hospital profile submitted" },
  { id: 11, admin: "John Sunday",    target: "Audit Settings",          action: "Updated",   date: "2026-03-21", time: "3:10 PM",  details: "Retention policy updated to 90 days" },
  { id: 12, admin: "System",         target: "Monthly Report",          action: "Generated", date: "2026-03-20", time: "8:00 AM",  details: "System generated monthly analytics report" },
  { id: 13, admin: "Mary Edeh",      target: "Plateau General",         action: "Deleted",   date: "2026-03-19", time: "4:50 PM",  details: "Duplicate hospital record removed" },
];

const ACTION_TYPES: ActionType[] = ["Created", "Updated", "Deleted", "Generated"];
const DATE_FILTERS = ["All Time", "Today", "Last 7 Days", "Last 30 Days"];

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Action badge ─────────────────────────────────────────────────────────────

const actionStyleMap: Record<ActionType, string> = {
  Created:   "badgeCreated",
  Updated:   "badgeUpdated",
  Deleted:   "badgeDeleted",
  Generated: "badgeGenerated",
};

const ActionBadge: React.FC<{ action: ActionType }> = ({ action }) => (
  <span className={`${styles.badge} ${styles[actionStyleMap[action]]}`}>{action}</span>
);

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const display = value === "all" || value === "All Time" ? label : value;

  return (
    <div className={styles.filterDropdownWrap}>
      <button
        className={`${styles.filterBtn} ${open ? styles.filterBtnActive : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FilterIcon />
        <span>{display}</span>
        <ChevronIcon />
      </button>
      {open && (
        <ul className={styles.filterMenu}>
          {options.map((opt) => (
            <li
              key={opt}
              className={`${styles.filterOption} ${value === opt ? styles.filterOptionActive : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AuditLogsPage: React.FC = () => {
  const [query, setQuery]           = useState("");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [actionFilter, setActionFilter] = useState("all");

  const now = new Date("2026-03-25");

  const filtered = useMemo(() => {
    return auditLogs.filter((log) => {
      const q = query.toLowerCase();
      const matchesQuery =
        log.admin.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q);

      const logDate = new Date(log.date);
      let matchesDate = true;
      if (dateFilter === "Today") {
        matchesDate = log.date === "2026-03-25";
      } else if (dateFilter === "Last 7 Days") {
        const diff = (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
        matchesDate = diff <= 7;
      } else if (dateFilter === "Last 30 Days") {
        const diff = (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
        matchesDate = diff <= 30;
      }

      const matchesAction = actionFilter === "all" || log.action === actionFilter;

      return matchesQuery && matchesDate && matchesAction;
    });
  }, [query, dateFilter, actionFilter]);

  const handleExport = () => {
    const headers = ["Admin", "Target", "Action", "Date", "Time", "Details"];
    const rows = filtered.map((l) => [l.admin, l.target, l.action, l.date, l.time, l.details]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "audit-logs.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div>
          <h1 className={styles.pageTitle}>System Audit Logs</h1>
          <p className={styles.pageSubtitle}>Track and monitor all platform activities</p>
        </div>
        <button className={styles.exportBtn} onClick={handleExport}>
          <ExportIcon /> Export Logs
        </button>
      </div>

      {/* Content card */}
      <div className={styles.contentCard}>

        {/* Search + filters */}
        <div className={styles.searchFilterRow}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search hospitals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.filtersGroup}>
            <FilterDropdown
              label="Date"
              options={DATE_FILTERS}
              value={dateFilter}
              onChange={setDateFilter}
            />
            <FilterDropdown
              label="Action"
              options={["all", ...ACTION_TYPES]}
              value={actionFilter}
              onChange={setActionFilter}
            />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.th}>Admin</th>
                <th className={styles.th}>Target</th>
                <th className={styles.th}>Action</th>
                <th className={styles.th}>Date &amp; Time</th>
                <th className={styles.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className={styles.tableRow}>
                  <td className={styles.td}>
                    <span className={styles.adminCell}>{log.admin}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.targetCell}>{log.target}</span>
                  </td>
                  <td className={styles.td}>
                    <ActionBadge action={log.action} />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.dateCell}>{log.date}</span>
                    <br />
                    <span className={styles.timeCell}>{log.time}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.detailsCell}>{log.details}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.emptyRow}>No logs match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Row count */}
        {filtered.length > 0 && (
          <div className={styles.tableFooter}>
            Showing {filtered.length} of {auditLogs.length} entries
          </div>
        )}

      </div>
    </div>
  );
};

export { AuditLogsPage };