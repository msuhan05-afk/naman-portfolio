"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Table from "./Table";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "projects", label: "Selected Work" },
  { id: "xr", label: "XR / Physical" },
  { id: "archive", label: "Archive" },
  { id: "notes", label: "Field Notes" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-bone/45">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="text-[11px] text-bone/35 mt-1 block">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full bg-transparent border border-bone/10 rounded px-2.5 py-2 text-bone/90 focus:outline-none focus:border-amber/60 text-[14px]";

function move(arr, i, dir) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const out = [...arr];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

export default function AdminClient({ initial, token = "" }) {
  const [data, setData] = useState(initial);
  const [tab, setTab] = useState("hero");
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [dirty, setDirty] = useState(false);
  const tokenRef = useRef(token);

  useEffect(() => { tokenRef.current = token; }, [token]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const save = useCallback(async () => {
    setStatus({ type: "saving", msg: "Saving…" });
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": tokenRef.current,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus({ type: "saved", msg: "Saved" });
      setDirty(false);
      setTimeout(() => setStatus({ type: "idle", msg: "" }), 2200);
    } catch (e) {
      setStatus({ type: "error", msg: e.message });
    }
  }, [data]);

  const patch = (section, value) => {
    setData((d) => ({ ...d, [section]: value }));
    setDirty(true);
  };

  const patchHero = (k, v) =>
    setData((d) => {
      setDirty(true);
      return { ...d, hero: { ...d.hero, [k]: v } };
    });

  const patchAbout = (k, v) =>
    setData((d) => {
      setDirty(true);
      return { ...d, about: { ...d.about, [k]: v } };
    });

  const patchContactTop = (k, v) =>
    setData((d) => {
      setDirty(true);
      return { ...d, contact: { ...d.contact, [k]: v } };
    });

  // --- Section renderers ---

  const heroSection = (
    <div className="grid md:grid-cols-2 gap-5">
      <Field label="Name">
        <input value={data.hero.name} onChange={(e) => patchHero("name", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Title">
        <input value={data.hero.title} onChange={(e) => patchHero("title", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Headline words (comma-separated)" hint="These will become the large display headline.">
        <input
          value={data.hero.headline.join(", ")}
          onChange={(e) =>
            patchHero(
              "headline",
              e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
            )
          }
          className={inputCls}
        />
      </Field>
      <Field label="Italic word" hint="The one word in the headline shown in serif italic.">
        <input value={data.hero.italicWord} onChange={(e) => patchHero("italicWord", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Subtitle">
        <textarea rows={3} value={data.hero.subtitle} onChange={(e) => patchHero("subtitle", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Index line">
        <input value={data.hero.indexLine} onChange={(e) => patchHero("indexLine", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Location / availability">
        <input value={data.hero.location} onChange={(e) => patchHero("location", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Currently">
        <textarea rows={2} value={data.hero.currently} onChange={(e) => patchHero("currently", e.target.value)} className={inputCls} />
      </Field>
    </div>
  );

  const projectsSection = (
    <Table
      columns={[
        { key: "slug", label: "Slug", width: 140 },
        { key: "title", label: "Title", width: 220 },
        { key: "category", label: "Category", width: 160 },
        { key: "year", label: "Year", width: 110 },
        { key: "coverImage", label: "Cover", type: "file", width: 110, accept: "image/*" },
        { key: "cover", label: "Gradient fallback", width: 220 },
        { key: "accent", label: "Accent", width: 90 },
        { key: "blurb", label: "Blurb", type: "textarea" },
      ]}
      rows={data.projects}
      onChange={(rows) => patch("projects", rows)}
      onAdd={() =>
        patch("projects", [
          ...data.projects,
          {
            slug: `new-project-${Date.now()}`,
            title: "Untitled",
            category: "—",
            year: new Date().getFullYear().toString(),
            blurb: "",
            cover: "radial-gradient(circle at 30% 25%, #2a2a2a 0%, #141414 100%)",
            coverImage: "",
            accent: "#D6A95F",
          },
        ])
      }
      onDelete={(i) => patch("projects", data.projects.filter((_, j) => j !== i))}
      onMove={(i, dir) => patch("projects", move(data.projects, i, dir))}
    />
  );

  const xrSection = (
    <Table
      columns={[
        { key: "id", label: "ID", width: 130 },
        { key: "title", label: "Title", width: 200 },
        { key: "kind", label: "Kind", width: 180 },
        { key: "year", label: "Year", width: 80 },
        { key: "media", label: "Media", type: "file", width: 110 },
        { key: "swatch", label: "Swatch (CSS)", width: 220 },
        { key: "tagline", label: "Tagline", type: "textarea" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "tags", label: "Tags", type: "tags", width: 180 },
      ]}
      rows={data.xrProjects}
      onChange={(rows) => patch("xrProjects", rows)}
      onAdd={() =>
        patch("xrProjects", [
          ...data.xrProjects,
          {
            id: `xr-${Date.now()}`,
            title: "Untitled",
            kind: "Physical · —",
            year: new Date().getFullYear().toString(),
            tagline: "",
            body: "",
            tags: [],
            swatch: "radial-gradient(circle at 50% 50%, #2a2a2a 0%, #141414 100%)",
            media: "",
          },
        ])
      }
      onDelete={(i) => patch("xrProjects", data.xrProjects.filter((_, j) => j !== i))}
      onMove={(i, dir) => patch("xrProjects", move(data.xrProjects, i, dir))}
    />
  );

  const archiveSection = (
    <Table
      columns={[
        { key: "id", label: "ID", width: 70 },
        { key: "caption", label: "Caption" },
        { key: "image", label: "Image / Video", type: "file", width: 110 },
      ]}
      rows={data.archive}
      onChange={(rows) => patch("archive", rows)}
      onAdd={() =>
        patch("archive", [
          ...data.archive,
          { id: Date.now(), caption: "Untitled", image: "" },
        ])
      }
      onDelete={(i) => patch("archive", data.archive.filter((_, j) => j !== i))}
      onMove={(i, dir) => patch("archive", move(data.archive, i, dir))}
    />
  );

  const notesSection = (
    <Table
      columns={[
        { key: "n", label: "N°", width: 70 },
        { key: "date", label: "Date", width: 110 },
        { key: "text", label: "Note", type: "textarea" },
      ]}
      rows={data.notes}
      onChange={(rows) => patch("notes", rows)}
      onAdd={() =>
        patch("notes", [
          ...data.notes,
          {
            n: String(data.notes.length + 1).padStart(2, "0"),
            date: new Date().toISOString().slice(0, 7).replace("-", " · "),
            text: "",
          },
        ])
      }
      onDelete={(i) => patch("notes", data.notes.filter((_, j) => j !== i))}
      onMove={(i, dir) => patch("notes", move(data.notes, i, dir))}
    />
  );

  const aboutSection = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Based"><input value={data.about.based} onChange={(e) => patchAbout("based", e.target.value)} className={inputCls} /></Field>
        <Field label="Studying"><input value={data.about.studying} onChange={(e) => patchAbout("studying", e.target.value)} className={inputCls} /></Field>
        <Field label="Previously"><input value={data.about.previously} onChange={(e) => patchAbout("previously", e.target.value)} className={inputCls} /></Field>
        <Field label="Open to"><input value={data.about.openTo} onChange={(e) => patchAbout("openTo", e.target.value)} className={inputCls} /></Field>
        <Field label="Paragraph 1"><textarea rows={4} value={data.about.paragraph1} onChange={(e) => patchAbout("paragraph1", e.target.value)} className={inputCls} /></Field>
        <Field label="Paragraph 2"><textarea rows={4} value={data.about.paragraph2} onChange={(e) => patchAbout("paragraph2", e.target.value)} className={inputCls} /></Field>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {Object.entries(data.about.skills).map(([k, v]) => (
          <Field key={k} label={`Skill — ${k}`}>
            <input
              value={v}
              onChange={(e) =>
                patchAbout("skills", { ...data.about.skills, [k]: e.target.value })
              }
              className={inputCls}
            />
          </Field>
        ))}
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-bone/45 mb-2">Timeline</div>
        <Table
          columns={[
            { key: "y", label: "Years", width: 140 },
            { key: "t", label: "Role / Title" },
            { key: "s", label: "Subtitle" },
          ]}
          rows={data.about.timeline}
          onChange={(rows) => patchAbout("timeline", rows)}
          onAdd={() =>
            patchAbout("timeline", [
              ...data.about.timeline,
              { y: new Date().getFullYear().toString(), t: "New role", s: "Where" },
            ])
          }
          onDelete={(i) =>
            patchAbout("timeline", data.about.timeline.filter((_, j) => j !== i))
          }
          onMove={(i, dir) => patchAbout("timeline", move(data.about.timeline, i, dir))}
        />
      </div>
    </div>
  );

  const contactSection = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Phone">
          <input value={data.contact.phone} onChange={(e) => patchContactTop("phone", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Footnote">
          <textarea rows={3} value={data.contact.footnote} onChange={(e) => patchContactTop("footnote", e.target.value)} className={inputCls} />
        </Field>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-bone/45 mb-2">Links</div>
        <Table
          columns={[
            { key: "label", label: "Label", width: 140 },
            { key: "value", label: "Display" },
            { key: "href", label: "URL" },
          ]}
          rows={data.contact.links}
          onChange={(rows) => patchContactTop("links", rows)}
          onAdd={() =>
            patchContactTop("links", [
              ...data.contact.links,
              { label: "Link", value: "example.com", href: "https://example.com" },
            ])
          }
          onDelete={(i) =>
            patchContactTop("links", data.contact.links.filter((_, j) => j !== i))
          }
          onMove={(i, dir) =>
            patchContactTop("links", move(data.contact.links, i, dir))
          }
        />
      </div>
    </div>
  );

  const sections = {
    hero: heroSection,
    projects: projectsSection,
    xr: xrSection,
    archive: archiveSection,
    notes: notesSection,
    about: aboutSection,
    contact: contactSection,
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 md:px-8">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-bone/10 backdrop-blur-md bg-ink/70">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-bone/90">Studio · Admin</span>
            <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-bone/45 hover:text-bone transition-colors ml-3">
              ← view site
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {status.msg && (
              <span
                className={`text-[10px] uppercase tracking-[0.25em] ${
                  status.type === "error" ? "text-red-400" : status.type === "saved" ? "text-amber" : "text-bone/55"
                }`}
              >
                {status.msg}
              </span>
            )}
            {dirty && status.type !== "saving" && (
              <span className="text-[10px] uppercase tracking-[0.25em] text-bone/45">Unsaved</span>
            )}
            <button
              onClick={save}
              className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.25em] rounded-full border border-amber/70 text-amber hover:bg-amber hover:text-ink transition-colors"
            >
              Save · ⌘S
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto">
        {/* Tabs */}
        <nav className="flex flex-wrap gap-1 mb-8 border-b border-bone/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors border-b-2 -mb-px ${
                tab === t.id
                  ? "text-bone border-amber"
                  : "text-bone/45 border-transparent hover:text-bone/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <h1 className="font-display text-3xl md:text-4xl text-bone tracking-tightest mb-2">
          {TABS.find((t) => t.id === tab).label}
        </h1>
        <p className="text-bone/45 text-[13px] mb-8">
          Edits write to <code className="text-bone/70">content/site.json</code>. Uploads land in <code className="text-bone/70">public/uploads/</code>. Save with ⌘S.
        </p>

        <div className="pb-12">{sections[tab]}</div>
      </div>
    </div>
  );
}
