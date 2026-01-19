"use client";

import { useEffect, useState, useRef } from "react";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatItem({ value, suffix = "", label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center animate-scale-in">
      <div className="text-5xl font-bold text-[#491108] mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[#564838] font-semibold">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#E7E5DB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={6} label="Premium Courts" />
          <StatItem value={500} suffix="+" label="Active Members" />
          <StatItem value={24} suffix="/7" label="Available Booking" />
          <StatItem value={15} suffix="+" label="Pro Coaches" />
        </div>
      </div>
    </section>
  );
}