import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { readContentJson, writeContentJson } from "@/lib/cloudinaryContent";
import { type ServiceContent, DEFAULT_SERVICES } from "@/lib/content/services";

function auth(req: NextRequest) {
  const res = new NextResponse();
  return getIronSession<SessionData>(req, res, sessionOptions);
}

export async function GET(req: NextRequest) {
  const session = await auth(req);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const services = await readContentJson<ServiceContent[]>("services.json", DEFAULT_SERVICES);
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await auth(req);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const services: ServiceContent[] = await req.json();
  await writeContentJson("services.json", services);
  return NextResponse.json({ ok: true });
}
