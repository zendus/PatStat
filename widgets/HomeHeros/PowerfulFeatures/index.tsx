"use client";

import React, { useState, useRef, useEffect } from "react";
import { Clock, Zap, ShieldCheck, Bell, Smartphone, Globe } from "lucide-react";
import styles from "./style.module.css";

const features = [
  {
    icon: Clock,
    iconBg: "iconBg_blue",
    iconColor: "iconColor_blue",
    title: "Real-Time Updates",
    description: "Instant synchronization across all authorized users with automatic notifications",
  },
  {
    icon: Zap,
    iconBg: "iconBg_yellow",
    iconColor: "iconColor_yellow",
    title: "Quick Entry (<1 min)",
    description: "Streamlined forms optimized for busy healthcare professionals",
  },
  {
    icon: ShieldCheck,
    iconBg: "iconBg_green",
    iconColor: "iconColor_green",
    title: "Role-Based Access",
    description: "Secure permissions ensure each user sees only what they should",
  },
  {
    icon: Bell,
    iconBg: "iconBg_red",
    iconColor: "iconColor_red",
    title: "Smart Notifications",
    description: "Configurable alerts for emergencies and important status changes",
  },
  {
    icon: Smartphone,
    iconBg: "iconBg_teal",
    iconColor: "iconColor_teal",
    title: "Mobile Optimized",
    description: "Works seamlessly on any device, even with low bandwidth",
  },
  {
    icon: Globe,
    iconBg: "iconBg_gray",
    iconColor: "iconColor_gray",
    title: "African Context",
    description: "Built for African healthcare systems with local infrastructure in mind",
  },
];

export function PowerfulFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cardWidth = track.scrollWidth / features.length;
      const index = Math.round(track.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, features.length - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / features.length;
    track.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const onMouseUp = () => { isDragging.current = false; };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h2 className={styles.title}>Powerful Features</h2>
          <p className={styles.subtitle}>
            Everything you need for seamless healthcare communication
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={styles.card}>
                <div className={`${styles.iconWrap} ${styles[feature.iconBg]}`}>
                  <Icon
                    size={24}
                    strokeWidth={1.8}
                    className={`${styles.icon} ${styles[feature.iconColor]}`}
                  />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.carouselWrap}>
          <div
            ref={trackRef}
            className={styles.carouselTrack}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={styles.carouselCard}>
                  <div className={`${styles.iconWrap} ${styles[feature.iconBg]}`}>
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className={`${styles.icon} ${styles[feature.iconColor]}`}
                    />
                  </div>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDesc}>{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.dots}>
            {features.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default PowerfulFeatures;