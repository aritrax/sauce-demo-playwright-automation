import {expect, Locator, Page} from "@playwright/test" ;

export class ProductDetailsPage
{
    backpack: Locator;
    productName: Locator;
    productDes: Locator;
    productPrice: Locator;
    productCartButton: Locator;
    productImage: Locator ; 

    constructor(page:Page)
    {
        this.backpack = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Backpack" });
        // product details 
        this.productName = page.getByText("Sauce Labs Backpack") ;
        this.productDes = page.locator("[data-test='inventory-item-desc']") ;
        this.productPrice = page.locator(".inventory_details_price") ;
        this.productCartButton = page.locator("#add-to-cart") ;
        this.productImage = page.locator("img.inventory_details_img")
    }
    
    async viewProductDetails()
    {
        await this.backpack.locator(".inventory_item_name").click() ;
        await expect(this.productName).toContainText("Sauce Labs Backpack") ;
        await expect(this.productDes).toBeVisible();
        await expect(this.productPrice).toBeVisible();

    }
}

