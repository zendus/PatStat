// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import styles from "./style.module.css";
// import Image from "next/image";

// interface NavItem {
//   label: string;
//   href: string;
// }

// const navItems: readonly NavItem[] = [
//   { label: "Features", href: "#features" },
//   { label: "How it Works", href: "#how-it-works" },
//   { label: "Who it's For", href: "#who-its-for" },
//   { label: "Support", href: "#support" },
// ];

// export const Navbar: React.FC = () => {
//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);
//   const navRef = useRef<HTMLElement>(null);

//   const toggleMobile = useCallback(() => {
//     setMobileOpen((prev) => !prev);
//   }, []);

//   const closeMobile = useCallback(() => {
//     setMobileOpen(false);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         closeMobile();
//       }
//     };

//     if (mobileOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [mobileOpen, closeMobile]);

//   // Handle Smooth Scroll
//   const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     if (href.startsWith("#")) {
//       e.preventDefault();
//       const targetId = href.replace("#", "");
//       const elem = document.getElementById(targetId);
//       elem?.scrollIntoView({ behavior: "smooth" });
//       closeMobile();
//     }
//   };

//   useEffect(() => {
//     const handleResize = (): void => {
//       if (window.innerWidth > 768 && mobileOpen) {
//         closeMobile();
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [mobileOpen, closeMobile]);

//   return (
//     <nav className={styles.nav} ref={navRef}>
//       <div className={styles.inner}>
//         <Link href="/" className={styles.logo}>
//           <Image
//             src="/images/pat-stat-website-logo.png"
//             alt="Pat-Stat Logo"
//             width={142}
//             height={50}
//             className={styles.logoImage}
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//             priority
//           />
//         </Link>

//         <ul className={styles.desktopLinks}>
//           {navItems.map((item) => (
//             <li key={item.href}>
//               <Link href={item.href}
//                 className={styles.navLink}
//                 onClick={(e) => handleScroll(e, item.href)}
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className={styles.desktopCta}>
//           <Link href="/demo" className={styles.tryDemoBtn}>
//             Try Demo
//           </Link>
//         </div>

//         <button
//           className={styles.hamburger}
//           onClick={toggleMobile}
//           aria-label={mobileOpen ? "Close menu" : "Open menu"}
//           aria-expanded={mobileOpen}
//           type="button"
//         >
//           {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
//         </button>
//       </div>

//       <div
//         className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}
//         aria-hidden={!mobileOpen}
//       >
//         {navItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={styles.mobileNavItem}
//             // onClick={closeMobile}
//             onClick={(e) => handleScroll(e, item.href)}
//           >
//             {item.label}
//           </Link>
//         ))}

//         <hr className={styles.mobileDivider} />

//         <Link href="/demo" className={styles.mobileCta} onClick={closeMobile}>
//           Try Demo
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./style.module.css";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

const navItems: readonly NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Who it's For", href: "#who-its-for" },
  { label: "Support", href: "#support" },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMobile();
      }
    };

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen, closeMobile]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);

      elem?.scrollIntoView({ behavior: "smooth" });

      setActive(href); // 🔥 active state
      closeMobile();
    }
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth > 768 && mobileOpen) {
        closeMobile();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen, closeMobile]);

  return (
    <nav className={styles.nav} ref={navRef}>
      <div className={styles.inner}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/pat-stat-website-logo.png"
            alt="Pat-Stat Logo"
            width={142}
            height={50}
            className={styles.logoImage}
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActive(""); // reset active
            }}
            priority
          />
        </Link>

        {/* DESKTOP LINKS */}
        <ul className={styles.desktopLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  active === item.href ? styles.active : ""
                }`}
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.desktopCta}>
          <Link href="/demo" className={styles.tryDemoBtn}>
            Try Demo
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className={styles.hamburger}
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          type="button"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileNavItem}
            onClick={(e) => handleScroll(e, item.href)}
          >
            {item.label}
          </Link>
        ))}

        <hr className={styles.mobileDivider} />

        <Link href="/demo" className={styles.mobileCta} onClick={closeMobile}>
          Try Demo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;