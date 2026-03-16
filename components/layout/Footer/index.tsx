// import React from "react";
// import Link from "next/link";
// import { Text } from "@/components/ui/Typography";

// export function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer
//       style={{
//         background: "var(--color-deep-teal)",
//         color: "var(--color-white)",
//         padding: "48px var(--gutter) 24px",
//         marginTop: "auto",
//       }}
//     >
//       <div className="container">
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: 40,
//             marginBottom: 40,
//           }}
//         >
//           {/* Brand */}
//           <div>
//             <div
//               style={{
//                 fontFamily: "var(--font-heading)",
//                 fontWeight: 800,
//                 fontSize: "var(--text-h3)",
//                 color: "var(--color-white)",
//                 marginBottom: 12,
//               }}
//             >
//               Pat<span style={{ color: "var(--color-tc-3)" }}>Stat</span>
//             </div>
//             <Text size="small" color="var(--color-dtb-4)">
//               Your analytics platform for data-driven decisions.
//             </Text>
//           </div>

//           {/* Links */}
//           <div>
//             <Text size="small" weight="bold" color="var(--color-tc-3)" style={{ marginBottom: 12 }}>
//               Product
//             </Text>
//             {["Features", "How it Works", "Who it&apos;s For", "Pricing"].map((item) => (
//               <div key={item} style={{ marginBottom: 8 }}>
//                 <Link
//                   href="#"
//                   style={{
//                     color: "var(--color-dtb-4)",
//                     textDecoration: "none",
//                     fontFamily: "var(--font-body)",
//                     fontSize: "var(--text-small)",
//                   }}
//                 >
//                   {item}
//                 </Link>
//               </div>
//             ))}
//           </div>

//           <div>
//             <Text size="small" weight="bold" color="var(--color-tc-3)" style={{ marginBottom: 12 }}>
//               Company
//             </Text>
//             {["About", "Support", "Privacy Policy", "Terms of Service"].map((item) => (
//               <div key={item} style={{ marginBottom: 8 }}>
//                 <Link
//                   href="#"
//                   style={{
//                     color: "var(--color-dtb-4)",
//                     textDecoration: "none",
//                     fontFamily: "var(--font-body)",
//                     fontSize: "var(--text-small)",
//                   }}
//                 >
//                   {item}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div
//           style={{
//             borderTop: "1px solid var(--color-dtb-2)",
//             paddingTop: 24,
//             textAlign: "center",
//           }}
//         >
//           <Text size="xsmall" color="var(--color-dtb-3)">
//             © {year} PatStat. All rights reserved.
//           </Text>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";
import styles from "./style.module.css";
import Image from "next/image";

const productLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Why Pat-Stat", href: "/why-pat-stat" },
  { label: "Security & Privacy", href: "/security" },
  { label: "Support", href: "/support" },
];

const solutionsLinks = [
  { label: "For Hospitals", href: "/solutions/hospitals" },
  { label: "For Care Teams", href: "/solutions/care-teams" },
  { label: "For Families", href: "/solutions/families" },
];

const companyLinks = [
  { label: "About Pat-Stat", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topGrid}>

          {/* ── Brand ── */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoRow}>
                        <Image
                          src="/images/pat-stat-website-logo-dark.png"
                          alt="Pat-Stat Logo"
                          width={142}
                          height={50}
                          className={styles.logoImage}
                          priority
                        />
            </Link>
            <p className={styles.tagline}>
              Pat-Stat helps hospitals communicate patient status clearly and
              securely, keeping care teams and families informed when it matters
              most.
            </p>
          </div>

          {/* ── Product ── */}
          <div className={styles.linkCol}>
            <span className={styles.colHeading}>Product</span>
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Solutions ── */}
          <div className={styles.linkCol}>
            <span className={styles.colHeading}>Solutions</span>
            {solutionsLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Company ── */}
          <div className={`${styles.linkCol} ${styles.linkColCompany}`}>
            <span className={styles.colHeading}>Company</span>
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          ©{year} Pat-Stat. All rights reserved. Built for African healthcare systems.
        </p>
      </div>
    </footer>
  );
}

export default Footer;