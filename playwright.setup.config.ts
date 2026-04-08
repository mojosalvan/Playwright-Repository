import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.setup\.ts/,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL,
    storageState: { cookies: [], origins: [] },
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure',
  },
});