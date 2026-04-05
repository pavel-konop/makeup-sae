import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  const result = await cloudinary.search
    .expression("folder:makeup-sae/gallery")
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  const images = result.resources.map(
    (r: { secure_url: string; public_id: string; created_at: string }) => ({
      url: r.secure_url,
      public_id: r.public_id,
      created_at: r.created_at,
    })
  );

  return NextResponse.json(images);
}
