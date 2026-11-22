/** Hash only generated inline code; Cloudflare enforces the same policy exercised by browser tests. */
import { readdir, readFile, writeFile, rename, rmdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
const scripts = new Set();
const styles = new Set();
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (path.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const [, attrs, body] of html.matchAll(
        /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
      )) {
        if (!/\bsrc=/.test(attrs) && body.trim())
          scripts.add(
            `'sha256-${createHash('sha256').update(body).digest('base64')}'`,
          );
      }
      for (const [, body] of html.matchAll(
        /<style\b[^>]*>([\s\S]*?)<\/style>/g,
      ))
        styles.add(
          `'sha256-${createHash('sha256').update(body).digest('base64')}'`,
        );
    }
  }
}
// Astro emits nested 404 routes as directories; Pages expects a sibling 404.html.
await rename('dist/en/404/index.html', 'dist/en/404.html');
await rmdir('dist/en/404');
await walk('dist');
const policy = `default-src 'self'; script-src 'self' ${[...scripts].join(' ')}; style-src 'self' ${[...styles].join(' ')}; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'`;
await writeFile(
  'dist/_headers',
  `/*\n  Content-Security-Policy: ${policy}\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: DENY\n\n/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n`,
);
const site = process.env.SITE_URL || process.env.CF_PAGES_URL;
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL('/sitemap-index.xml', site).href}\n` : '# Sitemap origin is added automatically after a real hosting URL is available.\n'}`,
);
console.log(
  `Generated Cloudflare headers with ${scripts.size} script hashes and ${styles.size} style hashes.`,
);
