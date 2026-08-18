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

test("TC18 Verify Checkout page opens @regression", async({page})=>
{
    const poManager = new POManager(page);
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    const checkoutPage = poManager.getCheckoutPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationPage();

})

test("TC19 Verify checkout information fields @regression" , async({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationField()
})

test("TC20 Verify mandatory field validation @regression" , async ({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.verifyCheckoutInformationValidation()
})

test("TC21 Verify checkout with valid customer information @smoke @regression" , async ({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
})

test("TC22 Verify product information on Checkout Overview @regression" , async ({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutOverviewProduct() ;
})

test("TC23 Verify payment/shipping information @regression" , async ({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutOverviewProduct() ;
    await checkoutPage.checkoutOverviewPayment() ;
})

test("TC24 Verify price calculation @regression", async({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutPriceOverview() ;
}) 

test("TC25 Verify Finish order @smoke @regression", async({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutFinish() ;
})

test("TC26 Verify order confirmation @smoke @regression", async({page})=>
{
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage() ;
    const inventoryPage =poManager.getInventoryPage();
    const cartPage =poManager.getCartPage() ;
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.clickCheckout() ;
    await checkoutPage.checkoutwithValid("ABC","XYZ","711105") ; 
    await checkoutPage.checkoutFinish() ;
    await checkoutPage.verifyConfirmation() ;
})
