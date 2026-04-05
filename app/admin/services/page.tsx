"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart, Sparkles, Camera, GraduationCap, Sun, Flower2,
} from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import type { ServiceContent } from "@/lib/content/services";

const ICONS = [
  { name: "Heart", Component: Heart },
  { name: "Sparkles", Component: Sparkles },
  { name: "Camera", Component: Camera },
  { name: "GraduationCap", Component: GraduationCap },
  { name: "Sun", Component: Sun },
  { name: "Flower2", Component: Flower2 },
] as const;

const LANGS = [
  { key: "id", label: "Indonesian" },
  { key: "en", label: "English" },
  { key: "zh", label: "中文" },
] as const;
type Lang = "id" | "en" | "zh";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => { if (r.status === 401) router.replace("/admin"); return r.json(); })
      .then((data: ServiceContent[]) => setServices(data))
      .catch(() => {});
  }, [router]);

  function updateService(index: number, patch: Partial<ServiceContent>) {
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function updateLocalised(index: number, field: "title" | "desc", lang: Lang, value: string) {
    setServices((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, [field]: { ...s[field], [lang]: value } } : s
      )
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(services),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError((await res.json()).error ?? "Save failed");
    }
  }

  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col">
        <AdminHeader />
        <div className="flex-1 flex items-center justify-center text-[#888888] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <AdminHeader />

      <div className="max-w-4xl mx-auto px-6 py-10 w-full">
        <h1 className="text-2xl text-[#111111] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          Services
        </h1>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Language tab */}
          <div className="flex gap-1 border-b border-[#f0f0f0]">
            {LANGS.map(({ key, label }) => (
              <button key={key} type="button" onClick={() => setActiveLang(key as Lang)}
                className="px-4 py-2 text-xs font-medium border-b-2 transition-colors -mb-px"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: activeLang === key ? "#c2185b" : "transparent",
                  color: activeLang === key ? "#c2185b" : "#888888",
                }}>
                {label}
              </button>
            ))}
          </div>

          {/* Service cards */}
          {services.map((service, idx) => (
            <div key={service.key} className="bg-white border border-[#eeeeee] p-6 rounded-sm flex flex-col gap-5">
              <h2 className="text-lg text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                {service.title.en}
              </h2>

              {/* Icon picker */}
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-2 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map(({ name, Component }) => {
                    const selected = service.icon === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => updateService(idx, { icon: name })}
                        className="w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all"
                        style={{
                          borderColor: selected ? "#c2185b" : "#e0e0e0",
                          color: selected ? "#c2185b" : "#888888",
                          backgroundColor: selected ? "#fff0f5" : "transparent",
                          boxShadow: selected ? "0 0 0 2px #c2185b22" : "none",
                        }}
                        title={name}
                      >
                        <Component size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Service name ({LANGS.find(l => l.key === activeLang)?.label})
                </label>
                <input
                  type="text"
                  value={service.title[activeLang]}
                  onChange={(e) => updateLocalised(idx, "title", activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-sm outline-none focus:border-[#c2185b] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Description ({LANGS.find(l => l.key === activeLang)?.label})
                </label>
                <textarea
                  rows={3}
                  value={service.desc[activeLang]}
                  onChange={(e) => updateLocalised(idx, "desc", activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-sm outline-none focus:border-[#c2185b] transition-colors resize-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              {/* WhatsApp pre-text */}
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  WhatsApp pre-filled message
                </label>
                <input
                  type="text"
                  value={service.waText}
                  onChange={(e) => updateService(idx, { waText: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-sm outline-none focus:border-[#c2185b] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="Hi Mitaa! I'm interested in…"
                />
                {service.waText && (
                  <a
                    href={`https://wa.link/1583yh?text=${encodeURIComponent(service.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#c2185b] hover:underline mt-1 inline-block"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Preview link →
                  </a>
                )}
              </div>
            </div>
          ))}

          {error && <p className="text-xs text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}>
              {saving ? "Saving…" : "Save all services"}
            </button>
            {saved && (
              <span className="text-xs text-green-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                ✓ Saved successfully
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
