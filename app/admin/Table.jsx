"use client";
import { useRef } from "react";

async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("upload failed");
  return res.json();
}

function FileCell({ value, onChange, accept = "image/*,video/*" }) {
  const inputRef = useRef(null);
  const isVideo = value && /\.(mp4|mov|webm|m4v)$/i.test(value);
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative w-14 h-10 rounded border border-bone/15 bg-bone/5 overflow-hidden flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-bone/50 hover:border-amber/60 transition-colors"
        title={value || "Upload"}
      >
        {value ? (
          isVideo ? (
            <video src={value} className="absolute inset-0 w-full h-full object-cover" muted />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )
        ) : (
          "Upload"
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            const { url } = await uploadFile(f);
            onChange(url);
          } catch (err) {
            alert(err.message);
          }
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-[10px] uppercase tracking-[0.2em] text-bone/45 hover:text-bone"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default function Table({ columns, rows, onChange, onAdd, onDelete, onMove }) {
  const update = (i, key, val) => {
    const next = [...rows];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };

  return (
    <div className="overflow-x-auto rounded border border-bone/10">
      <table className="w-full min-w-[800px] text-[13px]">
        <thead>
          <tr className="bg-bone/[0.04] text-[10px] uppercase tracking-[0.2em] text-bone/45">
            <th className="px-3 py-2 text-left w-10">#</th>
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 text-left font-normal" style={{ width: c.width }}>
                {c.label}
              </th>
            ))}
            <th className="px-3 py-2 w-24" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-bone/[0.08] align-top">
              <td className="px-3 py-2 text-bone/35 tabular text-[11px]">{String(i + 1).padStart(2, "0")}</td>
              {columns.map((c) => {
                const v = row[c.key] ?? "";
                if (c.type === "textarea") {
                  return (
                    <td key={c.key} className="px-2 py-2">
                      <textarea
                        value={v}
                        rows={3}
                        onChange={(e) => update(i, c.key, e.target.value)}
                        className="w-full bg-transparent border border-bone/10 rounded px-2 py-1.5 text-bone/90 focus:outline-none focus:border-amber/60 resize-y text-[13px] leading-snug"
                      />
                    </td>
                  );
                }
                if (c.type === "file") {
                  return (
                    <td key={c.key} className="px-2 py-2">
                      <FileCell
                        value={v}
                        onChange={(url) => update(i, c.key, url)}
                        accept={c.accept}
                      />
                    </td>
                  );
                }
                if (c.type === "tags") {
                  const arr = Array.isArray(v) ? v : [];
                  return (
                    <td key={c.key} className="px-2 py-2">
                      <input
                        value={arr.join(", ")}
                        onChange={(e) =>
                          update(
                            i,
                            c.key,
                            e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        placeholder="comma, separated"
                        className="w-full bg-transparent border border-bone/10 rounded px-2 py-1.5 text-bone/90 focus:outline-none focus:border-amber/60 text-[13px]"
                      />
                    </td>
                  );
                }
                return (
                  <td key={c.key} className="px-2 py-2">
                    <input
                      value={v}
                      onChange={(e) => update(i, c.key, e.target.value)}
                      className="w-full bg-transparent border border-bone/10 rounded px-2 py-1.5 text-bone/90 focus:outline-none focus:border-amber/60 text-[13px]"
                    />
                  </td>
                );
              })}
              <td className="px-2 py-2">
                <div className="flex items-center gap-1 justify-end text-bone/45">
                  <button
                    type="button"
                    title="Move up"
                    disabled={i === 0}
                    onClick={() => onMove(i, -1)}
                    className="px-1.5 py-1 rounded hover:text-bone disabled:opacity-30"
                  >↑</button>
                  <button
                    type="button"
                    title="Move down"
                    disabled={i === rows.length - 1}
                    onClick={() => onMove(i, 1)}
                    className="px-1.5 py-1 rounded hover:text-bone disabled:opacity-30"
                  >↓</button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => onDelete(i)}
                    className="px-1.5 py-1 rounded hover:text-red-400"
                  >✕</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-bone/[0.08] px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-bone/35">{rows.length} row{rows.length === 1 ? "" : "s"}</span>
        <button
          type="button"
          onClick={onAdd}
          className="text-[10px] uppercase tracking-[0.2em] text-amber hover:text-bone transition-colors"
        >+ Add row</button>
      </div>
    </div>
  );
}
