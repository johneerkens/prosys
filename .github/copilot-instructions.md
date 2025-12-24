<!-- Prosys: repo-specific instructions for AI coding agents -->
# Copilot instructions — Prosys

Purpose: Make targeted edits to a small marketing site. This repository is primarily a static single-page site, with a leftover Next.js package.json. Read the files listed below before changing behavior.

- Big picture
  - Primary UI: [index.html](index.html) — single-page marketing site and product showcase.
  - Client logic: [script.js](script.js) — contact form validation + POST to `/api/contact` expecting JSON { ok: true } on success.
  - Styling: [styles.css](styles.css) — site-wide CSS variables and component classes (e.g., `.container`, `.product-image`).
  - Assets: `images/` and `public/` hold site images; images use AVIF and JPG/PNG formats.
  - Note: [package.json](package.json) contains Next.js scripts (dev/build/start). There is no `pages/` or `app/` directory in the top-level; verify whether a Next app exists elsewhere before editing server/API routes.

- What to check before changes
  - Open `index.html`, `script.js`, and `styles.css` to learn the simple DOM structure and class names used across components.
  - The contact form POSTs to `/api/contact`. If you implement or modify an API, ensure it returns JSON { ok: true } (or { ok: false, error: '...' }) to match the front-end handling in `script.js`.
  - If adding server-side code, confirm whether the project should use Next.js (use `npm run dev`) or remain static (serve `index.html`). Do not assume Next.js without checking for `pages/` or `app/` folders.

- Developer workflows (practical commands)
  - Static preview: `python -m http.server 3000` or `npx http-server -p 3000` and open `http://localhost:3000` to test the static `index.html` site.
  - Next.js dev (only if a Next app exists): `npm run dev` (requires Node and the `next` dependency in `package.json`).
  - Linting: `npm run lint` when a Next project is present.

- Project-specific patterns & conventions
  - Minimal JS: `script.js` handles DOM-ready setup and the single contact form flow. Follow its simple promise/async style and the `fetch('/api/contact')` contract.
  - UI tokens: CSS uses `:root` variables (`--accent`, `--muted`, etc.). Prefer those for color/spacing changes.
  - Responsive layout: `.container` and CSS grid patterns are used for layout; avoid introducing new layout systems without updating `styles.css`.
  - Image handling: `.product-image img` uses `object-fit: contain`. Ensure new assets respect the existing aspect and container sizes.

- Integration points & external dependencies
  - Client → API: `/api/contact` (client expects JSON). If you add serverless endpoints (e.g., Netlify Functions, Vercel, or Next API routes), keep response shape compatible with `script.js`.
  - package.json lists `next`, `react`, `react-dom`. If enabling the Next app, follow Next conventions for API routes (`/pages/api/contact` or `app/api/contact/route.js`).

- Examples (use these as patterns)
  - Contact API response success:
    - Return: `{ "ok": true }`
    - Client resets form and shows success message per `script.js`.
  - API error:
    - Return HTTP 400/500 with `{ "ok": false, "error": "..." }` and the client will show a failure message.

- Editing guidance
  - Keep changes minimal and localized: modify `index.html`, `script.js`, and `styles.css` together when adjusting UI behavior.
  - If adding new pages or routes, update `nav` anchors in `index.html` and confirm CSS spacing in `styles.css`.
  - When introducing a server/API, add clear tests or a README note describing start steps (static vs Next.js).

If any of these assumptions are wrong (for example, if a Next app exists elsewhere), tell me where and I'll update these instructions. Ready for edits — want me to commit this file? 
