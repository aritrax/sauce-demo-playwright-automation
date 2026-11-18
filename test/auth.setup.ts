import { test as setup, expect } from '../fixtures/testFixtures'

const authFile = '.auth/user.json'

setup('authenticate', async ({ loginPage, page }) => {
  await loginPage.goTo()
  await loginPage.validLogin(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!)
  await expect(page).toHaveURL(/inventory/)

  await page.context().storageState({ path: authFile })
})