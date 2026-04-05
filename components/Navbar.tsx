"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/gallery", label: t.nav.gallery },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
  ];

  // Close on outside tap
  useEffect(() => {
    if (!menuOpen) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "2px solid #c2185b" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
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
              className="text-sm font-medium transition-colors py-1"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: pathname === href ? "#c2185b" : "#111111",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop right: IG + lang + book */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://instagram.com/make.up_sae"
            target="_blank"
            rel="noopener noreferrer"
            title="@make.up_sae"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ color: "#888888" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c2185b")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888888")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <div className="flex items-center gap-1">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className="px-2 py-1 text-xs font-medium rounded transition-colors min-h-[44px]"
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
            className="px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 min-h-[44px] flex items-center"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.nav.book}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-1 min-h-[44px] min-w-[44px] items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-0.5 bg-[#111111] origin-center transition-all duration-200"
            style={{ transform: menuOpen ? "rotate(45deg) translate(0, 7px)" : "none" }}
          />
          <span
            className="block w-5 h-0.5 bg-[#111111] transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-[#111111] origin-center transition-all duration-200"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(0, -7px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu — slide down */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200 ease-in-out"
        style={{ maxHeight: menuOpen ? "400px" : "0px", opacity: menuOpen ? 1 : 0 }}
      >
        <div className="bg-white border-t border-[#f0f0f0] px-5 pb-5 pt-2 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center text-sm font-medium min-h-[44px] px-1 border-b border-[#f7f7f7] last:border-0"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: pathname === href ? "#c2185b" : "#111111",
              }}
            >
              {label}
            </Link>
          ))}

          {/* Instagram */}
          <a
            href="https://instagram.com/make.up_sae"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm min-h-[44px] px-1 border-b border-[#f7f7f7]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#111111" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={18} height={18} style={{ color: "#c2185b", flexShrink: 0 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            Instagram · @make.up_sae
          </a>

          {/* Language switcher */}
          <div className="flex items-center gap-2 py-3 border-t border-[#f0f0f0] mt-1">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className="flex-1 py-2 text-xs font-medium rounded border transition-colors min-h-[44px]"
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
            className="flex items-center justify-center w-full py-3 rounded-full text-sm font-medium text-white min-h-[44px]"
            style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.nav.book}
          </Link>
        </div>
      </div>
    </nav>
  );
}
