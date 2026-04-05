import { NextResponse } from "next/server";
import { readContentJson } from "@/lib/cloudinaryContent";
import { type AboutContent, DEFAULT_ABOUT } from "@/lib/content/about";

export async function GET() {
  const content = await readContentJson<AboutContent>("about.json", DEFAULT_ABOUT);
  return NextResponse.json(content);
}
