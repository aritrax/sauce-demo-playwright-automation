import {test , expect} from "@playwright/test" ;
import { POManager } from "../pageobject/POManger";

import dataset from "../loginData/logindata.json" ;
const validUser : any = dataset.find(data => data.expectedResult === "success");

test.beforeEach(async({page})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(validUser.userName, validUser.password) ;
})

test("TC06 Verify user lands on Inventory page after login @smoke @regression" , async({page})=>
{
    const poManager = new POManager(page);
    const inventoryPage = poManager.getInventoryPage() ;
    await inventoryPage.verifyURL();
})

test("TC07 Verify all products are displayed @smoke @regression", async ({ page }) => {
    const poManager = new POManager(page);
    const inventoryPage = poManager.getInventoryPage();

    await inventoryPage.verifyallInventory()
    
});

test("TC08 Verify product information — name, price, image @regression" , async({page})=>
{
    const poManager = new POManager(page);
    const inventoryPage = poManager.getInventoryPage();
    await inventoryPage.verifyProductDeatils()
})

test("TC09 Verify product details page opens correctly @regression" , async({page})=>
{
    const poManager = new POManager(page);
    const productDeatilsPage = poManager.getProductDetailsPage();
    await productDeatilsPage.viewProductDetails()

})
test("TC10 Verify product sorting — Name A → Z @regression" , async({page})=>
{
    const poManager = new POManager(page);
    const inventoryPage = poManager.getInventoryPage();
    
    await page.getByRole("combobox").selectOption("Name (A to Z)");
    await inventoryPage.sortingA2Z() ;
})
test("TC11 Verify product sorting — Name Z → A @regression" , async({page})=>
{  
    const poManager = new POManager(page);
    const inventoryPage = poManager.getInventoryPage();

    await page.getByRole("combobox").selectOption("Name (Z to A)");
    await inventoryPage.sortingZ2A() ;


})
test("TC12  Verify product sorting — Price Low → High @regression" , async({page})=>
{
    const poManager = new POManager(page);
    const inventoryPage = poManager.getInventoryPage();

    await page.getByRole("combobox").selectOption("Price (low to high)");
    await inventoryPage.sortingPriceL2H() ;

})