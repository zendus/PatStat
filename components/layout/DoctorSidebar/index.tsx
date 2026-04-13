import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';
import { DoctorRoute } from '@/utils/doctorRoutes';

interface DoctorSidebarProps {
  activeLink: DoctorRoute;
  onLogout?: () => void;
}

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ activeLink, onLogout }) => {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.sidebarHeader}>

        <div className={styles.logo}>
          <div className={styles.logoIcon} aria-hidden="true">
            <Link href="/patient-dashboard/overview">
              <Image src="/images/pat-stat-doctor-side-logo.svg"
                alt="Pat-stat patient dashboard logo"
                width={95}
                height={40}
              />
            </Link>
            <p className={styles.logoHospital}>Parklane General Hospital</p>
          </div>
        </div>

        <div className={styles.patientInfoBox}>
          <div className={styles.patientNameBox}>
            <p className={styles.patientName}>Dr. Tobenna Obi</p>
            <p className={styles.patientRole}>Doctor</p>
          </div>
        </div>

      </div>

      <nav className={styles.sidebarNav} aria-label="Patient dashboard navigation">
        <ul className={styles.navList}>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/dashboard"
              className={`${styles.navLink} ${activeLink === 'dashboard' ? styles.active : ''}`}
            >

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9995 21C13.7344 20.9996 13.4803 20.894 13.293 20.7064C13.1057 20.5188 13.0005 20.2646 13.0005 19.9995V12C13.0005 11.448 13.4475 10.9995 13.9995 10.9995H19.9995C20.5515 10.9995 21 11.448 21 12V19.9995C21 20.2648 20.8946 20.5193 20.707 20.707C20.5193 20.8946 20.2648 21 19.9995 21H13.9995ZM4.0005 13.0005C3.73515 13.0005 3.48067 12.8951 3.29304 12.7075C3.10541 12.5198 3 12.2653 3 12V4.0005C3 3.447 3.447 3 4.0005 3H10.0005C10.5525 3 10.9995 3.447 10.9995 4.0005V12C10.9995 12.2651 10.8943 12.5193 10.707 12.7069C10.5197 12.8945 10.2656 13.0001 10.0005 13.0005H4.0005ZM9 10.9995V4.9995H4.9995V10.9995H9ZM4.0005 21C3.73515 21 3.48067 20.8946 3.29304 20.707C3.10541 20.5193 3 20.2648 3 19.9995V16.0005C3 15.4485 3.447 15 4.0005 15H10.0005C10.5525 15 10.9995 15.4485 10.9995 16.0005V19.9995C10.9995 20.2646 10.8943 20.5188 10.707 20.7064C10.5197 20.894 10.2656 20.9996 10.0005 21H4.0005ZM4.9995 19.0005H9V16.9995H4.9995V19.0005ZM15 19.0005H19.0005V13.0005H15V19.0005ZM13.0005 4.0005C13.0005 3.447 13.4475 3 13.9995 3H19.9995C20.5515 3 21 3.447 21 4.0005V7.9995C21 8.26485 20.8946 8.51933 20.707 8.70696C20.5193 8.89459 20.2648 9 19.9995 9H13.9995C13.7344 8.9996 13.4803 8.89402 13.293 8.70643C13.1057 8.51884 13.0005 8.26459 13.0005 7.9995V4.0005ZM15 4.9995V7.0005H19.0005V4.9995H15Z" fill="currentColor" />
              </svg>


              Dashboard
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/patients"
              className={`${styles.navLink} ${activeLink === 'patient' ? styles.active : ''}`}
            >

              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9994 11.6668C16.5778 11.6668 18.6661 9.5785 18.6661 7.00016C18.6661 4.42183 16.5778 2.3335 13.9994 2.3335C11.4211 2.3335 9.33276 4.42183 9.33276 7.00016C9.33276 9.5785 11.4211 11.6668 13.9994 11.6668ZM13.9994 4.66683C15.2828 4.66683 16.3328 5.71683 16.3328 7.00016C16.3328 8.2835 15.2828 9.3335 13.9994 9.3335C12.7161 9.3335 11.6661 8.2835 11.6661 7.00016C11.6661 5.71683 12.7161 4.66683 13.9994 4.66683ZM21.4544 14.6535C19.4944 13.6502 16.9511 12.8335 13.9994 12.8335C11.0478 12.8335 8.50442 13.6502 6.54442 14.6535C5.97516 14.9467 5.49828 15.3919 5.16671 15.9397C4.83514 16.4875 4.66186 17.1165 4.66609 17.7568V25.6668H6.99942V17.7568C6.99942 17.3135 7.23276 16.9168 7.58276 16.7302C8.99442 16.0185 11.2344 15.1668 13.9994 15.1668C14.8861 15.1668 15.7144 15.2485 16.4844 15.4002L14.6761 19.2502H11.3744C9.60109 19.2502 8.16609 20.6852 8.16609 22.4585C8.16609 24.2318 9.60109 25.6668 11.3744 25.6668H20.9994C22.2828 25.6668 23.3328 24.6168 23.3328 23.3335V17.7568C23.3328 16.4502 22.6211 15.2485 21.4544 14.6535ZM12.7628 23.3335H11.3744C10.8961 23.3335 10.4994 22.9368 10.4994 22.4585C10.4994 21.9802 10.8961 21.5835 11.3744 21.5835H13.5794L12.7628 23.3335ZM20.9994 23.3335H15.3411L18.7711 16.0185C19.4011 16.2518 19.9494 16.4968 20.4161 16.7302C20.7661 16.9168 20.9994 17.3135 20.9994 17.7568V23.3335Z" fill="currentColor" />
              </svg>

              My Patients
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/status"
              className={`${styles.navLink} ${activeLink === 'status' ? styles.active : ''}`}
            >
              {/* Pulse / activity icon — more fitting than double-chevron */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Patient Status Updates
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/notes"
              className={`${styles.navLink} ${activeLink === 'notes' ? styles.active : ''}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V6M12 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 10H14M8 14H16M8 18H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Clinical Notes
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/shift"
              className={`${styles.navLink} ${activeLink === 'shift' ? styles.active : ''}`}
            >

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.6 19.92L7.124 18.701L7.134 18.693C7.452 18.438 7.613 18.31 7.792 18.219C7.95267 18.137 8.122 18.0777 8.3 18.041C8.499 18 8.706 18 9.122 18H17.803C18.921 18 19.481 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.48 21 15.92 21 14.804V7.197C21 6.079 21 5.519 20.782 5.092C20.59 4.71554 20.2837 4.40957 19.907 4.218C19.48 4 18.92 4 17.8 4H6.2C5.08 4 4.52 4 4.092 4.218C3.71569 4.40974 3.40974 4.71569 3.218 5.092C3 5.52 3 6.08 3 7.2V18.671C3 19.737 3 20.27 3.218 20.543C3.31174 20.6607 3.43083 20.7557 3.56641 20.821C3.70198 20.8863 3.85053 20.9201 4.001 20.92C4.351 20.92 4.767 20.586 5.6 19.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              Shift Handover
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/emergency"
              className={`${styles.navLink} ${activeLink === 'emergency' ? styles.active : ''}`}
            >

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2982 3.14795L21.9322 18.1019C22.0638 18.33 22.1332 18.5886 22.1332 18.8519C22.1332 19.1152 22.0639 19.3739 21.9322 19.6019C21.8006 19.83 21.6112 20.0193 21.3832 20.151C21.1552 20.2826 20.8965 20.3519 20.6332 20.3519H3.3652C3.10189 20.3519 2.84323 20.2826 2.61521 20.151C2.38719 20.0193 2.19783 19.83 2.06619 19.6019C1.93454 19.3739 1.86523 19.1152 1.86523 18.8519C1.86524 18.5886 1.93455 18.33 2.0662 18.1019L10.7002 3.14795C11.2772 2.14795 12.7202 2.14795 13.2982 3.14795ZM11.9992 4.89795L4.2312 18.3519H19.7672L11.9992 4.89795ZM11.9992 14.9999C12.2644 14.9999 12.5188 15.1053 12.7063 15.2928C12.8938 15.4804 12.9992 15.7347 12.9992 15.9999C12.9992 16.2652 12.8938 16.5195 12.7063 16.7071C12.5188 16.8946 12.2644 16.9999 11.9992 16.9999C11.734 16.9999 11.4796 16.8946 11.2921 16.7071C11.1046 16.5195 10.9992 16.2652 10.9992 15.9999C10.9992 15.7347 11.1046 15.4804 11.2921 15.2928C11.4796 15.1053 11.734 14.9999 11.9992 14.9999ZM11.9992 7.99995C12.2644 7.99995 12.5188 8.10531 12.7063 8.29284C12.8938 8.48038 12.9992 8.73473 12.9992 8.99995V12.9999C12.9992 13.2652 12.8938 13.5195 12.7063 13.7071C12.5188 13.8946 12.2644 13.9999 11.9992 13.9999C11.734 13.9999 11.4796 13.8946 11.2921 13.7071C11.1046 13.5195 10.9992 13.2652 10.9992 12.9999V8.99995C10.9992 8.73473 11.1046 8.48038 11.2921 8.29284C11.4796 8.10531 11.734 7.99995 11.9992 7.99995Z" fill="currentColor" />
              </svg>

              Emergency Flags
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/history"
              className={`${styles.navLink} ${activeLink === 'history' ? styles.active : ''}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C10.75 21 9.57933 20.7627 8.488 20.288C7.39667 19.8133 6.44667 19.1717 5.638 18.363C4.82933 17.5543 4.18767 16.6043 3.713 15.513C3.23833 14.4217 3.00067 13.2507 3 12C2.99933 10.7493 3.237 9.57867 3.713 8.488C4.189 7.39733 4.83033 6.44733 5.637 5.638C6.44367 4.82867 7.39367 4.187 8.487 3.713C9.58034 3.239 10.7513 3.00133 12 3C13.3667 3 14.6627 3.29167 15.888 3.875C17.1133 4.45833 18.1507 5.28333 19 6.35V5C19 4.71667 19.096 4.47933 19.288 4.288C19.48 4.09667 19.7173 4.00067 20 4C20.2827 3.99933 20.5203 4.09533 20.713 4.288C20.9057 4.48067 21.0013 4.718 21 5V9C21 9.28333 20.904 9.521 20.712 9.713C20.52 9.905 20.2827 10.0007 20 10H16C15.7167 10 15.4793 9.904 15.288 9.712C15.0967 9.52 15.0007 9.28267 15 9C14.9993 8.71733 15.0953 8.48 15.288 8.288C15.4807 8.096 15.718 8 16 8H17.75C17.0667 7.06667 16.225 6.33333 15.225 5.8C14.225 5.26667 13.15 5 12 5C10.05 5 8.396 5.67933 7.038 7.038C5.68 8.39667 5.00067 10.0507 5 12C4.99933 13.9493 5.67867 15.6037 7.038 16.963C8.39734 18.3223 10.0513 19.0013 12 19C13.5833 19 15 18.525 16.25 17.575C17.5 16.625 18.325 15.4 18.725 13.9C18.8083 13.6333 18.9583 13.4333 19.175 13.3C19.3917 13.1667 19.6333 13.1167 19.9 13.15C20.1833 13.1833 20.4083 13.304 20.575 13.512C20.7417 13.72 20.7917 13.9493 20.725 14.2C20.2417 16.1833 19.1917 17.8127 17.575 19.088C15.9583 20.3633 14.1 21.0007 12 21ZM13 11.6L15.5 14.1C15.6833 14.2833 15.775 14.5167 15.775 14.8C15.775 15.0833 15.6833 15.3167 15.5 15.5C15.3167 15.6833 15.0833 15.775 14.8 15.775C14.5167 15.775 14.2833 15.6833 14.1 15.5L11.3 12.7C11.2 12.6 11.125 12.4877 11.075 12.363C11.025 12.2383 11 12.109 11 11.975V8C11 7.71667 11.096 7.47933 11.288 7.288C11.48 7.09667 11.7173 7.00067 12 7C12.2827 6.99933 12.5203 7.09533 12.713 7.288C12.9057 7.48067 13.0013 7.718 13 8V11.6Z" fill="currentColor" />
              </svg>

              Update History
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/notifications"
              className={`${styles.navLink} ${activeLink === 'notifications' ? styles.active : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              Notifications
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              href="/doctor-dashboard/profile"
              className={`${styles.navLink} ${activeLink === 'profile' ? styles.active : ''}`}
            >

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z" stroke="currentColor" strokeWidth="2" />
              </svg>

              Profile &amp; Settings
            </Link>
          </li>

        </ul>
      </nav>

      {/* ── Logout ── */}
      <div className={styles.logoutContainer}>
        <button
          className={styles.logoutBtn}
          type="button"
          onClick={onLogout}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </button>
      </div>

    </aside>
  );
};

export { DoctorSidebar };