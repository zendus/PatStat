"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/FlatButton";
import { NavLinkText } from "@/components/ui/Typography";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Who it's For", href: "/who-its-for" },
  { label: "Support", href: "/support" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-white)",
        borderBottom: "1px solid var(--color-dtb-4)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "var(--text-h3)",
            color: "var(--color-deep-teal)",
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          Pat<span style={{ color: "var(--color-teal-cyan)" }}>Stat</span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
          className="hidden md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <NavLinkText>{item.label}</NavLinkText>
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          className="hidden md:flex"
        >
          <Link href="/login" style={{ textDecoration: "none" }}>
            <NavLinkText>Log In</NavLinkText>
          </Link>
          <Button variant="secondary" size="sm">
            Try Interactive Demo →
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-deep-teal)",
          }}
          className="md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "var(--color-white)",
            borderTop: "1px solid var(--color-dtb-4)",
            padding: "16px var(--gutter) 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
              onClick={() => setMobileOpen(false)}
            >
              <NavLinkText>{item.label}</NavLinkText>
            </Link>
          ))}
          <hr style={{ borderColor: "var(--color-dtb-4)" }} />
          <Link href="/login" style={{ textDecoration: "none" }}>
            <NavLinkText>Log In</NavLinkText>
          </Link>
          <Button variant="secondary" size="md" fullWidth>
            Try Interactive Demo →
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;