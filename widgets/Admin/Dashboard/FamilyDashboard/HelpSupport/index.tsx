"use client";

import React from "react";
import styles from "./style.module.css";

interface SupportItem {
  title: string;
  description: string;
  action: string;
  variant: "blue" | "green" | "teal" | "orange";
}

const supportItems: SupportItem[] = [
  {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about accessing patient information and understanding update",
    action: "View FAQs",
    variant: "blue",
  },
  {
    title: "Contact Hospital",
    description:
      "Reach out to hospital staff for urgent matters or questions about care",
    action: "Contact Us",
    variant: "green",
  },
  {
    title: "Privacy & Security",
    description:
      "Learn about how we protect patient information and your access",
    action: "Learn More",
    variant: "teal",
  },
  {
    title: "Request Access",
    description:
      "Need access to another patient? Submit a request through hospital administration",
    action: "Request Access",
    variant: "orange",
  },
];

/** Icons */
const Icon = ({ variant }: { variant: SupportItem["variant"] }) => {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (variant) {
    case "blue":
      return (
        <svg {...common} stroke="#015DDD">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 9a3 3 0 016 0c0 2-3 2-3 4" />
          <line x1="12" y1="17" x2="12" y2="17" />
        </svg>
      );
    case "green":
      return (
        <svg {...common} stroke="#0CA54D">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.08 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.89.32 1.76.6 2.6a2 2 0 01-.45 2L8 9a16 16 0 007 7l.68-.68a2 2 0 012-.45c.84.28 1.71.48 2.6.6A2 2 0 0122 16.92z" />
        </svg>
      );
    case "teal":
      return (
        <svg {...common} stroke="#40A6AD">
          <path d="M12 2l8 4v6c0 5-3.8 9.4-8 10-4.2-.6-8-5-8-10V6l8-4z" />
        </svg>
      );
    case "orange":
      return (
        <svg {...common} 
        stroke="#E88E00"
        >
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
        </svg>
      );
  }
};

const HelpSupport: React.FC = () => {
  return (
    <div className={styles.helpWrapper}>
      <h1 className={styles.contentTitle}>Help & Support</h1>
      <p className={styles.contentSubtitle}>
        Get assistance and resources
      </p>

      <div className={styles.helpGrid}>
        {supportItems.map((item, index) => (
          <article
            key={index}
            className={`${styles.helpCard} ${
              styles[`helpCard--${item.variant}`]
            }`}
          >
            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>
                <Icon variant={item.variant} />
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>
                {item.description}
              </p>
            </div>

            <button className={styles.cardButton}>
              {item.action}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export { HelpSupport };