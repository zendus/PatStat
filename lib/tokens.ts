// =========================================
// PAT-STAT DESIGN TOKENS
// =========================================

export const colors = {
  // Brand
  deepTeal: "#0E4655",
  tealCyan: "#1A949D",

  // Primary (DTB Scale)
  dtb1: "#0E4655",
  dtb2: "#366571",
  dtb3: "#86A2AA",
  dtb4: "#CFDADD",

  // Secondary (Teal Cyan Scale)
  tc1: "#1A949D",
  tc2: "#40A6AD",
  tc3: "#8CC9CE",
  tc4: "#D1EAEB",

  // Accents
  red: "#EE3D2B",
  green: "#2ECC71",
  orange: "#F39C12",
  blue: "#0688DC",

  // Neutrals
  black: "#05171C",
  grey1: "#555555",
  grey2: "#878383",
  grey3: "#AAAAAA",
  grey4: "#CCCCCC",
  white: "#F8FDFF",
  ash: "#414141",
} as const;

export const typography = {
  fonts: {
    heading: "'Manrope', sans-serif",
    body: "'Source Sans 3', sans-serif",
  },
  sizes: {
    // Headings (Manrope)
    h1: "50px",
    h2: "30px",
    h3: "24px",
    // Body (Source Sans 3)
    large: "24px",
    medium: "18px",
    normal: "16px",
    small: "14px",
    xsmall: "12px",
  },
  weights: {
    regular: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const spacing = {
  gutter: "20px",
  maxWidth: "1440px",
  columns: 12,
} as const;

export const radius = {
  sm: "6px",
  md: "12px",
  lg: "24px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 3px rgba(14, 70, 85, 0.08)",
  md: "0 4px 12px rgba(14, 70, 85, 0.12)",
  lg: "0 8px 24px rgba(14, 70, 85, 0.16)",
} as const;

export type ColorKey = keyof typeof colors;
export type FontSize = keyof typeof typography.sizes;