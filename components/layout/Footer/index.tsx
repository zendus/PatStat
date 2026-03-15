import React from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Typography";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-deep-teal)",
        color: "var(--color-white)",
        padding: "48px var(--gutter) 24px",
        marginTop: "auto",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "var(--text-h3)",
                color: "var(--color-white)",
                marginBottom: 12,
              }}
            >
              Pat<span style={{ color: "var(--color-tc-3)" }}>Stat</span>
            </div>
            <Text size="small" color="var(--color-dtb-4)">
              Your analytics platform for data-driven decisions.
            </Text>
          </div>

          {/* Links */}
          <div>
            <Text size="small" weight="bold" color="var(--color-tc-3)" style={{ marginBottom: 12 }}>
              Product
            </Text>
            {["Features", "How it Works", "Who it&apos;s For", "Pricing"].map((item) => (
              <div key={item} style={{ marginBottom: 8 }}>
                <Link
                  href="#"
                  style={{
                    color: "var(--color-dtb-4)",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-small)",
                  }}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <Text size="small" weight="bold" color="var(--color-tc-3)" style={{ marginBottom: 12 }}>
              Company
            </Text>
            {["About", "Support", "Privacy Policy", "Terms of Service"].map((item) => (
              <div key={item} style={{ marginBottom: 8 }}>
                <Link
                  href="#"
                  style={{
                    color: "var(--color-dtb-4)",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-small)",
                  }}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--color-dtb-2)",
            paddingTop: 24,
            textAlign: "center",
          }}
        >
          <Text size="xsmall" color="var(--color-dtb-3)">
            © {year} PatStat. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;