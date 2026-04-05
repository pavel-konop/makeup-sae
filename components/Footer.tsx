"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#111111] text-white py-10 sm:py-12 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
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

          {/* Links — stacked on mobile, row on sm+ */}
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link
              href="https://instagram.com/make.up_sae"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-white transition-colors text-sm flex items-center min-h-[44px] sm:min-h-0"
            >
              {t.footer.instagramHandle}
            </Link>
            <Link
              href="https://wa.link/1583yh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-white transition-colors text-sm flex items-center min-h-[44px] sm:min-h-0"
            >
              {t.footer.whatsapp}
            </Link>
            <span className="text-[#888888] text-sm flex items-center">{t.footer.serviceArea}</span>
          </div>
        </div>

        <div
          className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#222222] flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs text-[#555555]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
          <span className="text-[#444444]">{t.footer.bookingNote}</span>
        </div>
      </div>
    </footer>
  );
}
