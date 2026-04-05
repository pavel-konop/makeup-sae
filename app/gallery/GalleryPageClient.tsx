"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function GalleryPageClient() {
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
      {/* Page header */}
      <section className="px-5 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10 max-w-6xl mx-auto">
        <p
          className="text-xs font-medium tracking-[0.2em] uppercase mb-4 fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#c2185b" }}
        >
          {t.gallery.eyebrow}
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-[#111111] mb-4 fade-in"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          {t.gallery.title}
        </h1>
        <div
          className="mb-6 fade-in"
          style={{ width: 32, height: 2, backgroundColor: "#c2185b" }}
        />
        <p
          className="text-[#888888] text-sm max-w-md fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.gallery.subtitle}
        </p>
      </section>

      {/* Instagram CTA */}
      <section className="border-t border-[#f0f0f0] py-12 sm:py-16 px-5 sm:px-6 fade-in">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          <div>
            <h2
              className="text-2xl text-[#111111] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              {t.gallery.instagramText}
            </h2>
            <p
              className="text-[#888888] text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.gallery.instagramSub}
            </p>
          </div>
          <Link
            href="https://instagram.com/make.up_sae"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.gallery.instagramCta}
          </Link>
        </div>
      </section>
    </>
  );
}
