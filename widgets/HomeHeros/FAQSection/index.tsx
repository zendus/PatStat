"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import styles from "./style.module.css";

const faqs = [
  {
    question: "What is Pat-Stat?",
    answer:
      "Pat-Stat is a secure communication platform that helps hospitals share clear, real-time patient status updates with authorized family members. It allows care teams to update patient conditions quickly while keeping families informed without constant phone calls or confusion.",
  },
  {
    question: "Who can use Pat-Stat?",
    answer:
      "Pat-Stat is designed for hospitals, care teams, and authorized family members. Hospital admins manage access, nurses and doctors update patient status, and family members view updates securely from any device.",
  },
  {
    question: "How can hospitals start using Pat-Stat?",
    answer:
      "Hospitals can get started by requesting a demo through our website. Our onboarding team will guide you through setup, staff training, and integration with your existing workflows — typically within a few days.",
  },
  {
    question: "How do families access patient updates?",
    answer:
      "Family members receive a secure access code from the hospital. They use this code to log in from any device — phone, tablet, or computer — and view their loved one's current status in plain, reassuring language.",
  },
  {
    question: "Can families send messages to care staff via Pat-Stat?",
    answer:
      "No. Pat-Stat is a read-only platform for family members to protect clinical workflows. Families can view updates but cannot send messages directly to care staff through the platform.",
  },
  {
    question: "What kind of patient updates can families see?",
    answer:
      "Families can see standardized status indicators such as patient condition, care stage, and any important notes left by the care team — all presented in clear, non-clinical language.",
  },
  {
    question: "Is patient information secure?",
    answer:
      "Yes. Pat-Stat uses end-to-end encryption, role-based access control, and complies with international healthcare data protection standards to ensure all patient information remains private and secure.",
  },
  {
    question: "How often are patient updates made?",
    answer:
      "Care teams can update patient status at any time. Updates typically happen during shift changes, after assessments, or whenever there is a meaningful change in a patient's condition — often multiple times per day.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find quick answers to common questions about security, access, and care team updates.
          </p>
        </div>

        {/* ── Accordion ── */}
        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  className={styles.trigger}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span className={styles.question}>{faq.question}</span>
                  <span className={styles.iconWrap}>
                    {isOpen
                      ? <Minus size={20} strokeWidth={2} />
                      : <Plus size={20} strokeWidth={2} />
                    }
                  </span>
                </button>

                <div
                  className={styles.answerWrap}
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                  aria-hidden={!isOpen}
                >
                  <p className={styles.answer}>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQSection;