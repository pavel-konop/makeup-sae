import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { getManifest, saveManifest } from "@/lib/gallery";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const authRes = new NextResponse();
  const session = await getIronSession<SessionData>(req, authRes, sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string | null) ?? "Makeup look";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const id = crypto.randomUUID();
  const filename = `${id}.${ext}`;
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  await fs.mkdir(galleryDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await fs.writeFile(path.join(galleryDir, filename), Buffer.from(bytes));

  const manifest = await getManifest();
  manifest.push({ id, filename, alt, order: manifest.length });
  await saveManifest(manifest);

  return NextResponse.json({ id, filename, alt });
}
