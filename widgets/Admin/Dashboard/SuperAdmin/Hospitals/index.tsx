"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type HospitalStatus = "verified" | "pending";
type HospitalType = "Public" | "Private" | "Specialist Hospital" | "Teaching Hospital";

interface Hospital {
  id: number;
  name: string;
  type: HospitalType;
  location: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  status: HospitalStatus;
  dateAdded: string;
  registrationId: string;
  totalStaff: number;
  totalPatients: number;
  statusNote: string;
  lastUpdate: string;
  patientUpdatesToday: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const hospitals: Hospital[] = [
  { id: 1, name: "Lagos General Hospital", type: "Public", location: "Ikeja, Nigeria", adminName: "Amara Okafor", adminEmail: "amara.okafor@hospital.ng", adminPhone: "+234 800 123 4567", status: "verified", dateAdded: "2026-01-15", registrationId: "REG-2026-001", totalStaff: 145, totalPatients: 1204, statusNote: "Verified", lastUpdate: "2 hours ago", patientUpdatesToday: 12 },
  { id: 2, name: "Hope Renewed Hospital", type: "Private", location: "Enugu, Nigeria", adminName: "Nkan David", adminEmail: "nkan.david@hospital.ng", adminPhone: "+234 800 234 5678", status: "verified", dateAdded: "2026-01-20", registrationId: "REG-2026-002", totalStaff: 98, totalPatients: 870, statusNote: "Verified", lastUpdate: "5 hours ago", patientUpdatesToday: 8 },
  { id: 3, name: "Healthy Hearts Clinic", type: "Specialist Hospital", location: "Abakiliki, Nigeria", adminName: "Ada Nweke", adminEmail: "ada.nweke@hospital.ng", adminPhone: "+233 20 123 4567", status: "pending", dateAdded: "2026-03-20", registrationId: "REG-2026-003", totalStaff: 89, totalPatients: 560, statusNote: "Pending manual review", lastUpdate: "2 hours ago", patientUpdatesToday: 12 },
  { id: 4, name: "Kauna Maternity Hospital", type: "Specialist Hospital", location: "Jos, Nigeria", adminName: "Yusuf Musa", adminEmail: "yusuf.musa@hospital.ng", adminPhone: "+234 800 456 7890", status: "pending", dateAdded: "2026-03-22", registrationId: "REG-2026-004", totalStaff: 54, totalPatients: 320, statusNote: "Pending manual review", lastUpdate: "1 day ago", patientUpdatesToday: 5 },
  { id: 5, name: "Enugu General Hospital", type: "Public", location: "Enugu, Nigeria", adminName: "Jane Ididiong", adminEmail: "jane.ididiong@hospital.ng", adminPhone: "+234 800 567 8901", status: "verified", dateAdded: "2026-02-01", registrationId: "REG-2026-005", totalStaff: 201, totalPatients: 1890, statusNote: "Verified", lastUpdate: "3 hours ago", patientUpdatesToday: 20 },
  { id: 6, name: "Awka General Hospital", type: "Public", location: "Awka, Nigeria", adminName: "Precious Okechukwu", adminEmail: "precious.o@hospital.ng", adminPhone: "+234 800 678 9012", status: "verified", dateAdded: "2026-02-10", registrationId: "REG-2026-006", totalStaff: 178, totalPatients: 1450, statusNote: "Verified", lastUpdate: "6 hours ago", patientUpdatesToday: 15 },
  { id: 7, name: "Jos University Teaching Hospital", type: "Teaching Hospital", location: "Jos, Nigeria", adminName: "Aliyu Abubakar", adminEmail: "aliyu.abubakar@hospital.ng", adminPhone: "+234 800 789 0123", status: "verified", dateAdded: "2026-01-25", registrationId: "REG-2026-007", totalStaff: 320, totalPatients: 2800, statusNote: "Verified", lastUpdate: "1 hour ago", patientUpdatesToday: 35 },
  { id: 8, name: "Kano University Teaching Hospital", type: "Teaching Hospital", location: "Kano, Nigeria", adminName: "Yetunde Folake", adminEmail: "yetunde.folake@hospital.ng", adminPhone: "+234 800 890 1234", status: "verified", dateAdded: "2026-01-28", registrationId: "REG-2026-008", totalStaff: 290, totalPatients: 2450, statusNote: "Verified", lastUpdate: "4 hours ago", patientUpdatesToday: 28 },
  { id: 9, name: "Makurdi General Hospital", type: "Public", location: "Makurdi, Nigeria", adminName: "Bola Olatunde", adminEmail: "bola.olatunde@hospital.ng", adminPhone: "+234 800 901 2345", status: "pending", dateAdded: "2026-04-01", registrationId: "REG-2026-009", totalStaff: 65, totalPatients: 410, statusNote: "Pending manual review", lastUpdate: "3 days ago", patientUpdatesToday: 3 },
  { id: 10, name: "Akure General Hospital", type: "Public", location: "Akure, Nigeria", adminName: "Kasim Muftwang", adminEmail: "kasim.muftwang@hospital.ng", adminPhone: "+234 800 012 3456", status: "pending", dateAdded: "2026-04-05", registrationId: "REG-2026-010", totalStaff: 72, totalPatients: 480, statusNote: "Pending manual review", lastUpdate: "2 days ago", patientUpdatesToday: 4 },
  { id: 11, name: "Living Spring Specialist Hospital", type: "Specialist Hospital", location: "Ibadan, Nigeria", adminName: "Caleb Danish", adminEmail: "caleb.danish@hospital.ng", adminPhone: "+234 800 123 6789", status: "pending", dateAdded: "2026-04-08", registrationId: "REG-2026-011", totalStaff: 41, totalPatients: 210, statusNote: "Pending manual review", lastUpdate: "1 day ago", patientUpdatesToday: 2 },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const XCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.98"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Add Hospital Modal ───────────────────────────────────────────────────────

interface AddHospitalModalProps {
  onClose: () => void;
  onAdd: (hospital: Hospital) => void;
}

const HOSPITAL_TYPES: HospitalType[] = ["Public", "Private", "Specialist Hospital", "Teaching Hospital"];

const AddHospitalModal: React.FC<AddHospitalModalProps> = ({ onClose, onAdd }) => {
  const [name, setName]           = useState("");
  const [type, setType]           = useState<HospitalType | "">("");
  const [location, setLocation]   = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [typeOpen, setTypeOpen]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !location || !adminName || !adminEmail) return;
    const newHospital: Hospital = {
      id: Date.now(),
      name,
      type: type as HospitalType,
      location,
      adminName,
      adminEmail,
      adminPhone: "",
      status: "pending",
      dateAdded: new Date().toISOString().split("T")[0],
      registrationId: `REG-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      totalStaff: 0,
      totalPatients: 0,
      statusNote: "Pending manual review",
      lastUpdate: "Just now",
      patientUpdatesToday: 0,
    };
    onAdd(newHospital);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.addModal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.addModalHeader}>
          <h2 className={styles.addModalTitle}>Add New Hospital</h2>
          <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close">
            <XCircleIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.addModalBody}>

          {/* Hospital Name */}
          <div className={styles.addFormGroup}>
            <label className={styles.addFormLabel}>Hospital Name</label>
            <input
              type="text"
              className={styles.addFormInput}
              placeholder="e.g. Lagos General Hospital"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Type + Location row */}
          <div className={styles.addFormRow}>
            <div className={styles.addFormGroup}>
              <label className={styles.addFormLabel}>Type</label>
              <div className={styles.addDropdownWrap}>
                <button
                  type="button"
                  className={`${styles.addFormSelect} ${typeOpen ? styles.addFormSelectOpen : ""}`}
                  onClick={() => setTypeOpen(!typeOpen)}
                >
                  <span style={{ color: type ? "inherit" : "#8A9099" }}>{type || "Select type..."}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: typeOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {typeOpen && (
                  <ul className={styles.addDropdownMenu}>
                    {HOSPITAL_TYPES.map((t) => (
                      <li
                        key={t}
                        className={`${styles.addDropdownItem} ${type === t ? styles.addDropdownItemActive : ""}`}
                        onClick={() => { setType(t); setTypeOpen(false); }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.addFormGroup}>
              <label className={styles.addFormLabel}>Location</label>
              <input
                type="text"
                className={styles.addFormInput}
                placeholder="City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Admin Full Name */}
          <div className={styles.addFormGroup}>
            <label className={styles.addFormLabel}>Admin Full Name</label>
            <input
              type="text"
              className={styles.addFormInput}
              placeholder="Dr. Jane Doe"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </div>

          {/* Admin Email */}
          <div className={styles.addFormGroup}>
            <label className={styles.addFormLabel}>Admin Email</label>
            <input
              type="email"
              className={styles.addFormInput}
              placeholder="admin@hospital.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </div>

          {/* Footer */}
          <div className={styles.addModalFooter}>
            <button type="button" className={styles.addCancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.addSubmitBtn}>Add Hospital</button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ─── Hospital Detail Modal ─────────────────────────────────────────────────────

interface HospitalModalProps {
  hospital: Hospital;
  onClose: () => void;
  onVerify: (id: number) => void;
  onReject: (id: number) => void;
  onDeactivate: (id: number) => void;
}

const HospitalModal: React.FC<HospitalModalProps> = ({ hospital, onClose, onVerify, onReject, onDeactivate }) => {
  const isPending = hospital.status === "pending";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close">
          <XCircleIcon />
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalHospitalName}>{hospital.name}</h2>
          <div className={styles.modalTags}>
            <span className={styles.typeTag}>{hospital.type.replace(" Hospital", "")}</span>
            <span className={styles.locationTag}>{hospital.location}</span>
            <span className={isPending ? styles.statusTagPending : styles.statusTagVerified}>
              {isPending ? "Pending" : "Verified"}
            </span>
          </div>
        </div>

        {/* Body grid */}
        <div className={styles.modalBody}>

          {/* LEFT */}
          <div className={styles.modalLeft}>

            {/* Overview */}
            <section className={styles.modalSection}>
              <h3 className={styles.sectionHeading}>OVERVIEW</h3>
              <div className={styles.overviewGrid}>
                <div>
                  <p className={styles.fieldLabel}>Hospital Name</p>
                  <p className={styles.fieldValue}>{hospital.name}</p>
                </div>
                <div>
                  <p className={styles.fieldLabel}>Type</p>
                  <p className={styles.fieldValue}>{hospital.type}</p>
                </div>
                <div>
                  <p className={styles.fieldLabel}>Location</p>
                  <p className={styles.fieldValue}>{hospital.location}</p>
                </div>
                <div>
                  <p className={styles.fieldLabel}>Date Added</p>
                  <p className={styles.fieldValue}>{hospital.dateAdded}</p>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className={styles.modalSection}>
              <h3 className={styles.sectionHeading}>SUMMARY</h3>
              <div className={styles.summaryCards}>
                <div className={styles.summaryCard}>
                  <p className={styles.summaryLabel}>Total Staff</p>
                  <p className={styles.summaryValue}>{hospital.totalStaff}</p>
                </div>
                <div className={styles.summaryCard}>
                  <p className={styles.summaryLabel}>Total Patients</p>
                  <p className={styles.summaryValue}>{hospital.totalPatients.toLocaleString()}</p>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className={styles.modalSection}>
              <h3 className={styles.sectionHeading}>RECENT ACTIVITY</h3>
              <div className={styles.activityBox}>
                <div className={styles.activityItem}>
                  <span className={styles.activityDot} />
                  <span>Last update: <strong>{hospital.lastUpdate}</strong></span>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityDot} />
                  <span><strong>{hospital.patientUpdatesToday}</strong> patient updates today</span>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT */}
          <div className={styles.modalRight}>

            {/* Hospital Admin */}
            <section className={styles.modalSection}>
              <h3 className={styles.sectionHeading}>HOSPITAL ADMIN</h3>
              <p className={styles.adminName}>{hospital.adminName}</p>
              <p className={styles.adminDetail}>{hospital.adminEmail}</p>
              <p className={styles.adminDetail}>{hospital.adminPhone}</p>
            </section>

            {/* Verification */}
            <section className={styles.modalSection}>
              <h3 className={styles.sectionHeading}>VERIFICATION</h3>
              <div className={styles.verificationBox}>
                <div className={styles.verificationRow}>
                  <span className={styles.verificationLabel}>Registration ID</span>
                  <span className={styles.verificationId}>{hospital.registrationId}</span>
                </div>
                <div className={styles.verificationRow}>
                  <span className={styles.verificationLabel}>Status Note</span>
                  <span className={isPending ? styles.statusNoteOrange : styles.statusNoteGreen}>
                    {hospital.statusNote}
                  </span>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Footer actions */}
        <div className={styles.modalFooter}>
          <div className={styles.modalFooterLeft}>
            {isPending ? (
              <button className={styles.rejectBtn} onClick={() => { onReject(hospital.id); onClose(); }}>
                Reject Hospital
              </button>
            ) : (
              <button className={styles.deactivateBtn} onClick={() => { onDeactivate(hospital.id); onClose(); }}>
                Deactivate Hospital
              </button>
            )}
          </div>
          <div className={styles.modalFooterRight}>
            {isPending && (
              <button className={styles.verifyBtn} onClick={() => { onVerify(hospital.id); onClose(); }}>
                <CheckCircleIcon /> Verify Hospital
              </button>
            )}
            <button className={styles.closeBtn} onClick={onClose}>Close</button>
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const HospitalDirectoryPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [hospitalList, setHospitalList] = useState<Hospital[]>(hospitals);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddHospital = (hospital: Hospital) => {
    setHospitalList((prev) => [hospital, ...prev]);
  };

  const filtered = hospitalList.filter((h) => {
    const q = query.toLowerCase();
    const matchesQuery =
      h.name.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q) ||
      h.adminName.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || h.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleVerify = (id: number) => {
    setHospitalList((prev) =>
      prev.map((h) => h.id === id ? { ...h, status: "verified" as HospitalStatus, statusNote: "Verified" } : h)
    );
  };

  const handleReject = (id: number) => {
    setHospitalList((prev) => prev.filter((h) => h.id !== id));
  };

  const handleDeactivate = (id: number) => {
    setHospitalList((prev) =>
      prev.map((h) => h.id === id ? { ...h, status: "pending" as HospitalStatus, statusNote: "Pending manual review" } : h)
    );
  };

  const filterLabel = statusFilter === "all" ? "Filter by Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div>
          <h1 className={styles.pageTitle}>Hospital Directory</h1>
          <p className={styles.pageSubtitle}>Manage client hospitals and platform access</p>
        </div>
        <button className={styles.addHospitalBtn} onClick={() => setShowAddModal(true)}>
          <PlusIcon /> Add Hospital
        </button>
      </div>

      {/* Main content card */}
      <div className={styles.contentCard}>

        {/* Search + Filter */}
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

          <div className={styles.filterWrapper}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              <FilterIcon /> {filterLabel} <ChevronIcon />
            </button>
            {filterOpen && (
              <ul className={styles.filterDropdown}>
                {(["all", "verified", "pending"] as const).map((val) => (
                  <li
                    key={val}
                    className={`${styles.filterOption} ${statusFilter === val ? styles.filterOptionActive : ""}`}
                    onClick={() => { setStatusFilter(val); setFilterOpen(false); }}
                  >
                    {val === "all" ? "All" : val.charAt(0).toUpperCase() + val.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.th}>Hospital Name</th>
                <th className={styles.th}>Type</th>
                <th className={styles.th}>Location</th>
                <th className={styles.th}>Admin Contact</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className={styles.tableRow}>
                  <td className={styles.td}>
                    <span className={styles.hospitalNameCell}>{h.name}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.typeCell}>{h.type}</span>
                  </td>
                  <td className={styles.td}>{h.location}</td>
                  <td className={styles.td}>
                    <span className={styles.adminName}>{h.adminName}</span>
                    <br />
                    <span className={styles.adminEmail}>{h.adminEmail}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={h.status === "verified" ? styles.badgeVerified : styles.badgePending}>
                      {h.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <button
                      className={styles.detailsLink}
                      onClick={() => setSelectedHospital(h)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>No hospitals match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add Hospital Modal */}
      {showAddModal && (
        <AddHospitalModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddHospital}
        />
      )}

      {/* Detail Modal */}
      {selectedHospital && (
        <HospitalModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
          onVerify={handleVerify}
          onReject={handleReject}
          onDeactivate={handleDeactivate}
        />
      )}
    </div>
  );
};

export { HospitalDirectoryPage };