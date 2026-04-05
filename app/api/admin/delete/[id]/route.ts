import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authRes = new NextResponse();
  const session = await getIronSession<SessionData>(req, authRes, sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // public_id is passed URL-encoded, e.g. "makeup-sae%2Fgallery%2Ffilename"
  const publicId = decodeURIComponent(params.id);

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok") {
    return NextResponse.json(
      { error: `Cloudinary deletion failed: ${result.result}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
