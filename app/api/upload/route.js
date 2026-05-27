import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(-80);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "no file" }, { status: 400 });
    }

    const ts = Date.now();
    const safe = slugify(file.name || "upload.bin");
    const fname = `${ts}-${safe}`;

    // Production / Vercel: write to Blob.
    if (hasBlob()) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`uploads/${fname}`, file, {
        access: "public",
        contentType: file.type || undefined,
      });
      return NextResponse.json({ url: blob.url, name: safe });
    }

    // Local dev: write to /public/uploads
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, fname), buf);
    return NextResponse.json({ url: `/uploads/${fname}`, name: safe, size: buf.length });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
