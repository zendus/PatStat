import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';
import { SuperRoute } from '@/utils/superRoutes';

interface SuperAdminSidebarProps {
    activeLink: SuperRoute;
    onLogout?: () => void;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ activeLink, onLogout }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon} aria-hidden="true">
                        <Link href="/super-admin/overview">
                            <Image src="/images/pat-stat-super-admin-side-logo.svg"
                                alt="Pat-stat admin dashboard logo"
                                width={138}
                                height={40}
                            />
                        </Link>
                        <p className={styles.logoHospital}>SUPER ADMIN</p>
                    </div>
                </div>
            </div>
            <nav className={styles.sidebarNav} aria-label="Admin dashboard navigation">
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link
                            href="/super-admin/overview"
                            className={`${styles.navLink} ${activeLink === 'overview' ? styles.active : ''}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9995 21C13.7344 20.9996 13.4803 20.894 13.293 20.7064C13.1057 20.5188 13.0005 20.2646 13.0005 19.9995V12C13.0005 11.448 13.4475 10.9995 13.9995 10.9995H19.9995C20.5515 10.9995 21 11.448 21 12V19.9995C21 20.2648 20.8946 20.5193 20.707 20.707C20.5193 20.8946 20.2648 21 19.9995 21H13.9995ZM4.0005 13.0005C3.73515 13.0005 3.48067 12.8951 3.29304 12.7075C3.10541 12.5198 3 12.2653 3 12V4.0005C3 3.447 3.447 3 4.0005 3H10.0005C10.5525 3 10.9995 3.447 10.9995 4.0005V12C10.9995 12.2651 10.8943 12.5193 10.707 12.7069C10.5197 12.8945 10.2656 13.0001 10.0005 13.0005H4.0005ZM9 10.9995V4.9995H4.9995V10.9995H9ZM4.0005 21C3.73515 21 3.48067 20.8946 3.29304 20.707C3.10541 20.5193 3 20.2648 3 19.9995V16.0005C3 15.4485 3.447 15 4.0005 15H10.0005C10.5525 15 10.9995 15.4485 10.9995 16.0005V19.9995C10.9995 20.2646 10.8943 20.5188 10.707 20.7064C10.5197 20.894 10.2656 20.9996 10.0005 21H4.0005ZM4.9995 19.0005H9V16.9995H4.9995V19.0005ZM15 19.0005H19.0005V13.0005H15V19.0005ZM13.0005 4.0005C13.0005 3.447 13.4475 3 13.9995 3H19.9995C20.5515 3 21 3.447 21 4.0005V7.9995C21 8.26485 20.8946 8.51933 20.707 8.70696C20.5193 8.89459 20.2648 9 19.9995 9H13.9995C13.7344 8.9996 13.4803 8.89402 13.293 8.70643C13.1057 8.51884 13.0005 8.26459 13.0005 7.9995V4.0005ZM15 4.9995V7.0005H19.0005V4.9995H15Z" fill="currentColor" />
                            </svg>
                            Overview
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            href="/super-admin/hospitals"
                            className={`${styles.navLink} ${activeLink === 'hospital' ? styles.active : ''}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 22V4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V22H6Z" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 12H4C3.46957 12 2.96086 12.2107 2.58579 12.5858C2.21071 12.9609 2 13.4696 2 14V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H6" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H18" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 6H14" stroke="#646363" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 10H14" stroke="#646363" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 14H14" stroke="#646363" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 18H14" stroke="#646363" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Hospitals
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            href="/super-admin/admins"
                            className={`${styles.navLink} ${activeLink === 'admins' ? styles.active : ''}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Admins
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            href="/super-admin/audit"
                            className={`${styles.navLink} ${activeLink === 'audit' ? styles.active : ''}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H14C14.2652 2.00006 14.5195 2.10545 14.707 2.293L19.707 7.293C19.8946 7.48049 19.9999 7.73481 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4ZM17.586 8L14 4.414V8H17.586ZM12 4H6V20H18V10H13C12.7348 10 12.4804 9.89464 12.2929 9.70711C12.1054 9.51957 12 9.26522 12 9V4ZM8 13C8 12.7348 8.10536 12.4804 8.29289 12.2929C8.48043 12.1054 8.73478 12 9 12H15C15.2652 12 15.5196 12.1054 15.7071 12.2929C15.8946 12.4804 16 12.7348 16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H9C8.73478 14 8.48043 13.8946 8.29289 13.7071C8.10536 13.5196 8 13.2652 8 13ZM8 17C8 16.7348 8.10536 16.4804 8.29289 16.2929C8.48043 16.1054 8.73478 16 9 16H15C15.2652 16 15.5196 16.1054 15.7071 16.2929C15.8946 16.4804 16 16.7348 16 17C16 17.2652 15.8946 17.5196 15.7071 17.7071C15.5196 17.8946 15.2652 18 15 18H9C8.73478 18 8.48043 17.8946 8.29289 17.7071C8.10536 17.5196 8 17.2652 8 17Z" fill="currentColor" />
                            </svg>
                            Audit Logs
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            href="/super-admin/settings"
                            className={`${styles.navLink} ${activeLink === 'settings' ? styles.active : ''}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.218 2H11.778C11.2476 2 10.7389 2.21071 10.3638 2.58579C9.98876 2.96086 9.77805 3.46957 9.77805 4V4.18C9.77769 4.53073 9.68511 4.87519 9.50959 5.17884C9.33407 5.48248 9.08179 5.73464 8.77805 5.91L8.34805 6.16C8.04401 6.33554 7.69912 6.42795 7.34805 6.42795C6.99698 6.42795 6.65209 6.33554 6.34805 6.16L6.19805 6.08C5.73911 5.81526 5.19389 5.74344 4.68205 5.88031C4.17022 6.01717 3.7336 6.35154 3.46805 6.81L3.24805 7.19C2.98331 7.64893 2.91149 8.19416 3.04836 8.706C3.18522 9.21783 3.51958 9.65445 3.97805 9.92L4.12805 10.02C4.43032 10.1945 4.68167 10.4451 4.8571 10.7468C5.03253 11.0486 5.12594 11.391 5.12805 11.74V12.25C5.12945 12.6024 5.0377 12.949 4.86209 13.2545C4.68649 13.5601 4.43326 13.8138 4.12805 13.99L3.97805 14.08C3.51958 14.3456 3.18522 14.7822 3.04836 15.294C2.91149 15.8058 2.98331 16.3511 3.24805 16.81L3.46805 17.19C3.7336 17.6485 4.17022 17.9828 4.68205 18.1197C5.19389 18.2566 5.73911 18.1847 6.19805 17.92L6.34805 17.84C6.65209 17.6645 6.99698 17.5721 7.34805 17.5721C7.69912 17.5721 8.04401 17.6645 8.34805 17.84L8.77805 18.09C9.08179 18.2654 9.33407 18.5175 9.50959 18.8212C9.68511 19.1248 9.77769 19.4693 9.77805 19.82V20C9.77805 20.5304 9.98876 21.0391 10.3638 21.4142C10.7389 21.7893 11.2476 22 11.778 22H12.218C12.7485 22 13.2572 21.7893 13.6323 21.4142C14.0073 21.0391 14.218 20.5304 14.218 20V19.82C14.2184 19.4693 14.311 19.1248 14.4865 18.8212C14.662 18.5175 14.9143 18.2654 15.218 18.09L15.648 17.84C15.9521 17.6645 16.297 17.5721 16.648 17.5721C16.9991 17.5721 17.344 17.6645 17.648 17.84L17.798 17.92C18.257 18.1847 18.8022 18.2566 19.314 18.1197C19.8259 17.9828 20.2625 17.6485 20.528 17.19L20.748 16.8C21.0128 16.3411 21.0846 15.7958 20.9477 15.284C20.8109 14.7722 20.4765 14.3356 20.018 14.07L19.868 13.99C19.5628 13.8138 19.3096 13.5601 19.134 13.2545C18.9584 12.949 18.8667 12.6024 18.868 12.25V11.75C18.8667 11.3976 18.9584 11.051 19.134 10.7455C19.3096 10.4399 19.5628 10.1862 19.868 10.01L20.018 9.92C20.4765 9.65445 20.8109 9.21783 20.9477 8.706C21.0846 8.19416 21.0128 7.64893 20.748 7.19L20.528 6.81C20.2625 6.35154 19.8259 6.01717 19.314 5.88031C18.8022 5.74344 18.257 5.81526 17.798 6.08L17.648 6.16C17.344 6.33554 16.9991 6.42795 16.648 6.42795C16.297 6.42795 15.9521 6.33554 15.648 6.16L15.218 5.91C14.9143 5.73464 14.662 5.48248 14.4865 5.17884C14.311 4.87519 14.2184 4.53073 14.218 4.18V4C14.218 3.46957 14.0073 2.96086 13.6323 2.58579C13.2572 2.21071 12.7485 2 12.218 2Z" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Settings
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

export { SuperAdminSidebar };