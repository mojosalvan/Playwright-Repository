import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 30_000,
  globalTimeout: 10_000 * 1000,
  testDir: './tests',
  testIgnore: /auth\.setup\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['github'], ['html']] : [['list'], ['html']],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL,
    storageState: 'playwright/.auth/user.json',
    trace: process.env.CI ? 'on' : 'retain-on-failure',
    headless: true,
    screenshot: 'only-on-failure',
  },
});