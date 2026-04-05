import GalleryGrid from "@/components/GalleryGrid";
import cloudinary from "@/lib/cloudinary";
import GalleryPageClient from "./GalleryPageClient";

export const dynamic = "force-dynamic";

async function getGalleryImages() {
  const result = await cloudinary.search
    .expression("folder:makeup-sae/gallery")
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  return result.resources.map(
    (r: { secure_url: string; public_id: string }) => ({
      url: r.secure_url,
      public_id: r.public_id,
    })
  );
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <GalleryPageClient />

      <section className="px-5 sm:px-6 pb-14 sm:pb-20 max-w-6xl mx-auto">
        <GalleryGrid images={images} />
      </section>
    </>
  );
}
