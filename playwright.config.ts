import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  testIgnore: /.*\.setup\.ts/,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL,
    storageState: 'playwright/.auth/user.json',
    headless: true,
    trace: process.env.CI ? 'on' : 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});