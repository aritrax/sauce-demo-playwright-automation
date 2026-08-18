import {test , expect} from "@playwright/test" ;
import { POManager } from "../pageobject/POManger";

import dataset from "../loginData/logindata.json" ;
import { InventoryPage } from "../pageobject/InventoryPage";
import { CartPage } from "../pageobject/CartPage";
const validUser : any = dataset.find(data => data.expectedResult === "success");

test.beforeEach(async({page})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(validUser.userName, validUser.password) ;
})

test("TC13 Add a single product to cart @smoke @regression" , async({page})=>
{
    const poManager = new POManager(page) ;
    const inventoryPage = poManager.getInventoryPage()
    const cartPage = poManager.getCartPage()
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.verifySingleItemInCart()

})

test("TC14 Add multiple products to cart @smoke @regression" , async({page})=>
{
    const poManager = new POManager(page) ;
    const inventoryPage = poManager.getInventoryPage()
    const cartPage = poManager.getCartPage()
    await inventoryPage.twoItemAddtoCart();
    await cartPage.verifyTwoItemInCart();
})

test("TC15 Verify cart count matches number of added products @regression", async({page})=>
{   
    const poManager = new POManager(page) ;
    const inventoryPage = poManager.getInventoryPage();
    await inventoryPage.threeItemAddtoCart();

})

test("TC16 Verify product details in cart @regression" , async({page})=> 
{
    const poManager = new POManager(page) ;
    const inventoryPage = poManager.getInventoryPage();
    const cartPage = poManager.getCartPage()
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.verifyCartProductDetails()

})

test("TC17 — Remove product from cart @regression", async({page})=>
{
    const poManager = new POManager(page) ;
    const inventoryPage = poManager.getInventoryPage();
    const cartPage = poManager.getCartPage()
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.removeProduct();
})