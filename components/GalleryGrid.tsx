"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CloudinaryImage {
  url: string;
  public_id: string;
  created_at: string;
}

interface GalleryGridProps {
  limit?: number;
}

export default function GalleryGrid({ limit }: GalleryGridProps) {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data: CloudinaryImage[]) => {
        setImages(limit ? data.slice(0, limit) : data);
      })
      .catch(() => {});
  }, [limit]);

  useEffect(() => {
    if (images.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll(".fade-in");
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="masonry-grid">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div key={i} className="masonry-item" style={{ marginBottom: 12 }}>
            <div
              className="w-full bg-[#f5f0f2] animate-pulse"
              style={{ height: 280 + (i % 3) * 80 }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="masonry-grid">
      {images.map((img, i) => (
        <div
          key={img.public_id}
          className="masonry-item fade-in overflow-hidden"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <Image
            src={img.url}
            alt={img.public_id.split("/").pop() ?? "Makeup look"}
            width={600}
            height={800}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  );
}
