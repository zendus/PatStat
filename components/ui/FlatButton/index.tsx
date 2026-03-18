"use client";

import React from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    background: var(--color-deep-teal);
    color: var(--color-white);
    border: 2px solid var(--color-deep-teal);
  `,
  secondary: `
    background: var(--color-teal-cyan);
    color: var(--color-white);
    border: 2px solid var(--color-teal-cyan);
  `,
  outline: `
    background: transparent;
    color: var(--color-deep-teal);
    border: 2px solid var(--color-deep-teal);
  `,
  ghost: `
    background: transparent;
    color: var(--color-teal-cyan);
    border: 2px solid transparent;
  `,
  danger: `
    background: var(--color-red);
    color: var(--color-white);
    border: 2px solid var(--color-red);
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "padding: 8px 16px; font-size: var(--text-small);",
  md: "padding: 12px 24px; font-size: var(--text-normal);",
  lg: "padding: 14px 32px; font-size: var(--text-large);",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  loading = false,
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    borderRadius: "var(--radius-full)",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
    textDecoration: "none",
    outline: "none",
    ...style,
  };

  const inlineStyles = `
    ${variantStyles[variant]}
    ${sizeStyles[size]}
  `;

  // Parse inline styles into object
  const parsedVariantStyles = inlineStyles
    .split(";")
    .filter(Boolean)
    .reduce((acc: React.CSSProperties, rule) => {
      const [prop, val] = rule.split(":").map((s) => s.trim());
      if (!prop || !val) return acc;
      const camelProp = prop.replace(/-([a-z])/g, (_, l) =>
        l.toUpperCase()
      ) as keyof React.CSSProperties;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc as any)[camelProp] = val;
      return acc;
    }, {});

  const finalStyle = { ...baseStyle, ...parsedVariantStyles };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02, opacity: 0.92 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      style={finalStyle}
      disabled={disabled || loading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? (
        <span
          style={{
            width: 16,
            height: 16,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "spin 0.7s linear infinite",
          }}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </motion.button>
  );
}

export default Button;