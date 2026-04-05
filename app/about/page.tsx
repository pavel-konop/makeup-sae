"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { AboutContent } from "@/lib/content/about";
import type { Lang } from "@/lib/i18n";

export default function AboutPage() {
  const { t, lang } = useTranslation();
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data: AboutContent) => setContent(data))
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
  }, [content]);

  const l = lang as Lang;
  const bio = content?.bio[l] || content?.bio.en || "";
  const philosophy = content?.philosophy[l] || content?.philosophy.en || t.about.philosophy;
  const portraitSrc = content?.portraitUrl || "/gallery/img1.jpg";

  return (
    <>
      <section className="px-6 pt-16 pb-20 max-w-6xl mx-auto">
        <p
          className="text-xs font-medium tracking-[0.2em] uppercase mb-12 fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#c2185b" }}
        >
          {t.about.eyebrow}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Portrait */}
          <div className="fade-in">
            <div className="relative w-full aspect-[3/4] bg-[#f5f0f2] overflow-hidden">
              <Image
                src={portraitSrc}
                alt="Mitaa Makeup — portrait"
                fill
                className="object-cover"
                unoptimized={portraitSrc.startsWith("https://res.cloudinary.com")}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-6 pt-2 fade-in" style={{ transitionDelay: "120ms" }}>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-white rounded-full"
                style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.about.certifiedBadge}
              </span>
              <span
                className="px-4 py-1.5 text-xs font-medium text-[#111111] border border-[#e0e0e0] rounded-full"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.about.serviceArea}
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl text-[#111111] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              {t.about.title}
            </h1>

            <div style={{ width: 32, height: 2, backgroundColor: "#c2185b" }} />

            {bio ? (
              <p className="text-[#888888] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {bio}
              </p>
            ) : (
              <p className="text-[#cccccc] text-sm leading-relaxed italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t.about.bioPlaceholder}
              </p>
            )}

            {philosophy && (
              <blockquote className="border-l-2 pl-5 mt-2" style={{ borderColor: "#c2185b" }}>
                <p
                  className="text-xl text-[#111111] leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic" }}
                >
                  &ldquo;{philosophy}&rdquo;
                </p>
              </blockquote>
            )}

            <div className="flex flex-col gap-2 pt-4 border-t border-[#f0f0f0]">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#888888] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t.about.findMe}
              </p>
              <div className="flex gap-4">
                <Link href="https://instagram.com/make.up_sae" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#111111] hover:text-[#c2185b] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  @make.up_sae
                </Link>
                <span className="text-[#e0e0e0]">|</span>
                <Link href="https://wa.link/1583yh" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#111111] hover:text-[#c2185b] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  WhatsApp
                </Link>
              </div>
            </div>

            <Link href="https://wa.link/1583yh" target="_blank" rel="noopener noreferrer"
              className="mt-2 w-fit px-6 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}>
              {t.about.bookCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
