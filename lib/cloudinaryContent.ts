import cloudinary from "./cloudinary";

const FOLDER = "makeup-sae/content";

export async function readContentJson<T>(filename: string, fallback: T): Promise<T> {
  const publicId = `${FOLDER}/${filename}`;
  const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function writeContentJson(filename: string, data: unknown): Promise<void> {
  const publicId = `${FOLDER}/${filename}`;
  const buffer = Buffer.from(JSON.stringify(data, null, 2));
  await new Promise<void>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: publicId, resource_type: "raw", overwrite: true, invalidate: true },
        (error, result) => {
          if (error || !result) reject(error ?? new Error("Write failed"));
          else resolve();
        }
      )
      .end(buffer);
  });
}
