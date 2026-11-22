/** Six viewport gates run on a dedicated production fixture, never on an already-running development server. */
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 120000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4325',
    trace: 'retain-on-failure',
    colorScheme: 'dark',
  },
  projects: [360, 390, 768, 1024, 1440, 1920].map((width) => ({
    name: `w${width}`,
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width, height: 1000 },
      isMobile: width < 768,
      hasTouch: width < 768,
      deviceScaleFactor: 1,
    },
  })),
  webServer: {
    command: 'node scripts/serve.mjs',
    url: 'http://127.0.0.1:4325',
    env: { PORT: '4325' },
    reuseExistingServer: false,
  },
});
