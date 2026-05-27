import JourneyHero from "@/components/JourneyHero";
import About from "@/components/About";
import FieldNotes from "@/components/FieldNotes";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "About — Naman Mehra",
  description: "HCI designer based in London. Jammu → Delhi → London.",
};

export default async function AboutPage() {
  const c = await getContent();
  return (
    <main className="relative pt-20">
      <div className="px-5 md:px-8 pt-16 pb-4 max-w-[1400px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-bone/35 mb-4">04 / About</p>
        <h1 className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest text-bone mb-2">
          The
        </h1>
        <h1
          className="font-display text-[12vw] md:text-[7vw] leading-none tracking-tightest editorial"
          style={{
            background: "linear-gradient(135deg, #ede8d0 0%, #7EC87E 55%, #ede8d0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Journey.
        </h1>
      </div>
      <JourneyHero />
      <About data={c.about} />
      <FieldNotes notes={c.notes} />
      <Contact data={c.contact} />
    </main>
  );
}
