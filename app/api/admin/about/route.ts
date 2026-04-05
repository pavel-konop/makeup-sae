import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";
import { readContentJson, writeContentJson } from "@/lib/cloudinaryContent";
import { type AboutContent, DEFAULT_ABOUT } from "@/lib/content/about";

function auth(req: NextRequest) {
  const res = new NextResponse();
  return getIronSession<SessionData>(req, res, sessionOptions);
}

export async function GET(req: NextRequest) {
  const session = await auth(req);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await readContentJson<AboutContent>("about.json", DEFAULT_ABOUT);
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const session = await auth(req);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const portrait = formData.get("portrait") as File | null;
  const oldPortraitPublicId = (formData.get("portraitPublicId") as string) ?? "";
  const currentPortraitUrl = (formData.get("portraitUrl") as string) ?? "";

  let portraitUrl = currentPortraitUrl;
  let portraitPublicId = oldPortraitPublicId;

  // Upload new portrait if provided
  if (portrait && portrait.size > 0) {
    const bytes = await portrait.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "makeup-sae/about", resource_type: "image" },
            (error, result) => {
              if (error || !result) reject(error ?? new Error("Upload failed"));
              else resolve({ secure_url: result.secure_url, public_id: result.public_id });
            }
          )
          .end(buffer);
      }
    );

    // Delete old portrait only after successful upload
    if (oldPortraitPublicId) {
      await cloudinary.uploader.destroy(oldPortraitPublicId).catch(() => {});
    }

    portraitUrl = uploaded.secure_url;
    portraitPublicId = uploaded.public_id;
  }

  const content: AboutContent = {
    portraitUrl,
    portraitPublicId,
    bio: {
      id: (formData.get("bio_id") as string) ?? "",
      en: (formData.get("bio_en") as string) ?? "",
      zh: (formData.get("bio_zh") as string) ?? "",
    },
    philosophy: {
      id: (formData.get("philosophy_id") as string) ?? "",
      en: (formData.get("philosophy_en") as string) ?? "",
      zh: (formData.get("philosophy_zh") as string) ?? "",
    },
  };

  await writeContentJson("about.json", content);
  return NextResponse.json({ ok: true, content });
}
