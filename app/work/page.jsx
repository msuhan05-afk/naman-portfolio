import SelectedWork from "@/components/SelectedWork";
import Archive from "@/components/Archive";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Work — Naman Mehra",
  description: "Selected projects in HCI, product and visual design.",
};

export default async function WorkPage() {
  const c = await getContent();
  return (
    <main className="relative pt-20">
      <div className="px-5 md:px-8 pt-16 pb-4 max-w-[1400px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-bone/35 mb-4">01 / Work</p>
        <h1 className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest text-bone mb-2">
          Selected
        </h1>
        <h1 className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest editorial"
          style={{
            background: "linear-gradient(135deg, #ede8d0 0%, #D6A95F 55%, #ede8d0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Projects.
        </h1>
      </div>
      <SelectedWork projects={c.projects} />
      <Archive stills={c.archive} />
    </main>
  );
}
