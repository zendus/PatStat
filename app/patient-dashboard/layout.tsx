"use client";

import React, { useState, useEffect } from 'react';
import { PatientSidebar } from '@/components/layout';
import { PatientMobileHeader } from '@/components/layout';
import { PatientMobileFooter } from '@/components/layout';
import { PatientMobileMenu } from '@/components/layout';
import dashboardStyles from './dashboard.module.css';

interface PatientDashboardLayoutProps {
  children: React.ReactNode;
}

const PatientDashboardLayout: React.FC<PatientDashboardLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const activeLink: 'overview' | 'updates' | 'history' | 'careteam' | 'notifications' | 'help' = 'updates';
  const footerActiveLink: 'status' | 'updates' | 'careteam' | 'help' = 'updates';

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 860);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = (): void => {
    setShowNotifications(false);
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNotificationToggle = (): void => {
    setShowMobileMenu(true);
    setShowNotifications(true);
  };

  const handleCloseMobileMenu = (): void => {
    setShowMobileMenu(false);
    setShowNotifications(false);
  };

  return (
    <div className={dashboardStyles.dashboardLayout}>
      {isMobile ? (
        <>
          <PatientMobileHeader onMenuToggle={handleMenuToggle} onNotificationToggle={handleNotificationToggle} />
          <PatientMobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            showNotifications={showNotifications}
            activeLink={activeLink}
          />
          <main className={dashboardStyles.mobileMainContent}>
            {children}
          </main>
          <PatientMobileFooter activeLink={footerActiveLink} />
        </>
      ) : (
        <>
          <PatientSidebar activeLink={activeLink} />
          <main className={dashboardStyles.desktopMainContent}>
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default PatientDashboardLayout;