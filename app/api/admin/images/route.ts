import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";

export interface CloudinaryImage {
  url: string;
  public_id: string;
  created_at: string;
}

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await cloudinary.search
    .expression("folder:makeup-sae/gallery")
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  const images: CloudinaryImage[] = result.resources.map(
    (r: { secure_url: string; public_id: string; created_at: string }) => ({
      url: r.secure_url,
      public_id: r.public_id,
      created_at: r.created_at,
    })
  );

  return NextResponse.json(images);
}
