/** Checks every built page's internal links, fragments and resource references, including translated routes. */
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root = resolve('dist');
const pages = [];
const errors = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
}
await walk(root);
let checked = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const route = page.slice(root.length).replace(/index\.html$/, '');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  const origin = canonical
    ? new URL(canonical[1]).origin
    : 'https://validation.test';
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(data:|mailto:|tel:)/.test(raw)) continue;
    const url = new URL(raw, `${origin}${route}`);
    if (url.origin !== origin) continue;
    let target = resolve(root, '.' + decodeURIComponent(url.pathname));
    try {
      if ((await stat(target)).isDirectory())
        target = join(target, 'index.html');
      await stat(target);
    } catch {
      errors.push(`${route}: missing ${raw}`);
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const body = await readFile(target, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      if (!body.includes(`id="${id}"`))
        errors.push(`${route}: missing fragment ${raw}`);
    }
    checked++;
  }
}
// A draft title or private repository path in the public artifact is a publication failure.
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const token of [
    'plataforma_cursos',
    'motor_ia',
    'projeto_extensao',
    'Rascunho — não publicar',
  ])
    if (html.includes(token))
      errors.push(`Draft/private marker in ${page}: ${token}`);
}

// With a configured origin, sitemap coverage must exactly match public content routes.
const indexHtml = await readFile(join(root, 'index.html'), 'utf8');
const site = indexHtml.match(/<link rel="canonical" href="([^"]+)"/);
if (site) {
  const origin = new URL(site[1]).origin;
  const expected = pages
    .filter((page) => !page.endsWith('/404.html'))
    .map(
      (page) => origin + page.slice(root.length).replace(/index\.html$/, ''),
    );
  const xml = await readFile(join(root, 'sitemap-0.xml'), 'utf8');
  const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  if (
    JSON.stringify([...listed].sort()) !== JSON.stringify([...expected].sort())
  )
    errors.push('Sitemap does not exactly cover public content routes.');
  const robots = await readFile(join(root, 'robots.txt'), 'utf8');
  if (!robots.includes(`Sitemap: ${origin}/sitemap-index.xml`))
    errors.push('Robots sitemap origin is inconsistent.');
  for (const page of pages.filter((page) => !page.endsWith('/404.html'))) {
    const html = await readFile(page, 'utf8');
    if (
      [...html.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)].some(
        (match) => !match[1].startsWith(origin + '/'),
      )
    )
      errors.push(`Invalid hreflang origin in ${page}`);
    if ((html.match(/hreflang=/g) || []).length !== 3)
      errors.push(`Missing paired hreflang links in ${page}`);
  }
  console.log(
    `${listed.length} sitemap entries and paired absolute hreflang links: valid.`,
  );
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `${pages.length} HTML pages, ${checked} internal references: valid. Draft/private markers absent.`,
  );
