import XRPhysical from "@/components/XRPhysical";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "XR / Physical — Naman Mehra",
  description: "Extended reality, spatial computing and physical interface projects.",
};

export default async function XRPage() {
  const c = await getContent();
  return (
    <main className="relative pt-20">
      <div className="px-5 md:px-8 pt-16 pb-4 max-w-[1400px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-bone/35 mb-4">02 / XR & Physical</p>
        <h1 className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest text-bone mb-2">
          Spatial &
        </h1>
        <h1
          className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest editorial"
          style={{
            background: "linear-gradient(135deg, #ede8d0 0%, #7EC8C8 55%, #ede8d0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Embodied.
        </h1>
      </div>
      <XRPhysical items={c.xrProjects} />
    </main>
  );
}
