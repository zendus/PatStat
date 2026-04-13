"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { 
    NurseMobileFooter,
    NurseMobileMenu,
    NurseMobileHeader,
 } from "@/components/layout";

import {
    routeMap,
    footerRouteMap,
    NurseRoute,
} from "@/utils/nurseRoutes";



import dashboardStyles from "./dashboard.module.css";
import { NurseSidebar } from "@/components/layout";

interface Props {
  children: React.ReactNode;
}

const NurseDashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeLink: NurseRoute =
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
          <NurseMobileHeader
            onMenuToggle={handleMenuToggle}
            onNotificationToggle={handleNotificationToggle}
          />

          <NurseMobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            showNotifications={showNotifications}
            // activeLink={activeLink}
            onLogout={handleLogout}
          />

          <main className={dashboardStyles.mobileMainContent}>
            {children}
          </main>

          <NurseMobileFooter
          activeLink={footerActiveLink} 
          />
        </>
      ) : (
        <>
          <NurseSidebar
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

export default NurseDashboardLayout;