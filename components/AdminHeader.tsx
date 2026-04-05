"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/services", label: "Services" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div
      className="bg-white border-b-2 px-6 h-14 flex items-center justify-between flex-shrink-0"
      style={{ borderColor: "#c2185b" }}
    >
      <div className="flex items-center gap-6">
        <p
          className="text-[#111111] font-medium tracking-widest uppercase text-xs"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          make.up_sae
        </p>
        <span className="text-[#e0e0e0] text-xs hidden sm:block">›</span>
        <nav className="hidden sm:flex items-center gap-1">
          {NAV.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
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
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          className="text-xs text-[#888888] hover:text-[#111111] transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          View site →
        </a>
        <button
          onClick={handleLogout}
          className="text-xs text-[#888888] hover:text-red-600 transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
