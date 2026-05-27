import VibeCode from "@/components/VibeCode";
import Playground from "@/components/Playground";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Playground — Naman Mehra",
  description: "Creative coding experiments, vibe code demos and half-baked ideas.",
};

export default async function PlaygroundPage() {
  const c = await getContent();
  return (
    <main className="relative pt-20">
      <div className="px-5 md:px-8 pt-16 pb-4 max-w-[1400px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-bone/35 mb-4">03 / Playground</p>
        <h1 className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest text-bone mb-2">
          Experiments &
        </h1>
        <h1
          className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest editorial"
          style={{
            background: "linear-gradient(135deg, #ede8d0 0%, #C87EC8 55%, #ede8d0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Vibe Code.
        </h1>
      </div>
      <VibeCode items={c.xrProjects} />
      <Playground />
    </main>
  );
}
