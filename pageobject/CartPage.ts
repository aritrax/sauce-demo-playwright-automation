import {expect, Locator, Page} from "@playwright/test" ;

export class CartPage
{

    backpack : Locator ;
    bikelight : Locator ;
    tshirt : Locator;
    //addtocartButton : Locator;
    cartButton: Locator;
    cartItem : Locator;
    cartBadge : Locator;
    removebutton : Locator;
    checkoutButton : Locator ;


    constructor(page:Page)
    {
        //add to cart
        this.backpack = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Backpack" });
        this.bikelight = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Bike Light" });
        this.tshirt = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Bolt T-Shirt" });
        //this.addtocartButton = page.locator("#add-to-cart-sauce-labs-backpack") ;

        //verify cart count
        this.cartButton = page.locator("#shopping_cart_container") ;
        this.cartItem = page.locator(".cart_item")
        this.cartBadge = page.locator(".shopping_cart_badge")

        //removebutton 
        this.removebutton = page.getByRole('button' , {name : "Remove"})

        //checkout button 
        this.checkoutButton = page.getByRole('button' , {name : "Checkout"}) ;
    }

    async verifySingleItemInCart()
    {   
        await expect(this.cartItem).toContainText("Sauce Labs Backpack");
        await expect(this.cartBadge).toContainText("1");
    }

    async verifyTwoItemInCart()
    {
        await expect(this.cartBadge).toContainText("2");
        await expect(this.cartItem.first()).toContainText("Sauce Labs Backpack");
        await expect(this.cartItem.last()).toContainText("Sauce Labs Bike Light");
    }
    async verifyCartProductDetails()
    {
        await expect(this.cartItem).toContainText("Sauce Labs Backpack");
        await expect(this.cartItem.locator(".inventory_item_price")).toBeVisible();

    }

    async removeProduct()
    {   
        await expect(this.cartItem).toContainText("Sauce Labs Backpack");
        await this.removebutton.click()
        await expect(this.cartItem).toHaveCount(0)

    }

    async clickCheckout()
    {
        await this.checkoutButton.click() ;
    }
}   


