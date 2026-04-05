"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/services", label: "Services" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  const activeLabel = NAV.find((n) => pathname.startsWith(n.href))?.label ?? "Admin";

  return (
    <div
      ref={menuRef}
      className="bg-white border-b-2 flex-shrink-0 relative z-40"
      style={{ borderColor: "#c2185b" }}
    >
      <div className="px-5 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <p
            className="text-[#111111] font-medium tracking-widest uppercase text-xs flex-shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            make.up_sae
          </p>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1 rounded text-xs font-medium transition-colors min-h-[36px] flex items-center"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: active ? "#c2185b" : "#888888",
                    backgroundColor: active ? "#fff0f5" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile: show active section */}
          <span className="sm:hidden text-xs text-[#888888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            › {activeLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop extras */}
          <a
            href="/"
            target="_blank"
            className="hidden sm:block text-xs text-[#888888] hover:text-[#111111] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View site →
          </a>
          <button
            onClick={handleLogout}
            className="hidden sm:block text-xs text-[#888888] hover:text-red-600 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Log out
          </button>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle admin menu"
          >
            <span className="block w-4 h-0.5 bg-[#888888]" />
            <span className="block w-4 h-0.5 bg-[#888888]" />
            <span className="block w-4 h-0.5 bg-[#888888]" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="sm:hidden overflow-hidden transition-all duration-200 ease-in-out"
        style={{ maxHeight: menuOpen ? "300px" : "0px" }}
      >
        <div className="border-t border-[#f0f0f0] bg-white px-5 py-2 flex flex-col">
          {NAV.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center min-h-[44px] text-sm font-medium border-b border-[#f7f7f7] last:border-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: active ? "#c2185b" : "#111111",
                }}
              >
                {label}
              </Link>
            );
          })}
          <a
            href="/"
            target="_blank"
            className="flex items-center min-h-[44px] text-sm text-[#888888]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View site →
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center min-h-[44px] text-sm text-left text-red-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
