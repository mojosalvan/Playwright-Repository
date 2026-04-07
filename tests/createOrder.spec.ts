import { test, expect } from '../fixtures/base.fixture.ts';
import { products } from '../test-data/products.ts';
import { checkoutData } from '../test-data/checkoutData.ts';

test.describe(() => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate('/client/#/auth/login');
  })

  test('User can add item to cart and complete checkout', async ({ orderFlow }) => {
    await orderFlow.addItemToCart(products.mobile);
    await orderFlow.goToCart();
    await orderFlow.checkout(checkoutData.country);
  })
})