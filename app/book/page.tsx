"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function BookPage() {
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
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 sm:px-6 py-16 sm:py-20">
      <div className="w-full max-w-lg text-center">
        <p
          className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase mb-5 sm:mb-6 fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#c2185b" }}
        >
          {t.book.eyebrow}
        </p>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-[#111111] mb-4 fade-in"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          {t.book.title}
        </h1>

        <div
          className="mx-auto mb-5 sm:mb-6 fade-in"
          style={{ width: 32, height: 2, backgroundColor: "#c2185b" }}
        />

        <p
          className="text-[#888888] text-sm mb-8 sm:mb-10 fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.book.serviceArea}&nbsp;
          <span className="text-[#111111] font-medium">{t.book.serviceAreaValue}</span>
        </p>

        {/* WhatsApp button — full width on mobile */}
        <div className="fade-in mb-4 sm:mb-6">
          <Link
            href="https://wa.link/1583yh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full sm:w-auto sm:inline-flex min-h-[52px] px-8 py-3 rounded-full text-base font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20" className="flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.book.ctaWhatsapp}
          </Link>
        </div>

        {/* No DM note */}
        <div className="fade-in mb-8 sm:mb-10 px-4">
          <div
            className="flex items-start sm:items-center gap-2 px-4 py-3 rounded-xl border border-[#f0f0f0] text-sm text-[#888888] text-left"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="18" height="18" className="flex-shrink-0 mt-0.5 sm:mt-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span>{t.book.noDm}</span>
          </div>
        </div>

        <div className="border-t border-[#f0f0f0] pt-7 sm:pt-8 fade-in">
          <p
            className="text-xs font-medium tracking-[0.15em] uppercase text-[#888888] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.book.followWork}
          </p>
          <Link
            href="https://instagram.com/make.up_sae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] text-sm text-[#111111] hover:text-[#c2185b] transition-colors font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.book.instagramCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
