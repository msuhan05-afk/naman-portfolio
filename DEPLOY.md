# Deploy to Vercel

This project uses **Vercel KV** for the CMS content (`content/site.json`) and **Vercel Blob** for uploaded media.
Locally it transparently falls back to the filesystem, so `npm run dev` keeps working without any cloud setup.

## One-time setup

1. Push the repo to GitHub.
2. Install Vercel CLI: `npm i -g vercel` (or use `npx vercel`).
3. From the project root: `vercel link` — pick the team and create the project.
4. In the Vercel dashboard:
   - **Storage → Create → KV** → name it `naman-cms` → connect to this project.
   - **Storage → Create → Blob** → name it `naman-media` → connect to this project.
   This auto-injects `KV_*` and `BLOB_READ_WRITE_TOKEN` into the deployment env.
5. Pull the env vars locally so the admin can hit the same stores when you’re running `vercel dev`:
   ```
   vercel env pull .env.local
   ```
6. Deploy:
   ```
   vercel --prod
   ```

## How storage routing works

- `lib/content.js` calls `@vercel/kv` only if `KV_REST_API_URL` + `KV_REST_API_TOKEN` are set; otherwise reads/writes `content/site.json` on disk.
- On the first KV read it **seeds** itself from the bundled `content/site.json`, so the production site has data on day one.
- `app/api/upload/route.js` uses `@vercel/blob.put()` if `BLOB_READ_WRITE_TOKEN` is set; otherwise writes to `public/uploads/`.
- `next.config.mjs` already whitelists `*.public.blob.vercel-storage.com` so `<img src>` from Blob works with `next/image` if you add it later.

## After deploy

- Visit `/admin` on the live URL — Save now persists to KV.
- Upload a file from the admin — it lands in your Blob store with a permanent public URL.
- Changes are visible on the next page load (pages are `force-dynamic`, no rebuild needed).

## Costs

Hobby tier covers a portfolio comfortably: KV 30k commands/day, Blob 1 GB storage / 10 GB bandwidth / month.
