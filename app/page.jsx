import Hero from "@/components/Hero";
import SectionIndex from "@/components/SectionIndex";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getContent();
  return (
    <main className="relative">
      <Hero data={c.hero} />
      <SectionIndex />
    </main>
  );
}
