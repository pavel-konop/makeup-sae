"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import type { AboutContent } from "@/lib/content/about";

const LANGS = [
  { key: "id", label: "Indonesian" },
  { key: "en", label: "English" },
  { key: "zh", label: "中文" },
] as const;
type Lang = "id" | "en" | "zh";

const EMPTY: AboutContent = {
  portraitUrl: "",
  portraitPublicId: "",
  bio: { id: "", en: "", zh: "" },
  philosophy: { id: "", en: "", zh: "" },
};

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent>(EMPTY);
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => { if (r.status === 401) router.replace("/admin"); return r.json(); })
      .then((data: AboutContent) => setContent(data))
      .catch(() => {});
  }, [router]);

  function onPortraitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPortraitFile(file);
    setPortraitPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const formData = new FormData();
    if (portraitFile) formData.append("portrait", portraitFile);
    formData.append("portraitPublicId", content.portraitPublicId);
    formData.append("portraitUrl", content.portraitUrl);
    formData.append("bio_id", content.bio.id);
    formData.append("bio_en", content.bio.en);
    formData.append("bio_zh", content.bio.zh);
    formData.append("philosophy_id", content.philosophy.id);
    formData.append("philosophy_en", content.philosophy.en);
    formData.append("philosophy_zh", content.philosophy.zh);
    const res = await fetch("/api/admin/about", { method: "POST", body: formData });
    setSaving(false);
    if (res.ok) {
      const { content: updated } = await res.json();
      setContent(updated);
      setPortraitFile(null);
      setPortraitPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError((await res.json()).error ?? "Save failed");
    }
  }

  const portraitSrc = portraitPreview || content.portraitUrl || null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col pb-24 sm:pb-0">
      <AdminHeader />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-8 sm:py-10 w-full">
        <h1 className="text-2xl text-[#111111] mb-6 sm:mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          About Page
        </h1>

        <form onSubmit={handleSave} className="flex flex-col gap-6 sm:gap-8">
          {/* Portrait upload */}
          <div className="bg-white border border-[#eeeeee] p-5 sm:p-6 rounded-sm">
            <h2 className="text-base font-medium text-[#111111] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Portrait photo
            </h2>
            {/* Stack on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div
                className="w-full sm:w-32 h-44 sm:h-40 bg-[#f5f0f2] rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center cursor-pointer border border-dashed border-[#ddd] hover:border-[#c2185b] transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {portraitSrc
                  ? <Image src={portraitSrc} alt="Portrait" width={256} height={176} className="w-full h-full object-cover" unoptimized={!!portraitPreview} />
                  : <span className="text-[#ccc] text-3xl">+</span>}
              </div>
              <div className="flex flex-col gap-2 w-full sm:pt-1">
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onPortraitChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto text-sm px-4 min-h-[44px] border border-[#e0e0e0] rounded-sm text-[#111111] hover:border-[#c2185b] transition-colors text-left sm:text-center"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {portraitFile ? portraitFile.name : "Choose photo…"}
                </button>
                <p className="text-xs text-[#888888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  JPEG, PNG or WebP. Replaces the current portrait.
                </p>
              </div>
            </div>
          </div>

          {/* Language tabs */}
          <div className="flex border-b border-[#f0f0f0]">
            {LANGS.map(({ key, label }) => (
              <button key={key} type="button" onClick={() => setActiveLang(key as Lang)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px min-h-[44px]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: activeLang === key ? "#c2185b" : "transparent",
                  color: activeLang === key ? "#c2185b" : "#888888",
                }}>
                {label}
              </button>
            ))}
          </div>

          {/* Bio fields */}
          <div className="bg-white border border-[#eeeeee] p-5 sm:p-6 rounded-sm flex flex-col gap-5">
            <h2 className="text-base font-medium text-[#111111]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Bio <span className="text-[#888888] font-normal">({LANGS.find(l => l.key === activeLang)?.label})</span>
            </h2>
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Bio text
              </label>
              <textarea
                rows={6}
                value={content.bio[activeLang]}
                onChange={(e) => setContent(prev => ({ ...prev, bio: { ...prev.bio, [activeLang]: e.target.value } }))}
                placeholder={`Bio in ${LANGS.find(l => l.key === activeLang)?.label}…`}
                className="w-full px-3 py-3 text-sm border border-[#e0e0e0] rounded-sm outline-none focus:border-[#c2185b] transition-colors resize-none"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Philosophy quote
              </label>
              <input
                type="text"
                value={content.philosophy[activeLang]}
                onChange={(e) => setContent(prev => ({ ...prev, philosophy: { ...prev.philosophy, [activeLang]: e.target.value } }))}
                placeholder={`Philosophy in ${LANGS.find(l => l.key === activeLang)?.label}…`}
                className="w-full px-3 py-3 text-sm border border-[#e0e0e0] rounded-sm outline-none focus:border-[#c2185b] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}

          {/* Desktop save row */}
          <div className="hidden sm:flex items-center gap-4">
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px]"
              style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}>
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saved && <span className="text-xs text-green-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>✓ Saved successfully</span>}
          </div>
        </form>
      </div>

      {/* Mobile sticky save bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] px-5 py-3 flex items-center gap-3 z-30">
        <button
          type="button"
          onClick={(e) => handleSave(e as unknown as React.FormEvent)}
          disabled={saving}
          className="flex-1 py-3 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[48px]"
          style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-xs text-green-600 flex-shrink-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>✓ Saved</span>}
      </div>
    </div>
  );
}
