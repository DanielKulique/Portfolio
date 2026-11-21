/** Reproducible mobile Lighthouse audit; run while scripts/serve.mjs serves the built artifact. */
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({
  args: ['--remote-debugging-port=9222', '--no-sandbox'],
});
await mkdir('artifacts/lighthouse', { recursive: true });
try {
  const summary = [];
  for (const path of [
    '/',
    '/en/',
    '/projects/sistemas-distribuidos/',
    '/projects/otimizacao-colonia-formigas/',
  ]) {
    const result = await lighthouse(
      `${process.env.LIGHTHOUSE_BASE_URL || 'http://127.0.0.1:4321'}${path}`,
      {
        port: 9222,
        output: ['html', 'json'],
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
        chromeFlags: ['--headless', '--no-sandbox'],
      },
    );
    if (!result) throw new Error('No Lighthouse result');
    const name =
      path === '/'
        ? 'home-pt'
        : path.replaceAll('/', '-').replace(/^-|-$/g, '');
    await writeFile(`artifacts/lighthouse/${name}.html`, result.report[0]);
    await writeFile(`artifacts/lighthouse/${name}.json`, result.report[1]);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round((value.score ?? 0) * 100),
      ]),
    );
    summary.push({ path, ...scores });
  }
  await writeFile(
    'artifacts/lighthouse/summary.json',
    JSON.stringify(summary, null, 2) + '\n',
  );
  console.log(summary);
} finally {
  await browser.close();
}
