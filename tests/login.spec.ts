import { test, expect } from '../fixtures/base.fixture.js'
import dotenv from 'dotenv'
import { env } from '../utils/env.js' 

dotenv.config();

test.describe('Login without authenticated state', () => {
  test.use({
    storageState: { cookies: [], origins: [],},
  });

	test.beforeEach(async ({ loginPage }) => {
		await loginPage.navigate('/client/#/auth/login');
	})

  test('Valid login redirects to dashboard', async ({ loginPage }) => {
    await loginPage.login({ email: env.USER_EMAIL, password: env.USER_PASSWORD });

    await expect(loginPage.page).toHaveURL(/dashboard/);
  })

  test('Invalid email format shows error', async ({ loginPage }) => {
    await loginPage.login({ email: env.INVALID_EMAIL_FORMAT, password: env.USER_PASSWORD });

    await expect(loginPage.formAuthError).toContainText('*Enter Valid Email');
  })

  test('Invalid password shows error', async ({ loginPage }) => {
    await loginPage.login({ email: env.USER_EMAIL, password: env.INVALID_PASSWORD });
    
    await expect(loginPage.toastError).toContainText(/Incorrect email or password/);
  })

  test('Empty required fields shows validation', async ({ loginPage }) => {
    await loginPage.loginButton.click();

    await expect(loginPage.formAuthError).toContainText('*Email is required');
    await expect(loginPage.formAuthError).toContainText('*Password is required');
  })
})

test.describe('Login without authenticated state',() => {
  test.use({
    storageState: { cookies: [], origins: [], },
  });

	test('Unauthenticated user should not be redirected to dashboard',
    async ({ loginPage }) => {
      await loginPage.navigate('/client/#/dashboard/dash');

      await expect(loginPage.page).not.toHaveURL(/dashboard/);  
    }
  )
})

test.describe('Login with authenticated state', () => {
  test('Authenticated user should be redirected to dashboard page',
    async ({ page }) => {
      await page.goto('/client/#/auth/login');
    })
})