"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n";

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useTranslation();

  const links = [
    { href: "/gallery", label: t.nav.gallery },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "2px solid #c2185b" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#111111] font-medium tracking-widest uppercase text-sm flex-shrink-0"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          make.up_sae
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: pathname === href ? "#c2185b" : "#111111",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: lang switcher + book */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className="px-2 py-1 text-xs font-medium rounded transition-colors"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: lang === opt.value ? "#c2185b" : "#888888",
                  fontWeight: lang === opt.value ? 500 : 400,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Link
            href="/book"
            className="px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.nav.book}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px bg-[#111111] transition-transform duration-200"
            style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }}
          />
          <span
            className="block w-5 h-px bg-[#111111] transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-[#111111] transition-transform duration-200"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-[#f0f0f0]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: pathname === href ? "#c2185b" : "#111111",
              }}
            >
              {label}
            </Link>
          ))}

          {/* Language switcher mobile */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#f0f0f0]">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className="px-2.5 py-1 text-xs font-medium rounded border transition-colors"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: lang === opt.value ? "#ffffff" : "#888888",
                  backgroundColor: lang === opt.value ? "#c2185b" : "transparent",
                  borderColor: lang === opt.value ? "#c2185b" : "#e0e0e0",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="mt-1 w-fit px-5 py-2 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.nav.book}
          </Link>
        </div>
      )}
    </nav>
  );
}
