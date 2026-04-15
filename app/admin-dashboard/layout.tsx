"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
    routeMap,
    footerRouteMap,
    AdminRoute,
} from "@/utils/adminRoutes";


import dashboardStyles from "./dashboard.module.css";
import { 
    AdminMobileFooter,
    AdminMobileHeader,
    AdminMobileMenu,
    AdminSidebar 
} from "@/components/layout";

interface Props {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeLink: AdminRoute =
    routeMap[pathname] || "overview";

  const footerActiveLink: "overview" | "patient" | "teams" | "wards" | "settings" | undefined =
    (footerRouteMap[activeLink] as "overview" | "patient" | "teams" | "wards" | "settings" | undefined) || undefined;

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
          <AdminMobileHeader
            onMenuToggle={handleMenuToggle}
            onNotificationToggle={handleNotificationToggle}
          />

          <AdminMobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            showNotifications={showNotifications}
            // activeLink={activeLink}
            onLogout={handleLogout}
          />

          <main className={dashboardStyles.mobileMainContent}>
            {children}
          </main>

          <AdminMobileFooter
          activeLink={footerActiveLink} 
          />
        </>
      ) : (
        <>
          <AdminSidebar
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

export default AdminDashboardLayout;