"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
    routeMap,
    footerRouteMap,
    SuperRoute,
} from "@/utils/superRoutes"


import dashboardStyles from "./dashboard.module.css";
import {
    SuperAdminMobileFooter,
    SuperAdminMobileHeader,
    SuperAdminMobileMenu,
    SuperAdminSidebar
} from "@/components/layout";

interface Props {
  children: React.ReactNode;
}

const SuperAdminDashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeLink: SuperRoute =
    routeMap[pathname] || "overview";

  const footerActiveLink: "overview" | "hospital" | "admins" | "audit" | "settings" | undefined =
    (footerRouteMap[activeLink] as "overview" | "hospital" | "admins" | "audit" | "settings" | undefined) || undefined;

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
          <SuperAdminMobileHeader
            onMenuToggle={handleMenuToggle}
            onNotificationToggle={handleNotificationToggle}
          />

          <SuperAdminMobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            showNotifications={showNotifications}
            // activeLink={activeLink}
            onLogout={handleLogout}
          />

          <main className={dashboardStyles.mobileMainContent}>
            {children}
          </main>

          <SuperAdminMobileFooter
          activeLink={footerActiveLink} 
          />
        </>
      ) : (
        <>
          <SuperAdminSidebar
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

export default SuperAdminDashboardLayout;