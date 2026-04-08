import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: /auth\.setup\.ts/,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL,
    storageState: { cookies: [], origins: [] },
    trace: 'on',
    headless: true,
    screenshot: 'only-on-failure',
  },
});