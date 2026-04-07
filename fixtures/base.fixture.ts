import { test as base, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage.ts";
import DashboardPage from '../pages/dasboardPage.ts';
import NavigationComponent from '../components/navigationComponent.ts';
import OrderFlow from '../flows/orderFlow.ts';

export { expect };

interface PageFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
}

interface ComponentFixtures {
  navigationComponent: NavigationComponent;
}

interface OrderFlows {
  orderFlow: OrderFlow;
}


export const test = base.extend<PageFixtures & ComponentFixtures & OrderFlows>( {
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  navigationComponent: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },

  orderFlow: async ({dashboardPage, navigationComponent}, use) => {
    await use(new OrderFlow(dashboardPage, navigationComponent));
  },
})
