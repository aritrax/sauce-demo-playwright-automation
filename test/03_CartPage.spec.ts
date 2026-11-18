import { test , expect } from "../fixtures/testFixtures";

import dataset from "../loginData/logindata.json" ;
const validUser : any = dataset.find(data => data.expectedResult === "success");

test.beforeEach(async({page})=>
{
    await page.goto('/inventory.html');
})

test("TC13 Add a single product to cart @smoke @regression" , async({inventoryPage, cartPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.verifySingleItemInCart()
})

test("TC14 Add multiple products to cart @smoke @regression" , async({inventoryPage, cartPage})=>
{
    await inventoryPage.twoItemAddtoCart();
    await cartPage.verifyTwoItemInCart();
})

test("TC15 Verify cart count matches number of added products @regression", async({inventoryPage})=>
{   
    await inventoryPage.threeItemAddtoCart();
})

test("TC16 Verify product details in cart @regression" , async({inventoryPage, cartPage})=> 
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.verifyCartProductDetails()

})

test("TC17 — Remove product from cart @regression", async({inventoryPage, cartPage})=>
{
    await inventoryPage.singleItemAddtoCart() ;
    await cartPage.removeProduct();
})