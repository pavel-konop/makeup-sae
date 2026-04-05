"use client";

import Link from "next/link";
import { useEffect } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const SERVICE_KEYS = ["weddings", "parties", "photoshoots", "prom", "everyday"] as const;

export default function Home() {
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
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-64px)] flex items-center px-5 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-2xl">
            <p
              className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase mb-5 sm:mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#c2185b" }}
            >
              {t.hero.eyebrow}
            </p>

            <h1
              className="text-[2.25rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              {t.hero.title1}
              <br />
              <em>{t.hero.title2}</em>
            </h1>

            <div style={{ width: 32, height: 2, backgroundColor: "#c2185b", marginBottom: 20 }} />

            <p
              className="text-[#888888] text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.hero.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/gallery"
                className="flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full text-sm font-medium border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.hero.ctaGallery}
              </Link>
              <Link
                href="https://wa.link/1583yh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.hero.ctaWhatsapp}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery preview ───────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-12 sm:py-16 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8 fade-in">
          <h2
            className="text-2xl sm:text-3xl text-[#111111]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            {t.home.recentWork}
          </h2>
          <Link
            href="/gallery"
            className="text-sm font-medium text-[#888888] hover:text-[#c2185b] transition-colors min-h-[44px] flex items-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.home.viewAll}
          </Link>
        </div>
        <GalleryGrid limit={6} />
      </section>

      {/* ── Services strip ────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-10 sm:py-12 border-t border-[#f0f0f0] fade-in">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#888888] mb-5 sm:mb-6 text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.home.servicesLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {SERVICE_KEYS.map((key) => (
              <span
                key={key}
                className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm text-[#111111] border border-[#e0e0e0]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.services.cards[key].title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA banner ───────────────────────────────── */}
      <section className="bg-[#111111] py-12 sm:py-16 px-5 sm:px-6 fade-in">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          <div>
            <h2
              className="text-2xl sm:text-3xl text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              {t.home.readyToBook}
            </h2>
            <p
              className="text-[#888888] text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.home.bookingNote}
            </p>
          </div>
          <Link
            href="https://wa.link/1583yh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.home.ctaWhatsapp}
          </Link>
        </div>
      </section>
    </>
  );
}
