import React from "react";

// =========================================
// HEADING COMPONENT (Manrope)
// =========================================

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingWeight = "regular" | "bold" | "extrabold";

interface HeadingProps {
  level?: HeadingLevel;
  weight?: HeadingWeight;
  color?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const headingSizes: Record<HeadingLevel, string> = {
  1: "var(--text-h1)",
  2: "var(--text-h2)",
  3: "var(--text-h3)",
  4: "20px",
  5: "18px",
  6: "16px",
};

const headingWeights: Record<HeadingWeight, number> = {
  regular: 400,
  bold: 700,
  extrabold: 800,
};

export function Heading({
  level = 1,
  weight = "bold",
  color,
  children,
  className,
  style,
}: HeadingProps) {
  const Tag = `h${level}`;
  return React.createElement(
    Tag,
    {
      className,
      style: {
        fontFamily: "var(--font-heading)",
        fontSize: headingSizes[level],
        fontWeight: headingWeights[weight],
        color: color || "var(--color-deep-teal)",
        lineHeight: "auto",
        ...style,
      },
    },
    children
  );
}

// =========================================
// TEXT COMPONENT (Source Sans 3)
// =========================================

type TextSize = "large" | "medium" | "normal" | "small" | "xsmall";
type TextWeight = "regular" | "semibold" | "bold";

interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  as?: "p" | "span" | "div" | "label" | "li";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const textSizes: Record<TextSize, string> = {
  large: "var(--text-large)",
  medium: "var(--text-medium)",
  normal: "var(--text-normal)",
  small: "var(--text-small)",
  xsmall: "var(--text-xsmall)",
};

const textWeights: Record<TextWeight, number> = {
  regular: 400,
  semibold: 600,
  bold: 700,
};

export function Text({
  size = "normal",
  weight = "regular",
  color,
  as: Tag = "p",
  children,
  className,
  style,
}: TextProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: textSizes[size],
        fontWeight: textWeights[weight],
        color: color || "var(--color-grey-1)",
        lineHeight: 1.6,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// =========================================
// NAV LINK TEXT
// =========================================

interface NavLinkTextProps {
  children: React.ReactNode;
  active?: boolean;
  style?: React.CSSProperties;
}

export function NavLinkText({ children, active, style }: NavLinkTextProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-normal)",
        fontWeight: 400,
        color: active ? "var(--color-teal-cyan)" : "var(--color-black)",
        textDecoration: active ? "underline" : "none",
        cursor: "pointer",
        transition: "color 0.2s",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

const Typography = { Heading, Text, NavLinkText };
export default Typography;