import {expect, Locator, Page} from "@playwright/test" ;

export class InventoryPage
{   

    page: Page
    products: Locator;
    backpack: Locator;
    bikelight: Locator;
    tshirt : Locator;
    cartButton: Locator;
    cartCount : Locator;
    cartBadge : Locator;
    addtocartButton : Locator;

    constructor(page:Page)
    {
        this.page = page ;
        
        //Verify inventory
        this.products = page.locator("[data-test='inventory-item']");

        //add to cart
        this.backpack = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Backpack" });
        this.bikelight = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Bike Light" });
        this.tshirt = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Bolt T-Shirt" });
        this.addtocartButton = page.locator("#add-to-cart-sauce-labs-backpack") ;

        //verify cart count
        this.cartButton = page.locator("#shopping_cart_container") ;
        this.cartCount = page.locator(".cart_item")
        this.cartBadge = page.locator(".shopping_cart_badge")
    }

    async verifyURL()
    {
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    async verifyallInventory()
    {
        await expect(this.products).toHaveCount(6);
    }

    async verifyProductDeatils()
    {
        await expect (this.backpack.locator(".inventory_item_name")).toBeVisible() ;
        await expect (this.backpack.locator(".inventory_item_price")).toBeVisible() ;
        await expect (this.backpack.getByRole("img")).toBeVisible() ;
        await expect(this.addtocartButton).toBeVisible() ;
    }

    async sortingA2Z()
    {   
        var names : string[] = [] ;
        const count : any = await this.products.count()
        for (var i = 0 ; i  < count ; i++)
        {
        const text = await this.products.locator(".inventory_item_name").nth(i).textContent()
        if (text) {
            names.push(text) ;
        }
        }
        var actualNames = names
        const expectedNames = [...names].sort(); // Create a copy and sort it
       // Compare arrays properly
        expect(JSON.stringify(actualNames) === JSON.stringify(expectedNames)).toBeTruthy();
    }

    async sortingZ2A()
    {   
        var names : string[] = [] ;
        const count : any = await this.products.count()
        for (var i = 0 ; i  < count ; i++)
        {
        const text = await this.products.locator(".inventory_item_name").nth(i).textContent()
        if (text) {
            names.push(text) ;
        }
        }
        var actualNames = names 
        const expectedNames = [...names].sort().reverse(); // Create a copy and sort it
       // Compare arrays properly
        expect(JSON.stringify(actualNames) === JSON.stringify(expectedNames)).toBeTruthy();
    }

    async sortingPriceL2H()
    {   
        var price : string[] = [] ;
        const count : any = await this.products.count()
        for (var i = 0 ; i  < count ; i++)
        {
        const text = await this.products.locator(".inventory_item_price").nth(i).textContent()
        if (text) {
            price.push(text) ;
        }
        }
        var actualPrice = price 
        const expectedPrice = [...price].sort((a, b) => 
        {
            const numA = parseFloat(a.replace('$', ''));
            const numB = parseFloat(b.replace('$', ''));
            return numA - numB;
        });
       // Compare arrays properly
        expect(JSON.stringify(expectedPrice) === JSON.stringify(actualPrice)).toBeTruthy();
    }


    async singleItemAddtoCart()
    {
       await this.backpack.getByRole('button' , { name: "Add to cart" }).click();
       await this.cartButton.click() ;
       
    }

    async twoItemAddtoCart()
    {
        await this.backpack.getByRole('button' , { name: "Add to cart" }).click();
        await this.bikelight.getByRole('button' , { name: "Add to cart" }).click();
        await this.cartButton.click() ;
    }

    async threeItemAddtoCart()
    {
        await this.backpack.getByRole('button' , { name: "Add to cart" }).click();
        await this.bikelight.getByRole('button' , { name: "Add to cart" }).click();
        await this.tshirt.getByRole('button' , { name: "Add to cart" }).click();
        await expect(this.cartBadge).toContainText("3");
    }
}
