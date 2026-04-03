"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#111111] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div>
            <p
              className="text-white font-medium tracking-widest uppercase text-sm mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              make.up_sae
            </p>
            <p className="text-[#888888] text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {t.footer.certifiedMua}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link
              href="https://instagram.com/make.up_sae"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-white transition-colors"
            >
              {t.footer.instagramHandle}
            </Link>
            <Link
              href="https://wa.link/1583yh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-white transition-colors"
            >
              {t.footer.whatsapp}
            </Link>
            <span className="text-[#888888]">{t.footer.serviceArea}</span>
          </div>
        </div>

        <div
          className="mt-8 pt-6 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#555555]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
          <span>{t.footer.bookingNote}</span>
        </div>
      </div>
    </footer>
  );
}
