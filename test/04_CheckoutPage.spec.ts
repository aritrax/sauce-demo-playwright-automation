import { test } from "../fixtures/testFixtures";

import dataset from "../loginData/logindata.json" ;
const validUser : any = dataset.find(data => data.expectedResult === "success");

test.beforeEach(async({page})=>
{
     await page.goto('/inventory.html');
})

test("TC18 Verify Checkout page opens @regression", async({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationPage();
})

test("TC19 Verify checkout information fields @regression" , async({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationField()
})

test("TC20 Verify mandatory field validation @regression" , async ({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationValidation()
})

test("TC21 Verify checkout with valid customer information @smoke @regression" , async ({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
})

test("TC22 Verify product information on Checkout Overview @regression" , async ({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutOverviewProduct() ;
})

test("TC23 Verify payment/shipping information @regression" , async ({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutOverviewProduct() ;
    await checkoutPage.checkoutOverviewPayment() ;
})

test("TC24 Verify price calculation @regression", async({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutPriceOverview() ;
}) 

test("TC25 Verify Finish order @smoke @regression", async({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutFinish() ;
})

test("TC26 Verify order confirmation @smoke @regression", async({inventoryPage, cartPage, checkoutPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutFinish() ;
    await checkoutPage.verifyConfirmation() ;
})
