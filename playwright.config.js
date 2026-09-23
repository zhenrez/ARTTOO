import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  workers: 1,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1 --directory .',
    url: 'http://127.0.0.1:4173/web/index.html',
    reuseExistingServer: false,
    timeout: 10000,
  },
});
