"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { 
  DoctorMobileFooter,
  DoctorMobileMenu,
  DoctorMobileHeader, 
} from "@/components/layout";
import {
  routeMap,
  footerRouteMap,
  DoctorRoute,
} from "@/utils/doctorRoutes";


import dashboardStyles from "./dashboard.module.css";
import { DoctorSidebar } from "@/components/layout/DoctorSidebar";

interface Props {
  children: React.ReactNode;
}

const DoctorDashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeLink: DoctorRoute =
    routeMap[pathname] || "dashboard";

  const footerActiveLink: "dashboard" | "updates" | "notes" | "profile" | undefined =
    (footerRouteMap[activeLink] as "dashboard" | "updates" | "notes" | "profile" | undefined) || undefined;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    router.push("/demo");
  };

  const handleMenuToggle = () => {
    setShowNotifications(false);
    setShowMobileMenu((prev) => !prev);
  };

  const handleNotificationToggle = () => {
    setShowMobileMenu(true);
    setShowNotifications(true);
  };

  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
    setShowNotifications(false);
  };

  return (
    <div className={dashboardStyles.dashboardLayout}>
      {isMobile ? (
        <>
          <DoctorMobileHeader
            onMenuToggle={handleMenuToggle}
            onNotificationToggle={handleNotificationToggle}
          />

          <DoctorMobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            showNotifications={showNotifications}
            // activeLink={activeLink}
            onLogout={handleLogout}
          />

          <main className={dashboardStyles.mobileMainContent}>
            {children}
          </main>

          <DoctorMobileFooter
          activeLink={footerActiveLink} 
          />
        </>
      ) : (
        <>
          <DoctorSidebar
            activeLink={activeLink}
            onLogout={handleLogout}
          />

          <main className={dashboardStyles.desktopMainContent}>
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default DoctorDashboardLayout;