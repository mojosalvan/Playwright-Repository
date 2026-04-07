import { Page, Locator, expect } from '@playwright/test';

export default class NavigationComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly ordersLink: Locator;
  readonly cartLink: Locator;
  readonly signoutLink: Locator;
  readonly checkoutButton: Locator;
  readonly inputCountry: Locator;
  readonly countryOption: Locator;
  readonly placeOrderLink: Locator;
  readonly orderConfirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = this.page.getByRole('listitem').getByRole('button', { name: /home/i });
    this.ordersLink = this.page.getByRole('listitem').getByRole('button', { name: /order/i });
    this.cartLink = this.page.getByRole('listitem').getByRole('button', { name: /cart/i });
    this.signoutLink = this.page.getByRole('listitem').getByRole('button', { name: /sign out/i });

    this.checkoutButton = this.page.getByRole('button', { name: /checkout/i });
    this.inputCountry = this.page.getByPlaceholder('Select Country');
    this.countryOption = this.page.locator('.list-group').getByRole('button');
    this.placeOrderLink = this.page.getByText(/place order/i);
    this.orderConfirmationHeader = this.page.getByRole('heading', { name: /Thankyou for/i });
  }
  // ====================== Home page Components ======================

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }
  // ====================== Orders page Components ======================
  async goToOrders(): Promise<void> {
    await this.ordersLink.click();
  }
  // ====================== Cart page Components ======================
  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/i);
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartLink.textContent();
    return Number(text?.match(/\d+/)?.[0] ?? 0);
  }

  myCart(item: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(item, 'i') });
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async inputShippingInfo(country: string): Promise<void> {
    const countryOption = this.countryOption.filter({ hasText: /India$/ });

    await this.inputCountry.pressSequentially(country);

    await expect(countryOption).toBeVisible();

    await countryOption.click();
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderLink.click();
  }

  orderConfirmation(): Locator {
    return this.orderConfirmationHeader;
  }

  // ====================== Signout Components ======================
  async signout(): Promise<void> {
    await this.signoutLink.click();
  }
}