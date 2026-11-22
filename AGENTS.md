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

## GOAL 02 maintenance

- Keep the hero focused on Daniel's identity, specialty, education and availability. Source public contacts from src/data/profile.ts; do not infer authorization from Git identity or discovered documents.
- Preserve the original PDF printout in the workspace. Root-level PDFs are ignored; only an explicitly authorized résumé belongs in public/documents.
- Project names should describe the system. Preserve creative subtitles, provenance, implementation status and technical limitations; editorial pending-work messages belong in docs.
- Published entries must have both complete study translations, overview, run instructions and usable attributed evidence. Derive filters from published entries. Screenshots, prototypes, source excerpts and actual test output must be distinguishable.
- The Engineering Lab has a pure algorithm layer in src/lib/algorithms and Vue islands in src/components/lab. A* uses a unit-cost orthogonal grid and Manhattan distance. Keep its BFS-oracle tests, input validation, keyboard editing, reduced-motion behavior and truthful metrics.
- Future experiments stay in the internal roadmap until functional. Do not publish placeholder controls or describe lexical similarity as semantic similarity.
- Playwright uses port 4325 with reuseExistingServer disabled, independently from the user's development preview. Validate 360, 390, 768, 1024, 1440 and 1920px, both themes and languages, after fonts/hydration settle.
- Keep print styles and separate Portuguese/English 404s working. The build converts Astro's nested English fallback to en/404.html before hashing the artifact for CSP.
- Run npm run validate and a comparable Lighthouse audit before a release. Preserve before/after evidence and update docs/RECRUITER_REVIEW.md, docs/ENGINEERING_LAB.md and the inventory. Automated a11y and the recruiting heuristic are not user studies or guarantees of WCAG conformance.
