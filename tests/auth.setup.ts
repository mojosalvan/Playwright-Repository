import fs from 'fs';
import path from 'path';
import { test as setup, expect } from '@playwright/test';

const authFile = path.join(process.cwd(), 'playwright', '.auth', 'user.json');

setup('authenticated page setup', async ({ page, request }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const loginResponse = await request.post(`${process.env.API_URL}/auth/login`, {
    data: {
      userEmail: process.env.USER_EMAIL,
      userPassword: process.env.USER_PASSWORD,
    },
  });

  expect(loginResponse.ok()).toBeTruthy();

  const body = await loginResponse.json();
  const token = body.token;

  await page.goto('/');
  await page.evaluate((value: string) => {
    localStorage.setItem('token', value);
  }, token);

  await page.context().storageState({ path: authFile });
});