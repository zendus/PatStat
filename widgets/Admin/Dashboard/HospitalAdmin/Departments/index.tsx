"use client";

import { useState } from "react";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Ward {
    id: number;
    name: string;
    status: "Active Ward" | "Inactive";
    totalPatients: number;
    stable: number;
    critical: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialWards: Ward[] = [
    { id: 1, name: "ICU - Ward A", status: "Active Ward", totalPatients: 5, stable: 2, critical: 0 },
    { id: 2, name: "ICU - Ward B", status: "Active Ward", totalPatients: 5, stable: 3, critical: 1 },
    { id: 3, name: "ICU - Ward C", status: "Active Ward", totalPatients: 5, stable: 0, critical: 3 },
    { id: 4, name: "General Ward A", status: "Active Ward", totalPatients: 5, stable: 3, critical: 0 },
    { id: 5, name: "General Ward B", status: "Active Ward", totalPatients: 5, stable: 1, critical: 2 },
    { id: 6, name: "Maternity Ward", status: "Active Ward", totalPatients: 5, stable: 2, critical: 1 },
    { id: 7, name: "Cardiac Care Unit", status: "Active Ward", totalPatients: 5, stable: 2, critical: 2 },
    { id: 8, name: "VIP Wing", status: "Active Ward", totalPatients: 5, stable: 4, critical: 0 },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const BuildingIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.75 3.75C19.413 3.75 20.0489 4.01339 20.5178 4.48223C20.9866 4.95107 21.25 5.58696 21.25 6.25V11.25H23.75C24.413 11.25 25.0489 11.5134 25.5178 11.9822C25.9866 12.4511 26.25 13.087 26.25 13.75V23.75C26.5815 23.75 26.8995 23.8817 27.1339 24.1161C27.3683 24.3505 27.5 24.6685 27.5 25C27.5 25.3315 27.3683 25.6495 27.1339 25.8839C26.8995 26.1183 26.5815 26.25 26.25 26.25H3.75C3.41848 26.25 3.10054 26.1183 2.86612 25.8839C2.6317 25.6495 2.5 25.3315 2.5 25C2.5 24.6685 2.6317 24.3505 2.86612 24.1161C3.10054 23.8817 3.41848 23.75 3.75 23.75V11.25C3.75 10.587 4.01339 9.95107 4.48223 9.48223C4.95107 9.01339 5.58696 8.75 6.25 8.75H8.75V6.25C8.75 5.58696 9.01339 4.95107 9.48223 4.48223C9.95107 4.01339 10.587 3.75 11.25 3.75H18.75ZM8.75 11.25H6.25V23.75H8.75V11.25ZM23.75 13.75H21.25V23.75H23.75V13.75ZM18.75 6.25H11.25V23.75H18.75V6.25ZM16.25 18.75V21.25H13.75V18.75H16.25ZM16.25 13.75V16.25H13.75V13.75H16.25ZM16.25 8.75V11.25H13.75V8.75H16.25Z" fill="#007A71" />
    </svg>

);

const PlusIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

// ─── Ward Card ────────────────────────────────────────────────────────────────

const WardCard: React.FC<{ ward: Ward }> = ({ ward }) => (
    <div className={styles.wardCard}>
        {/* Card header */}
        <div className={styles.wardCardHeader}>
            <div className={styles.wardIconWrap}>
                <BuildingIcon />
            </div>
            <div>
                <p className={styles.wardName}>{ward.name}</p>
                <p className={styles.wardStatus}>{ward.status}</p>
            </div>
        </div>

        {/* Stats */}
        <div className={styles.statsBlock}>
            {/* Total Patients */}
            <div className={styles.statRow}>
                <span className={styles.statRowLabel}>Total Patients</span>
                <span className={styles.statRowValue}>{ward.totalPatients}</span>
            </div>

            {/* Stable */}
            <div className={`${styles.statRow} ${styles.stableRow}`}>
                <span className={`${styles.statRowLabel} ${styles.stableLabel}`}>Stable</span>
                <span className={`${styles.statRowValue} ${styles.stableValue}`}>{ward.stable}</span>
            </div>

            {/* Critical */}
            <div className={`${styles.statRow} ${styles.criticalRow}`}>
                <span className={`${styles.statRowLabel} ${styles.criticalLabel}`}>Critical</span>
                <span className={`${styles.statRowValue} ${styles.criticalValue}`}>{ward.critical}</span>
            </div>
        </div>

        {/* View button */}
        <button className={styles.btnView}>View Ward Details</button>
    </div>
);

// ─── Add Ward placeholder card ────────────────────────────────────────────────

const AddWardCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button className={styles.addWardCard} onClick={onClick} aria-label="Add new ward">
        <span className={styles.addWardPlus}><PlusIcon size={28} /></span>
    </button>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const DepartmentsWardsPage: React.FC = () => {
    const [wards, setWards] = useState<Ward[]>(initialWards);

    const handleAddWard = () => {
        const newWard: Ward = {
            id: Date.now(),
            name: `New Ward ${wards.length + 1}`,
            status: "Active Ward",
            totalPatients: 0,
            stable: 0,
            critical: 0,
        };
        setWards((prev) => [...prev, newWard]);
    };

    return (
        <div className={styles.wrapper}>

            {/* Page header */}
            <div className={styles.topBar}>
                <div>
                    <h1 className={styles.pageTitle}>Departments &amp; Wards</h1>
                    <p className={styles.pageSubtitle}>Manage hospital departments and patient distribution</p>
                </div>
                <button className={styles.btnAddWard} onClick={handleAddWard}>
                    <PlusIcon size={15} />
                    Add Ward
                </button>
            </div>

            {/* Ward grid */}
            <div className={styles.wardGrid}>
                {wards.map((ward) => (
                    <WardCard key={ward.id} ward={ward} />
                ))}

                {/* Dashed placeholder card */}
                <AddWardCard onClick={handleAddWard} />
            </div>

        </div>
    );
};

export { DepartmentsWardsPage };