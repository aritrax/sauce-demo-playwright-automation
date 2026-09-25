import { test } from "../fixtures/testFixtures";

import dataset from "../loginData/logindata.json" ;
const validUser : any = dataset.find(data => data.expectedResult === "success");

test.beforeEach(async({poManager})=>
{
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(validUser.userName, validUser.password) ;
})

test("TC18 Verify Checkout page opens @regression", async({poManager})=>
{
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    const checkoutPage = poManager.getCheckoutPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationPage();

})

test("TC19 Verify checkout information fields @regression" , async({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationField()
})

test("TC20 Verify mandatory field validation @regression" , async ({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationValidation()
})

test("TC21 Verify checkout with valid customer information @smoke @regression" , async ({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
})

test("TC22 Verify product information on Checkout Overview @regression" , async ({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutOverviewProduct() ;
})

test("TC23 Verify payment/shipping information @regression" , async ({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutOverviewProduct() ;
    await checkoutPage.checkoutOverviewPayment() ;
})

test("TC24 Verify price calculation @regression", async({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutPriceOverview() ;
}) 

test("TC25 Verify Finish order @smoke @regression", async({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutFinish() ;
})

test("TC26 Verify order confirmation @smoke @regression", async({poManager})=>
{
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutFinish() ;
    await checkoutPage.verifyConfirmation() ;
})
