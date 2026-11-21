// Static pages and one Vue island; a real deployment origin enables absolute SEO URLs.
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
const site = process.env.SITE_URL || process.env.CF_PAGES_URL;
if (site && !/^https:\/\//.test(site))
  throw new Error('SITE_URL must be an HTTPS origin');
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    vue(),
    ...(site ? [sitemap({ filter: (url) => !url.includes('/404/') })] : []),
  ],
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
});
