import React from "react";
import { Lock, ShieldCheck, Users, CircleCheck } from "lucide-react";
import styles from "./style.module.css";

const pillars = [
  {
    icon: ShieldCheck,
    title: "End-to-End Encryption",
    description:
      "All patient data encrypted in transit and at rest using industry-standard protocols",
  },
  {
    icon: Users,
    title: "Granular Access Control",
    description:
      "Role-based permissions with detailed audit logs of every access and action",
  },
  {
    icon: CircleCheck,
    title: "Compliance Ready",
    description:
      "Built to meet international healthcare data protection standards",
  },
];

export function SecuritySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <div className={styles.lockWrap}>
            <Lock size={32} strokeWidth={2} className={styles.lockIcon} />
          </div>
          <h2 className={styles.title}>Trust, Privacy &amp; Security</h2>
          <p className={styles.subtitle}>
            Healthcare-grade security protecting patient data at every step
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className={styles.pillarCol}>
                <Icon size={40} strokeWidth={1.6} className={styles.pillarIcon} />
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.list}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className={styles.listItem}>
                <div className={styles.listIconWrap}>
                  <Icon size={22} strokeWidth={1.8} className={styles.pillarIcon} />
                </div>
                <div className={styles.listText}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default SecuritySection;