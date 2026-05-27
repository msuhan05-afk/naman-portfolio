import { NextResponse } from "next/server";

const PROTECTED = [/^\/admin(\/.*)?$/, /^\/api\/content$/, /^\/api\/upload$/];

const REALM = 'Basic realm="Naman Studio", charset="UTF-8"';

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (!PROTECTED.some((re) => re.test(pathname))) return NextResponse.next();

  const user = process.env.ADMIN_USER || "naman";
  const pass = process.env.ADMIN_PASSWORD || "studio";

  // API POST routes: accept x-admin-token (used by admin client fetch calls)
  // because browsers don't auto-replay Basic Auth on programmatic fetch().
  const isApiPost =
    req.method === "POST" &&
    (pathname === "/api/content" || pathname === "/api/upload");
  if (isApiPost) {
    const token = req.headers.get("x-admin-token") || "";
    if (token === pass) return NextResponse.next();
  }

  // All other protected routes: standard Basic Auth
  const header = req.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("basic ")) return unauthorized();

  try {
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(":");
    const u = decoded.slice(0, idx);
    const p = decoded.slice(idx + 1);
    if (u === user && p === pass) return NextResponse.next();
  } catch {}
  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/content", "/api/upload"],
};
