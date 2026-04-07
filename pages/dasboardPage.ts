import { Page, Locator } from '@playwright/test';

export default class DashboardPage {
  readonly searchInput: Locator;
  readonly addToCartSuccessMessage: Locator;
  readonly productName: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.searchInput = this.page.getByRole('textbox', { name: 'search' });
    this.addToCartSuccessMessage = this.page.getByRole('alert', { name: 'Product Added To Cart' }); 
    this.productName = this.page.locator('.row');
  }

  searchResult(item: string): Locator {
    return this.page.locator('h5').first();
  }

  productTitle(item: string): Locator {
    return this.productName.getByRole('heading', { name: new RegExp(item, 'i') });
  }

  addItemToCart(item: string): Locator {
    return this.page.locator('.card').filter({ hasText: new RegExp(item, 'i') }).getByRole('button', { name: /add to cart/i });
  }

  async searchProduct(item: string): Promise<void> {
    await this.searchInput.fill(item);
    await this.searchInput.press('Enter');
  }
}