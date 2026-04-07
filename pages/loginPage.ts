import { Page, Locator } from '@playwright/test' 

interface LoginCredentials {
  email: string;
  password: string;
}

export default class LoginPage {
  readonly userEmail: Locator;
  readonly userPassword: Locator;
  readonly loginButton: Locator;
  readonly formAuthError: Locator;
  readonly toastError: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.userEmail = this.page.getByPlaceholder('email@example.com');
    this.userPassword = this.page.getByPlaceholder('enter your passsword');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.formAuthError = this.page.locator('form');
    this.toastError = this.page.locator('#toast-container');
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async login({ email, password }: LoginCredentials): Promise<void> {
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.loginButton.click();
  }
}