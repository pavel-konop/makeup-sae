import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { deleteImage } from "@/lib/gallery";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authRes = new NextResponse();
  const session = await getIronSession<SessionData>(req, authRes, sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ok = await deleteImage(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
