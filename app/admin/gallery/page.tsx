"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface CloudinaryImage {
  url: string;
  public_id: string;
  created_at: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function loadImages() {
    const res = await fetch("/api/admin/images");
    if (res.status === 401) {
      router.replace("/admin");
      return;
    }
    const data = await res.json();
    setImages(data);
  }

  useEffect(() => {
    loadImages();
  }, []); // eslint-disable-line

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setUploadFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", uploadFile);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (res.ok) {
      setUploadFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadImages();
    } else {
      const data = await res.json();
      setError(data.error ?? "Upload failed");
    }
  }

  async function handleDelete(publicId: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this image? This cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(publicId);
    setDeleteError(null);

    const res = await fetch(
      `/api/admin/delete/${encodeURIComponent(publicId)}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      // Only remove from UI after Cloudinary confirms deletion
      setImages((prev) => prev.filter((img) => img.public_id !== publicId));
    } else {
      const data = await res.json();
      setDeleteError(data.error ?? "Deletion failed — please try again.");
    }

    setDeletingId(null);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Admin header */}
      <div
        className="bg-white border-b-2 px-6 h-14 flex items-center justify-between"
        style={{ borderColor: "#c2185b" }}
      >
        <div className="flex items-center gap-4">
          <p
            className="text-[#111111] font-medium tracking-widest uppercase text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            make.up_sae
          </p>
          <span className="text-[#e0e0e0] text-xs">›</span>
          <span
            className="text-[#888888] text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Gallery Management
          </span>
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

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Upload panel */}
        <div className="bg-white border border-[#eeeeee] p-6 rounded-sm mb-10">
          <h2
            className="text-xl text-[#111111] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Upload new photo
          </h2>

          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Preview */}
            <div
              className="w-24 h-24 bg-[#f5f0f2] rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center cursor-pointer border border-dashed border-[#ddd] hover:border-[#c2185b] transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#ccc] text-xl">+</span>
              )}
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onFileChange}
                className="hidden"
              />

              <div>
                <label
                  className="block text-xs font-medium text-[#888888] mb-1 tracking-wide uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Photo file
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm px-4 py-2 border border-[#e0e0e0] rounded-sm text-[#111111] hover:border-[#c2185b] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {uploadFile ? uploadFile.name : "Choose image…"}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!uploadFile || uploading}
                className="w-fit px-5 py-2 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-40"
                style={{ backgroundColor: "#c2185b", fontFamily: "'DM Sans', sans-serif" }}
              >
                {uploading ? "Uploading…" : "Upload photo"}
              </button>
            </div>
          </form>
        </div>

        {/* Delete error banner */}
        {deleteError && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-sm flex items-center justify-between">
            <p className="text-xs text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {deleteError}
            </p>
            <button
              onClick={() => setDeleteError(null)}
              className="text-xs text-red-400 hover:text-red-600 ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Gallery grid */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl text-[#111111]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Gallery ({images.length} photos)
          </h2>
        </div>

        {images.length === 0 ? (
          <div
            className="text-center py-20 text-[#888888] text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            No photos yet. Upload the first one above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <div
                key={img.public_id}
                className="relative group aspect-square bg-[#f5f0f2] overflow-hidden rounded-sm"
              >
                <Image
                  src={img.url}
                  alt={img.public_id.split("/").pop() ?? "Makeup look"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <button
                    onClick={() => handleDelete(img.public_id)}
                    disabled={deletingId === img.public_id}
                    className="px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {deletingId === img.public_id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
