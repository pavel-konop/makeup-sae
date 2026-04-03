"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If already logged in, redirect to gallery
  useEffect(() => {
    fetch("/api/admin/images")
      .then((r) => {
        if (r.ok) router.replace("/admin/gallery");
      })
      .catch(() => {});
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/gallery");
    } else {
      setError("Wrong password. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <p
          className="text-center text-[#111111] font-medium tracking-widest uppercase text-sm mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          make.up_sae
        </p>

        <div className="bg-white border border-[#eeeeee] p-8 rounded-sm">
          <h1
            className="text-2xl text-[#111111] mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Admin access
          </h1>
          <p
            className="text-[#888888] text-xs mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Gallery management for Mitaa Makeup
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 text-sm border border-[#e0e0e0] rounded-sm outline-none focus:border-[#c2185b] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                required
                autoFocus
              />
            </div>

            {error && (
              <p
                className="text-xs text-red-600"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
