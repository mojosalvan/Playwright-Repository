import { expect } from '@playwright/test';
import DashboardPage from '../pages/dasboardPage.ts';
import NavigationComponent from '../components/navigationComponent.ts';

export default class OrderFlow {
  constructor(
    private dashboardPage: DashboardPage,
    private navigationComponent: NavigationComponent,
  ) {}

  async addItemToCart(item: string) {
    const beforeCount = await this.navigationComponent.getCartCount();

    await this.dashboardPage.searchProduct(item);

    await expect(this.dashboardPage.searchResult(item)).toContainText(new RegExp(item, 'i'));

    await this.dashboardPage.addItemToCart(item).click();

    await expect(this.dashboardPage.addToCartSuccessMessage).toHaveText('Product Added To Cart');

    const afterCount = await this.navigationComponent.getCartCount();

    expect(afterCount).toBe(beforeCount + 1);

    await expect(this.navigationComponent.myCart(item)).toContainText(new RegExp(item, 'i'));
  }

  async goToCart() {
    await this.navigationComponent.goToCart(),
    await expect(this.navigationComponent.page).toHaveURL(/cart/);
  }

  async checkout(country: string) {
    await this.navigationComponent.checkout();

    await this.navigationComponent.inputShippingInfo(country);

    await this.navigationComponent.placeOrder();

    await expect(this.navigationComponent.orderConfirmationHeader).toContainText('Thankyou for the order.');
  }
}