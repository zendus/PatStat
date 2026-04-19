"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminRole = "Super Admin" | "System Admin";
type AdminStatus = "Active" | "Inactive";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialAdmins: Admin[] = [
  { id: 1, name: "John Sunday",    email: "john.sunday@patstat.ng",   role: "Super Admin",  status: "Active" },
  { id: 2, name: "David Omale",    email: "david.omale@patstat.ng",   role: "Super Admin",  status: "Active" },
  { id: 3, name: "Jessica Okpara", email: "jessica.o@patstat.ng",     role: "System Admin", status: "Active" },
  { id: 4, name: "Mary Edeh",      email: "mary.edeh@patstat.ng",     role: "System Admin", status: "Active" },
  { id: 5, name: "Elijah Oko",     email: "elijah.oko@patstat.ng",    role: "System Admin", status: "Active" },
];

const roleOptions: AdminRole[] = ["Super Admin", "System Admin"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

// ─── Icons ────────────────────────────────────────────────────────────────────

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

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Add Admin Modal ──────────────────────────────────────────────────────────

interface AddAdminModalProps {
  onClose: () => void;
  onAdd: (name: string, email: string, role: AdminRole) => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose, onAdd }) => {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole]   = useState<AdminRole | "">("");
  const [dropOpen, setDropOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role) return;
    onAdd(name, email, role as AdminRole);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.modalTopRow}>
          <h2 className={styles.modalTitle}>Add New Admin</h2>
          <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close"><XCircleIcon /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="jane@patstat.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role</label>
            <div className={styles.dropdownContainer}>
              <button
                type="button"
                className={`${styles.formSelect} ${dropOpen ? styles.active : ""}`}
                onClick={() => setDropOpen(!dropOpen)}
              >
                <span style={{ color: role ? "inherit" : "#8A9099" }}>{role || "Select role..."}</span>
                <ChevronIcon open={dropOpen} />
              </button>
              {dropOpen && (
                <ul className={styles.dropdownMenu}>
                  {roleOptions.map((r) => (
                    <li
                      key={r}
                      className={`${styles.dropdownItem} ${role === r ? styles.dropdownItemActive : ""}`}
                      onClick={() => { setRole(r); setDropOpen(false); }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.primaryBtn}>Add Admin</button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ─── Admin Details Modal ──────────────────────────────────────────────────────

interface AdminDetailsModalProps {
  admin: Admin;
  onClose: () => void;
  onSave: (id: number, role: AdminRole) => void;
  onDeactivate: (id: number) => void;
}

const AdminDetailsModal: React.FC<AdminDetailsModalProps> = ({ admin, onClose, onSave, onDeactivate }) => {
  const [role, setRole]     = useState<AdminRole>(admin.role);
  const [dropOpen, setDropOpen] = useState(false);

  const handleSave = () => {
    onSave(admin.id, role);
    onClose();
  };

  const handleDeactivate = () => {
    onDeactivate(admin.id);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.modalTopRow}>
          <h2 className={styles.modalTitle}>Admin Details</h2>
          <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close"><XCircleIcon /></button>
        </div>

        <div className={styles.modalBody}>

          {/* Profile row */}
          <div className={styles.profileRow}>
            <div className={styles.avatarLg}>{getInitial(admin.name)}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{admin.name}</p>
              <p className={styles.profileEmail}>{admin.email}</p>
              <span className={admin.status === "Active" ? styles.statusActive : styles.statusInactive}>
                {admin.status}
              </span>
            </div>
          </div>

          {/* Role dropdown */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role</label>
            <div className={styles.dropdownContainer}>
              <button
                type="button"
                className={`${styles.formSelect} ${dropOpen ? styles.active : ""}`}
                onClick={() => setDropOpen(!dropOpen)}
              >
                <span>{role}</span>
                <ChevronIcon open={dropOpen} />
              </button>
              {dropOpen && (
                <ul className={styles.dropdownMenu}>
                  {roleOptions.map((r) => (
                    <li
                      key={r}
                      className={`${styles.dropdownItem} ${role === r ? styles.dropdownItemActive : ""}`}
                      onClick={() => { setRole(r); setDropOpen(false); }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={styles.modalFooter}>
            <button className={styles.deactivateBtn} onClick={handleDeactivate}>Deactivate</button>
            <div className={styles.modalFooterRight}>
              <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
              <button className={styles.primaryBtn} onClick={handleSave}>Save Changes</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const SystemAdminsPage: React.FC = () => {
  const [admins, setAdmins]               = useState<Admin[]>(initialAdmins);
  const [showAddModal, setShowAddModal]   = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [expandedId, setExpandedId]       = useState<number | null>(null);

  const handleAdd = (name: string, email: string, role: AdminRole) => {
    const newAdmin: Admin = {
      id: Date.now(),
      name, email, role,
      status: "Active",
    };
    setAdmins((prev) => [...prev, newAdmin]);
  };

  const handleSave = (id: number, role: AdminRole) => {
    setAdmins((prev) => prev.map((a) => a.id === id ? { ...a, role } : a));
  };

  const handleDeactivate = (id: number) => {
    setAdmins((prev) => prev.map((a) => a.id === id ? { ...a, status: "Inactive" } : a));
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.topHeader}>
        <div>
          <h1 className={styles.pageTitle}>System Administrators</h1>
          <p className={styles.pageSubtitle}>Manage internal users and access roles</p>
        </div>
        <button className={styles.addAdminBtn} onClick={() => setShowAddModal(true)}>
          <PlusIcon /> Add Admin
        </button>
      </div>

      {/* Admin cards */}
      <div className={styles.adminList}>
        {admins.map((admin) => {
          const isExpanded = expandedId === admin.id;
          return (
            <div key={admin.id} className={styles.adminCard}>

              {/* Top section — always visible */}
              <div className={styles.adminCardTop}>
                <div className={styles.adminLeft}>
                  <div className={styles.avatarSm}>{getInitial(admin.name)}</div>
                  <div className={styles.adminInfo}>
                    <p className={styles.adminName}>{admin.name}</p>
                    <p className={styles.adminEmail}>{admin.email}</p>
                  </div>
                </div>

                <div className={styles.adminRight}>
                  <span className={styles.adminRole}>{admin.role}</span>
                  <span className={admin.status === "Active" ? styles.statusActive : styles.statusInactive}>
                    {admin.status}
                  </span>
                  <button
                    className={styles.chevronBtn}
                    onClick={() => toggleExpand(admin.id)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    <ChevronIcon open={isExpanded} />
                  </button>
                </div>
              </div>

              {/* Expanded — quick actions */}
              {isExpanded && (
                <div className={styles.adminCardExpanded}>
                  <div className={styles.expandedActions}>
                    <button
                      className={styles.viewDetailsBtn}
                      onClick={() => { setSelectedAdmin(admin); setExpandedId(null); }}
                    >
                      View Details
                    </button>
                    {admin.status === "Active" && (
                      <button
                        className={styles.deactivateSmBtn}
                        onClick={() => handleDeactivate(admin.id)}
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {admins.length === 0 && (
          <p className={styles.emptyText}>No administrators found.</p>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}

      {selectedAdmin && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
          onSave={handleSave}
          onDeactivate={handleDeactivate}
        />
      )}

    </div>
  );
};

export { SystemAdminsPage };