import { test as setup, expect } from '@playwright/test'
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authecticated page setup', async ({ page, request }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

   const apiContext = await request.post(`${process.env.API_URL}/auth/login`,{
      data: {
        userEmail: process.env.USER_EMAIL,
        userPassword: process.env.USER_PASSWORD,
      },
    });

    expect((apiContext).ok()).toBeTruthy();

    const body = await apiContext.json();

    const token = body.token;

    await page.goto('/');
    await page.evaluate((value: string) => {
      localStorage.setItem('token', value)
    },token);

    await page.context().storageState({ path: authFile });
})