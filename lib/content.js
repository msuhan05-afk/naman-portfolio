import fs from "node:fs/promises";
import path from "node:path";

export const CONTENT_PATH = path.join(process.cwd(), "content", "site.json");
const KV_KEY = "naman:site";

// KV is configured automatically on Vercel when the store is linked.
// Locally, the env vars are absent and we fall back to the JSON file on disk.
const hasKV = () => Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function readFromDisk() {
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeToDisk(data) {
  await fs.writeFile(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getContent() {
  if (hasKV()) {
    const { kv } = await import("@vercel/kv");
    const stored = await kv.get(KV_KEY);
    if (stored) return stored;
    // First read — hydrate KV from the bundled seed so the live site has data.
    const seed = await readFromDisk();
    await kv.set(KV_KEY, seed);
    return seed;
  }
  return readFromDisk();
}

export async function saveContent(data) {
  if (hasKV()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, data);
    return true;
  }
  await writeToDisk(data);
  return true;
}

export const caseStudySections = [
  { key: "context", label: "Context", body: "The work begins where most products end — at the moment a user notices the interface at all. We treated friction as a signal, not a failure: a place to listen rather than smooth over." },
  { key: "observation", label: "Observation", body: "Weeks of in-situ studies — kitchens, waiting rooms, transit. Hands hovered, eyes drifted, attention fractured and reassembled. The notebook filled faster than the spec." },
  { key: "exploration", label: "Exploration", body: "Sketches gave way to wired-up prototypes within hours. We built fast, threw away faster, and kept only the gestures that survived being shown to a stranger." },
  { key: "interaction-logic", label: "Interaction Logic", body: "State, time, rhythm. Each interaction was scored — entry, sustain, release — so the interface breathed instead of blinked." },
  { key: "system-thinking", label: "System Thinking", body: "A small grammar of components, composable rather than fixed. The system describes intent; the interface performs it." },
  { key: "reflection", label: "Reflection", body: "The most cinematic moment was the one with no animation at all — a single still frame, held a beat too long. Restraint, again, wins." },
];
