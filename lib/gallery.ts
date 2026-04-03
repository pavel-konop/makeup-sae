import fs from "fs/promises";
import path from "path";

export interface GalleryImage {
  id: string;
  filename: string;
  alt: string;
  order: number;
}

const MANIFEST_PATH = path.join(process.cwd(), "data", "gallery.json");
const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

export async function getManifest(): Promise<GalleryImage[]> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf-8");
    const data: GalleryImage[] = JSON.parse(raw);
    return data.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

export async function saveManifest(images: GalleryImage[]): Promise<void> {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(images, null, 2));
}

export async function deleteImage(id: string): Promise<boolean> {
  const manifest = await getManifest();
  const image = manifest.find((img) => img.id === id);
  if (!image) return false;

  // Delete file from disk
  try {
    await fs.unlink(path.join(GALLERY_DIR, image.filename));
  } catch {
    // File may already be gone — continue
  }

  const updated = manifest
    .filter((img) => img.id !== id)
    .map((img, i) => ({ ...img, order: i }));

  await saveManifest(updated);
  return true;
}
