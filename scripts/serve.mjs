/** Local production fixture: serves the static build and Cloudflare's security headers, including real 404s. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist');
const port = Number(process.env.PORT || 4321);
const headerText = await readFile('dist/_headers', 'utf8');
const headers = Object.fromEntries(
  headerText
    .split('\n\n')[0]
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const pos = line.indexOf(':');
      return [line.slice(0, pos).trim(), line.slice(pos + 1).trim()];
    }),
);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
};
createServer(async (req, res) => {
  try {
    const path = resolve(
      root,
      '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
    );
    if (path !== root && !path.startsWith(root + '/')) {
      res.writeHead(403);
      res.end();
      return;
    }
    let file = path;
    let code = 200;
    try {
      if ((await stat(file)).isDirectory()) file += '/index.html';
      await stat(file);
    } catch {
      file =
        root +
        (new URL(req.url, 'http://localhost').pathname.startsWith('/en/')
          ? '/en/404.html'
          : '/404.html');
      code = 404;
    }
    const data = await readFile(file);
    res.writeHead(code, {
      ...headers,
      'Content-Type': mime[extname(file)] || 'application/octet-stream',
      ...(file.includes('/_astro/')
        ? { 'Cache-Control': 'public, max-age=31536000, immutable' }
        : {}),
    });
    res.end(data);
  } catch {
    res.writeHead(500);
    res.end('Static fixture error');
  }
}).listen(port, '127.0.0.1', () =>
  console.log(`Static build + CSP: http://127.0.0.1:${port}`),
);
