import { test, expect } from '../fixtures/base.fixture.js'
import { validUser, invalidEmailFormat, invalidPassword } from '../test-data/userData.ts';

test.describe('Login without authenticated state', () => {
  test.use({
    storageState: { cookies: [], origins: [],},
  });

	test.beforeEach(async ({ loginPage }) => {
		await loginPage.navigate('/client/#/auth/login');
	})

  test('Valid login redirects to dashboard', async ({ loginPage }) => {
    await loginPage.login(validUser);

    await expect(loginPage.page).toHaveURL(/dashboard/);
  })

  test('Invalid email format shows error', async ({ loginPage }) => {
    await loginPage.login(invalidEmailFormat);

    await expect(loginPage.formAuthError).toContainText('*Enter Valid Email');
  })

  test('Invalid password shows error', async ({ loginPage }) => {
    await loginPage.login(invalidPassword);
    
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
      await page.goto('/client/#/auth/login', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/dashboard/);
    })
})