import { NextResponse } from "next/server";
import { readContentJson } from "@/lib/cloudinaryContent";
import { type ServiceContent, DEFAULT_SERVICES } from "@/lib/content/services";

export async function GET() {
  const services = await readContentJson<ServiceContent[]>("services.json", DEFAULT_SERVICES);
  return NextResponse.json(services);
}
