import React from "react";
import Image from "next/image";
import styles from "./style.module.css";

const items = [
  {
    image: "/images/who_is_it_img1.webp",
    imageAlt: "Hospital staff at a dashboard workstation",
    title: "Better Outcomes for Hospitals",
    description:
      "Pat-Stat helps hospitals manage patient information through a single, secure dashboard built for real clinical workflows. From creating patient profiles to assigning care teams and managing access, everything is centralized to support faster updates, clearer oversight, and smoother day-to-day operations.",
    imageLeft: true,
  },
  {
    image: "/images/who_is_it_img2.webp",
    imageAlt: "Nurse reviewing patient status on a tablet",
    title: "Better Support for Care Teams",
    description:
      "Care teams can update patient status in real time using clear, predefined indicators designed to reduce ambiguity. Pat-Stat supports faster communication, minimizes unnecessary follow-ups, and helps medical staff stay aligned on patient needs throughout every stage of care.",
    imageLeft: false,
  },
  {
    image: "/images/who_is_it_img3.webp",
    imageAlt: "Family members checking patient updates on a phone",
    title: "Better Communication for Families",
    description:
      "Authorized family members can view accurate, read-only patient updates at any time from their mobile devices. Pat-Stat reduces uncertainty, limits the need for repeated calls, and helps families stay informed and reassured throughout their loved one's care journey.",
    imageLeft: true,
  },
];

export function WhoItsFor() {
  return (
    <section id="who-its-for" className={styles.section}>
      <div className={styles.inner}>
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`${styles.row} ${!item.imageLeft ? styles.rowReverse : ""}`}
          >
            <div className={styles.imageWrap}>
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className={styles.textBlock}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhoItsFor;