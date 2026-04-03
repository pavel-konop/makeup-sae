"use client";

import Link from "next/link";
import { useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const SERVICE_KEYS = ["weddings", "parties", "photoshoots", "prom", "everyday"] as const;

const SERVICE_ICONS = {
  weddings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  parties: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  photoshoots: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  ),
  prom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  everyday: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
};

export default function ServicesPage() {
  const { t } = useTranslation();

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
  }, []);

  return (
    <>
      <section className="px-6 pt-16 pb-10 max-w-6xl mx-auto">
        <p
          className="text-xs font-medium tracking-[0.2em] uppercase mb-4 fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#c2185b" }}
        >
          {t.services.eyebrow}
        </p>
        <h1
          className="text-5xl md:text-6xl text-[#111111] mb-4 fade-in"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          {t.services.title}
        </h1>
        <div
          className="mb-6 fade-in"
          style={{ width: 32, height: 2, backgroundColor: "#c2185b" }}
        />
        <p
          className="text-[#888888] text-sm max-w-md fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.services.subtitle}
        </p>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_KEYS.map((key, i) => (
            <div key={key} className="fade-in" style={{ transitionDelay: `${i * 80}ms` }}>
              <ServiceCard
                icon={SERVICE_ICONS[key]}
                title={t.services.cards[key].title}
                description={t.services.cards[key].desc}
                quoteCta={t.services.getQuote}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-16 px-6 fade-in">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-3xl text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              {t.services.notSureTitle}
            </h2>
            <p
              className="text-[#888888] text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.services.notSureBody}
            </p>
          </div>
          <Link
            href="https://wa.link/1583yh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.services.ctaWhatsapp}
          </Link>
        </div>
      </section>
    </>
  );
}
