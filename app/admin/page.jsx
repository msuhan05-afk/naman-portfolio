import { getContent } from "@/lib/content";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin · Naman Mehra" };

export default async function AdminPage() {
  const data = await getContent();
  const token = process.env.ADMIN_PASSWORD || "studio";
  return <AdminClient initial={data} token={token} />;
}
