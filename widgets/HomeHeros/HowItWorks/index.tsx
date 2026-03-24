import React from "react";
import { UserPlus, Activity, Heart } from "lucide-react";
import styles from "./style.module.css";

const steps = [
  {
    icon: UserPlus,
    iconBg: "iconBg_teal",
    iconColor: "iconColor_teal",
    step: "1. Hospital Onboarding",
    description:
      "Hospital admins set up the system, admit patients, assign care teams, and invite family members with secure access codes.",
    tags: ["Secure hospital setup", "Role-based access"],
    tagColor: "tag_teal",
  },
  {
    icon: Activity,
    iconBg: "iconBg_blue",
    iconColor: "iconColor_blue",
    step: "2. Care Team Updates",
    description:
      "Doctors and nurses update patient status in under a minute using standardized indicators and quick vital sign entry forms.",
    tags: ["Fast updates", "Time-stamped changes"],
    tagColor: "tag_blue",
  },
  {
    icon: Heart,
    iconBg: "iconBg_green",
    iconColor: "iconColor_green",
    step: "3. Family Peace of Mind",
    description:
      "Family members receive real-time updates in clear, reassuring language, staying informed without burdening medical staff.",
    tags: ["Read-only access", "Always up to date"],
    tagColor: "tag_green",
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>How Pat-Stat Works</h2>
          <p className={styles.subtitle}>
            Simple, secure, and designed for busy healthcare environments
          </p>
        </div>

        {/* ── Cards ── */}
        <div className={styles.grid}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className={styles.card}>
                <div className={`${styles.iconWrap} ${styles[step.iconBg]}`}>
                  <Icon
                    size={22}
                    strokeWidth={2.2}
                    className={`${styles.icon} ${styles[step.iconColor]}`}
                  />
                </div>

                <h3 className={styles.stepTitle}>{step.step}</h3>
                <p className={styles.stepDesc}>{step.description}</p>

                <div className={styles.tagRow}>
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${styles[step.tagColor]}`}
                    >
                      · {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;