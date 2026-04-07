import React from "react";
import styles from "./style.module.css";

type Role = "doctor" | "nurse";

interface CareMember {
    name: string;
    role: Role;
    email: string;
}

const careTeam: CareMember[] = [
    {
        name: "Tobenna Obi",
        role: "doctor",
        email: "tobenna.obi@hospital.ng",
    },
    {
        name: "Jide Adeleke",
        role: "nurse",
        email: "jide.adeleke@hospital.ng",
    },
    {
        name: "Chisom Okeke",
        role: "nurse",
        email: "chisom.okeke@hospital.ng",
    },
];

/** Icons */
const MailIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
        <path d="M22 6l-10 7L2 6" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.08 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.89.32 1.76.6 2.6a2 2 0 01-.45 2L8 9a16 16 0 007 7l.68-.68a2 2 0 012-.45c.84.28 1.71.48 2.6.6A2 2 0 0122 16.92z" />
    </svg>
);

const CareTeam: React.FC = () => {
    return (
        <div className={styles.careTeamWrapper}>
            <h1 className={styles.contentTitle}>Care Team Information</h1>
            <p className={styles.contentSubtitle}>
                Your loved one’s medical care team
            </p>

            {/* CARE TEAM GRID */}
            <div className={styles.careGrid}>
                {careTeam.map((member, index) => {
                    const isDoctor = member.role === "doctor";
                    const label = isDoctor ? `Dr. ${member.name}` : `Nurse ${member.name}`;

                    return (
                        <article key={index} className={styles.careCard}>
                            <div className={styles.careCardHeader}>
                                <div
                                    className={`${styles.avatar} ${isDoctor ? styles.avatarDoctor : styles.avatarNurse
                                        }`}
                                >
                                    {isDoctor ? "Dr" : "N"}
                                </div>

                                <div className={styles.careInfo}>
                                    <h3 className={styles.careName}>{label}</h3>
                                    {/* <span className={styles.roleBadge}>
                    {isDoctor ? "Doctor" : "Nurse"}
                  </span> */}
                                    <span
                                        className={`${styles.roleBadge} ${isDoctor ? styles.roleBadgeDoctor : styles.roleBadgeNurse
                                            }`}
                                    >
                                        {isDoctor ? "Doctor" : "Nurse"}
                                    </span>
                                    <div className={styles.careMeta}>
                                        <span className={styles.metaItem}>
                                            <MailIcon />
                                            {member.email}
                                        </span>

                                        <span className={styles.metaItem}>
                                            <PhoneIcon />
                                            Via Hospital Admin
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className={styles.careMeta}>
                                <span className={styles.metaItem}>
                                    <MailIcon />
                                    {member.email}
                                </span>

                                <span className={styles.metaItem}>
                                    <PhoneIcon />
                                    Via Hospital Admin
                                </span>
                            </div> */}
                        </article>
                    );
                })}
            </div>

            {/* CONTACT SECTION */}
            <div className={styles.contactWrapper}>
                <div className={styles.contactHeader}>
                    <PhoneIcon />
                    <h3>Need to Contact the Care Team?</h3>
                </div>

                <p className={styles.contactText}>
                    For urgent matters or questions about patient care, please contact
                    hospital administration who will connect you with the appropriate care
                    team member.
                </p>

                <button className={styles.contactButton}>
                    Contact Hospital
                </button>
            </div>
        </div>
    );
};

export { CareTeam };