import { test as base , expect } from "@playwright/test"
import { LoginPage } from '../pageobject/LoginPage'
import { InventoryPage } from '../pageobject/InventoryPage'
import { CartPage } from '../pageobject/CartPage'
import { CheckoutPage } from '../pageobject/CheckoutPage'
import { ProductDetailsPage } from '../pageobject/ProductDetailsPage'

type Fixtures = {
  loginPage: LoginPage
  inventoryPage: InventoryPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
  productDetailsPage: ProductDetailsPage
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
    },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page))
  },
})
export { expect }