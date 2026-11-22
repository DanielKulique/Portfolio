/** Recruiting journeys, actual production CSP, translations and all six width/theme accessibility combinations. */
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const slugs = [
  'sistemas-distribuidos',
  'pipeline-ans',
  'modelagem-sistema-educacional',
  'otimizacao-colonia-formigas',
  'space-arena',
  'masmorra-2d',
];
const internalText =
  /aguarda (?:verificação|confirmação)|aguardam confirmação|contexto informado para este portfólio|nenhum resultado científico é apresentado nesta versão|conteúdo em construção|materiais serão adicionados|awaiting (?:verification|confirmation)/;
async function ready(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => !document.querySelector('astro-island[client="load"][ssr]'),
  );
}
async function lab(page: Page) {
  await page.goto('/lab/');
  await ready(page);
}
test('professional identity and earlier project discovery', async ({
  page,
}) => {
  await page.goto('/');
  await ready(page);
  await expect(page.locator('h1')).toHaveText('Daniel Kulique.');
  await expect(page.locator('.availability')).toContainText('estágio');
  await expect(page.locator('.hero-specialty')).toContainText(
    'Engenharia de software',
  );
  const hero = await page.locator('.hero').boundingBox();
  expect(hero!.height).toBeLessThan(720);
  await expect(page.locator('.project-card')).toHaveCount(6);
});
test('every published category filters correctly and code links are public', async ({
  page,
}) => {
  await page.goto('/');
  for (const [name, count] of [
    ['Back-end', 2],
    ['Inteligência artificial', 1],
    ['Pesquisa', 1],
    ['Desenvolvimento de sistemas', 4],
    ['Jogos', 2],
    ['Automação', 1],
    ['Processamento de dados', 1],
  ] as const) {
    const button = page.getByRole('button', { name, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.project-card:visible')).toHaveCount(count);
  }
  await page.getByRole('button', { name: /Todos/ }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(6);
  for (const link of await page.locator('.card-bottom a[href^="https:"]').all())
    expect(await link.getAttribute('href')).toMatch(
      /^https:\/\/github.com\/DanielKulique\//,
    );
});
test('theme persists, storage denial is handled and primary remains active', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  const style = await page.locator('.hero .primary').evaluate((el) => ({
    opacity: getComputedStyle(el).opacity,
    background: getComputedStyle(el).backgroundColor,
  }));
  expect(style.opacity).toBe('1');
  expect(style.background).not.toBe('rgba(0, 0, 0, 0)');
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Blocked');
      },
    }),
  );
  await page.reload();
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
test('language pairs studies, laboratory and section fragments', async ({
  page,
}) => {
  for (const route of ['/projects/pipeline-ans/', '/lab/']) {
    await page.goto(route);
    await page.getByRole('link', { name: /Read in English/ }).click();
    await expect(page).toHaveURL(`/en${route}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).not.toBeEmpty();
  }
  await page.goto('/#about');
  await page.getByRole('link', { name: /Read in English/ }).click();
  await expect(page).toHaveURL('/en/#about');
});
test('skip link, keyboard menu and authorized contact configuration', async ({
  page,
}) => {
  await page.goto('/');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  expect(await skip.evaluate((el) => getComputedStyle(el).clipPath)).not.toBe(
    'none',
  );
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  expect(await skip.evaluate((el) => getComputedStyle(el).clipPath)).toBe(
    'none',
  );
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  const toggle = page.getByRole('button', { name: 'Abrir navegação' });
  if (await toggle.isVisible()) {
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  await page
    .locator('#navigation')
    .getByRole('link', { name: 'Contato', exact: true })
    .click();
  await expect(page).toHaveURL(/#contact/);
  await expect(
    page.locator('#contact a').filter({ hasText: 'LinkedIn' }),
  ).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/daniel-kulique-dos-passos-36a80425a/',
  );
  await expect(
    page.locator('.hero a').filter({ hasText: 'LinkedIn' }),
  ).toHaveCount(1);
  await expect(page.locator('a[href^="mailto:"],a[download]')).toHaveCount(0);
});
test('original layer diagram remains keyboard-accessible below projects', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.architecture-details summary').click();
  const node = page.getByRole('button', { name: /Persistência MySQL/ });
  await expect(node).toBeEnabled();
  await node.focus();
  await page.keyboard.press('Enter');
  await expect(node).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#layer-detail')).toContainText('Transações JDBC');
});
test('case studies expose engineering evidence and run instructions', async ({
  page,
}) => {
  for (const prefix of ['/', '/en/'])
    for (const slug of slugs) {
      const response = await page.goto(`${prefix}projects/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('#evidence')).toBeVisible();
      await expect(page.locator('#execution pre')).not.toBeEmpty();
      await expect(page.locator('#limitations')).not.toBeEmpty();
      expect(await page.locator('main').innerText()).not.toMatch(internalText);
    }
});
test('local A* supports steps, animation, reset and keyboard grid editing', async ({
  page,
}) => {
  await lab(page);
  await page
    .getByRole('button', { name: 'Limpar obstáculos', exact: true })
    .click();
  const first = page.getByRole('gridcell').first();
  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('gridcell').nth(1)).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('gridcell').nth(1)).toHaveAccessibleName(
    /Obstáculo/,
  );
  await page
    .getByRole('button', { name: 'Próximo passo', exact: true })
    .click();
  await expect(page.locator('.lab-metrics dd').first()).toHaveText('1');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await expect(page.locator('.lab-status')).toHaveText('Exploração pausada.');
  await page
    .getByRole('button', { name: 'Reiniciar busca', exact: true })
    .click();
  await expect(page.locator('.lab-status')).toHaveText('Pronto para explorar.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await ready(page);
  await page
    .getByRole('button', { name: 'Limpar obstáculos', exact: true })
    .click();
  await page.getByRole('button', { name: 'Executar A*', exact: true }).click();
  await expect(page.locator('.lab-status')).toHaveText('Caminho encontrado.');
  await expect(page.locator('.lab-metrics dd').nth(1)).toHaveText('16');
  await expect(page.locator('.path-cell.path')).not.toHaveCount(0);
});
test('A* validates endpoint edits and reports an unreachable goal', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await lab(page);
  await page
    .getByRole('button', { name: 'Limpar obstáculos', exact: true })
    .click();
  for (let row = 0; row < 10; row++)
    await page
      .getByRole('gridcell')
      .nth(row * 12 + 5)
      .click();
  await page.getByRole('button', { name: 'Executar A*', exact: true }).click();
  await expect(page.locator('.lab-status')).toHaveText(
    'Não existe caminho entre os pontos.',
  );
  await expect(page.locator('.lab-metrics dd').nth(1)).toHaveText(
    'Sem caminho',
  );
  await page.getByRole('radio', { name: 'Origem', exact: true }).check();
  await page.getByRole('gridcell').nth(5).click();
  await expect(page.getByRole('gridcell').nth(5)).toHaveAccessibleName(
    /Origem/,
  );
  await page.getByRole('radio', { name: 'Destino', exact: true }).check();
  await page.getByRole('gridcell').nth(5).click();
  await expect(page.locator('.path-cell.start')).toHaveCount(1);
  await expect(page.locator('.path-cell.goal')).toHaveCount(1);
});
test('all public routes have no runtime errors, private drafts or editorial placeholders', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404'))
      errors.push(m.text());
  });
  for (const prefix of ['/', '/en/'])
    for (const route of [
      prefix,
      `${prefix}lab/`,
      ...slugs.map((slug) => `${prefix}projects/${slug}/`),
    ]) {
      await page.goto(route);
      await ready(page);
      expect(await page.locator('main').innerText()).not.toMatch(internalText);
    }
  for (const route of [
    '/missing/',
    '/en/missing/',
    '/projects/plataforma-cursos/',
  ]) {
    const res = await page.goto(route);
    expect(res?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      route.startsWith('/en/') ? 'en' : 'pt-BR',
    );
  }
  expect(errors).toEqual([]);
});
test('WCAG AA and horizontal overflow after fonts load in both themes', async ({
  page,
}) => {
  for (const theme of ['dark', 'light']) {
    await page.addInitScript(
      (value) => localStorage.setItem('theme', value),
      theme,
    );
    for (const prefix of ['/', '/en/'])
      for (const route of [
        prefix,
        `${prefix}lab/`,
        ...slugs.map((slug) => `${prefix}projects/${slug}/`),
      ]) {
        await page.goto(route);
        await ready(page);
        if (route.endsWith('lab/')) {
          await page.emulateMedia({ reducedMotion: 'reduce' });
          await page
            .getByRole('button', {
              name: prefix === '/en/' ? 'Run A*' : 'Executar A*',
              exact: true,
            })
            .click();
        }
        const scan = await new AxeBuilder({ page })
          .withTags([
            'wcag2a',
            'wcag2aa',
            'wcag21a',
            'wcag21aa',
            'wcag22a',
            'wcag22aa',
          ])
          .analyze();
        expect(scan.violations, `${theme} ${route}`).toEqual([]);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
          route,
        ).toBeLessThanOrEqual(page.viewportSize()!.width);
      }
  }
});
test('screenshots, printing, metadata and no-JavaScript content', async ({
  page,
  browser,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const prefix of ['/', '/en/']) {
    await page.goto(prefix);
    await ready(page);
    for (const theme of ['dark', 'light']) {
      await page.evaluate(
        (value) => (document.documentElement.dataset.theme = value),
        theme,
      );
      await page.screenshot({
        path: `artifacts/goal02/after/${info.project.name}-${prefix === '/' ? 'pt' : 'en'}-${theme}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    }
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(JSON.parse(schema!)[0]['@type']).toBe('Person');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      'content',
      prefix === '/' ? 'pt_BR' : 'en_US',
    );
  }
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.skip-link')).toBeHidden();
  await expect(page.locator('.site-header')).toBeHidden();
  await page.pdf({
    path: `artifacts/goal02/after/${info.project.name}-print.pdf`,
    format: 'A4',
    printBackground: true,
  });
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto('http://127.0.0.1:4325/');
  await expect(staticPage.locator('.project-card')).toHaveCount(6);
  await expect(staticPage.locator('.filter-bar')).toBeHidden();
  await staticPage.locator('.project-card h3 a').first().click();
  await expect(staticPage.locator('#execution')).not.toBeEmpty();
  await context.close();
});
