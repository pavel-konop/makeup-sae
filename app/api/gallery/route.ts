import { NextResponse } from "next/server";
import { getManifest } from "@/lib/gallery";

export async function GET() {
  const images = await getManifest();
  return NextResponse.json(images);
}
