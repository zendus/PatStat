// "use client";

// import React, { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { PatientSidebar } from '@/components/layout';
// import { PatientMobileHeader } from '@/components/layout';
// import { PatientMobileFooter } from '@/components/layout';
// import { PatientMobileMenu } from '@/components/layout';
// import dashboardStyles from './dashboard.module.css';

// interface PatientDashboardLayoutProps {
//   children: React.ReactNode;
// }

// const PatientDashboardLayout: React.FC<PatientDashboardLayoutProps> = ({ children }) => {
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
//   const [showNotifications, setShowNotifications] = useState<boolean>(false);

//   const pathname = usePathname();

//   const getActiveLink = () => {
//   if (pathname.includes("/overview")) return "overview";
//   if (pathname.includes("/updates")) return "updates";
//   if (pathname.includes("/history")) return "history";
//   if (pathname.includes("/careteam")) return "careteam";
//   if (pathname.includes("/notifications")) return "notifications";
//   if (pathname.includes("/help")) return "help";
//   return "overview";
// };

// const activeLink = getActiveLink();

// const footerActiveLink =
//   activeLink === "overview"
//     ? "status"
//     : activeLink === "updates"
//     ? "updates"
//     : activeLink === "careteam"
//     ? "careteam"
//     : "help";
//   // const activeLink: 'overview' | 'updates' | 'history' | 'careteam' | 'notifications' | 'help' = 'updates';
//   // const footerActiveLink: 'status' | 'updates' | 'careteam' | 'help' = 'updates';

//   useEffect(() => {
//     const handleResize = (): void => {
//       setIsMobile(window.innerWidth <= 860);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleMenuToggle = (): void => {
//     setShowNotifications(false);
//     setShowMobileMenu(!showMobileMenu);
//   };

//   const handleNotificationToggle = (): void => {
//     setShowMobileMenu(true);
//     setShowNotifications(true);
//   };

//   const handleCloseMobileMenu = (): void => {
//     setShowMobileMenu(false);
//     setShowNotifications(false);
//   };

//   return (
//     <div className={dashboardStyles.dashboardLayout}>
//       {isMobile ? (
//         <>
//           <PatientMobileHeader onMenuToggle={handleMenuToggle} onNotificationToggle={handleNotificationToggle} />
//           <PatientMobileMenu
//             isOpen={showMobileMenu}
//             onClose={handleCloseMobileMenu}
//             showNotifications={showNotifications}
//             activeLink={activeLink}
//           />
//           <main className={dashboardStyles.mobileMainContent}>
//             {children}
//           </main>
//           <PatientMobileFooter
//             activeLink={footerActiveLink}
//           />
//         </>
//       ) : (
//         <>
//           <PatientSidebar activeLink={activeLink} />
//           <main className={dashboardStyles.desktopMainContent}>
//             {children}
//           </main>
//         </>
//       )}
//     </div>
//   );
// };

// export default PatientDashboardLayout;



"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  PatientSidebar,
  PatientMobileHeader,
  PatientMobileFooter,
  PatientMobileMenu,
} from "@/components/layout";

import {
  routeMap,
  footerRouteMap,
  DashboardRoute,
} from "@/utils/dashboardRoutes";

import dashboardStyles from "./dashboard.module.css";

interface Props {
  children: React.ReactNode;
}

const PatientDashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeLink: DashboardRoute =
    routeMap[pathname] || "overview";

  const footerActiveLink: "status" | "updates" | "careteam" | "help" | undefined =
    (footerRouteMap[activeLink] as "status" | "updates" | "careteam" | "help" | undefined) || undefined;

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
          <PatientMobileHeader
            onMenuToggle={handleMenuToggle}
            onNotificationToggle={handleNotificationToggle}
          />

          <PatientMobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            showNotifications={showNotifications}
            activeLink={activeLink}
            onLogout={handleLogout}
          />

          <main className={dashboardStyles.mobileMainContent}>
            {children}
          </main>

          <PatientMobileFooter 
          activeLink={footerActiveLink} 
          />
        </>
      ) : (
        <>
          <PatientSidebar
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

export default PatientDashboardLayout;