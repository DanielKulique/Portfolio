# Development instructions

This repository is Daniel Kulique's static bilingual portfolio. Read README.md and docs/ARCHITECTURE.md before changes.

- Use Node 24.20.0 and `npm ci`. Keep exact dependency versions and package-lock.json in Git.
- Use Astro for static UI, strict TypeScript and Tailwind's Vite integration. Vue is reserved for interactive islands.
- Keep professional facts in src/data, UI copy in src/i18n and studies in src/content/projects.
- Never fetch or copy private research, course-platform code, corpora, personal records or credentials into this repository or public build. Drafts contain only authorized synopses and must remain excluded from all routes and client props.
- Public claims need inspected source evidence. Pin repository sources to revisions. Identify inherited teaching material. Do not invent dates, individual authorship, metrics or proficiency levels.
- Every public study requires both languages and all schema fields. Update the inventory with evidence and pending facts.
- Preserve language pairing, keyboard navigation, theme persistence, reduced-motion behavior and no-JavaScript content access.
- `npm run build` generates the deployment security headers. Do not bypass it or add unsafe-eval/unsafe-inline to fix CSP errors.
- Before completion run `npm run validate`, inspect desktop/mobile screenshots, and record actual results in docs/VALIDATION.md. Use `node scripts/serve.mjs` to test production CSP; Astro preview alone does not apply Cloudflare headers.
- Do not invent a production URL. SITE_URL must refer to a confirmed deployment. Reserved .test origins are only for local/CI metadata verification.
- Respect the existing origin and branch protections. Never force push or modify the project repositories referenced by this portfolio.
