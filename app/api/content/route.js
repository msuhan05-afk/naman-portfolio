import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getContent();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
