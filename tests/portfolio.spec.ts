/** End-to-end evidence for routing, localization, progressive enhancement and accessibility. */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const slugs = [
  'sistemas-distribuidos',
  'pipeline-ans',
  'space-arena',
  'masmorra-2d',
  'otimizacao-colonia-formigas',
];
test('home and working category filters', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Daniel Kulique/);
  await expect(page.locator('.project-card:visible')).toHaveCount(5);
  await page.getByRole('button', { name: 'Back-end', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(2);
  await page
    .getByRole('button', { name: 'Inteligência artificial', exact: true })
    .click();
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await expect(page.locator('.project-card:visible h3')).toContainText(
    'Caminhos',
  );
  await page.getByRole('button', { name: 'Todos', exact: false }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(5);
});
test('theme persists and survives blocked storage', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Blocked');
      },
    });
  });
  await page.reload();
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
test('language preserves the corresponding study and section', async ({
  page,
}) => {
  await page.goto('/projects/pipeline-ans/');
  await page.getByRole('link', { name: /Read in English/ }).click();
  await expect(page).toHaveURL(/\/en\/projects\/pipeline-ans\//);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('From documents to queries.');
  if (await page.locator('link[rel="canonical"]').count()) {
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveAttribute(
      'href',
      /^https:\/\/.+\/projects\/pipeline-ans\//,
    );
  }
  await page.goto('/#about');
  await page.getByRole('link', { name: /Read in English/ }).click();
  await expect(page).toHaveURL(/\/en\/#about/);
});
test('diagram supports keyboard selection and announces detail', async ({
  page,
}) => {
  await page.goto('/');
  const node = page.getByRole('button', { name: /Persistência MySQL/ });
  await node.focus();
  await page.keyboard.press('Enter');
  await expect(node).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#layer-detail')).toContainText('Transações JDBC');
});
test('keyboard skip link, contact and responsive navigation', async ({
  page,
}, info) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Pular para o conteúdo' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  if (info.project.name === 'mobile') {
    const button = page.getByRole('button', { name: 'Abrir navegação' });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await button.click();
    await page
      .locator('#navigation')
      .getByRole('link', { name: 'Contato', exact: true })
      .click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  } else {
    await page
      .locator('#navigation')
      .getByRole('link', { name: 'Contato', exact: true })
      .click();
  }
  await expect(page).toHaveURL(/#contact/);
  await expect(
    page.getByRole('link', { name: 'Conectar pelo GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/DanielKulique');
  await expect(
    page.locator('a[href^="mailto:"],a[href*="linkedin.com"],a[href$=".pdf"]'),
  ).toHaveCount(0);
});
test('all translated studies, CSP and 404 have no JavaScript errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404'))
      errors.push(m.text());
  });
  for (const prefix of ['/', '/en/']) {
    await page.goto(prefix);
    await expect(page.locator('h1')).toBeVisible();
    for (const slug of slugs) {
      const response = await page.goto(`${prefix}projects/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('.case-section')).toHaveCount(11);
    }
  }
  for (const path of [
    '/missing-route/',
    '/projects/plataforma-cursos/',
    '/en/projects/similaridade-textual/',
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Esta rota');
  }
  expect(errors).toEqual([]);
});
test('WCAG AA checks on every public page in both themes', async ({ page }) => {
  for (const theme of ['dark', 'light']) {
    await page.addInitScript(
      (value) => localStorage.setItem('theme', value),
      theme,
    );
    for (const prefix of ['/', '/en/']) {
      for (const route of [
        prefix,
        ...slugs.map((slug) => `${prefix}projects/${slug}/`),
      ]) {
        await page.goto(route);
        const results = await new AxeBuilder({ page })
          .withTags([
            'wcag2a',
            'wcag2aa',
            'wcag21a',
            'wcag21aa',
            'wcag22a',
            'wcag22aa',
          ])
          .analyze();
        expect(results.violations, `${theme}: ${route}`).toEqual([]);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          route,
        ).toBe(true);
      }
    }
  }
});
test('screenshots and reduced motion', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const locale of ['pt', 'en']) {
    await page.goto(locale === 'pt' ? '/' : '/en/');
    await page.evaluate(() => document.fonts.ready);
    for (const theme of ['dark', 'light']) {
      await page.evaluate((value) => {
        document.documentElement.dataset.theme = value;
      }, theme);
      // Load deferred images/islands before capturing the full page.
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `artifacts/screenshots/${info.project.name}-${locale}-${theme}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    }
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});
test('all project content stays available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(page.locator('.filter-bar')).toBeHidden();
  await page.locator('.project-card h3 a').first().click();
  await expect(page.locator('.case-section')).toHaveCount(11);
  await context.close();
});
