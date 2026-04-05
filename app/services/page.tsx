"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart, Sparkles, Camera, GraduationCap, Sun, Flower2, LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { ServiceContent } from "@/lib/content/services";
import type { Lang } from "@/lib/i18n";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Sparkles,
  Camera,
  GraduationCap,
  Sun,
  Flower2,
};

// Fallback SVG icons for any unrecognised icon name
const FallbackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export default function ServicesPage() {
  const { t, lang } = useTranslation();
  const [services, setServices] = useState<ServiceContent[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: ServiceContent[]) => setServices(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [services]);

  const l = lang as Lang;

  return (
    <>
      <section className="px-6 pt-16 pb-10 max-w-6xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4 fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#c2185b" }}>
          {t.services.eyebrow}
        </p>
        <h1 className="text-5xl md:text-6xl text-[#111111] mb-4 fade-in"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          {t.services.title}
        </h1>
        <div className="mb-6 fade-in" style={{ width: 32, height: 2, backgroundColor: "#c2185b" }} />
        <p className="text-[#888888] text-sm max-w-md fade-in" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {t.services.subtitle}
        </p>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        {services.length === 0 ? (
          // Skeleton while loading
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border border-[#eeeeee] p-8 rounded-sm animate-pulse">
                <div className="w-10 h-10 bg-[#f5f0f2] rounded mb-4" />
                <div className="h-5 bg-[#f5f0f2] rounded mb-3 w-3/4" />
                <div className="h-3 bg-[#f5f0f2] rounded mb-2" />
                <div className="h-3 bg-[#f5f0f2] rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = ICON_MAP[service.icon];
              const title = service.title[l] || service.title.en;
              const desc = service.desc[l] || service.desc.en;
              const waUrl = service.waText
                ? `https://wa.link/1583yh?text=${encodeURIComponent(service.waText)}`
                : "https://wa.link/1583yh";

              return (
                <div key={service.key} className="service-card bg-white p-8 rounded-sm flex flex-col gap-4 fade-in"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 text-[#c2185b]">
                    {Icon ? <Icon size={40} strokeWidth={1.5} /> : <FallbackIcon />}
                  </div>
                  <h3 className="text-xl text-[#111111]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                    {title}
                  </h3>
                  <p className="text-[#888888] text-sm leading-relaxed flex-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {desc}
                  </p>
                  <Link href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium text-[#c2185b] hover:underline mt-auto"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {t.services.getQuote}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-[#111111] py-16 px-6 fade-in">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              {t.services.notSureTitle}
            </h2>
            <p className="text-[#888888] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {t.services.notSureBody}
            </p>
          </div>
          <Link href="https://wa.link/1583yh" target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}>
            {t.services.ctaWhatsapp}
          </Link>
        </div>
      </section>
    </>
  );
}
