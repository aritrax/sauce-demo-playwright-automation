import { InventoryPage } from "./InventoryPage";
import { LoginPage } from "./LoginPage"; 
import { CheckoutPage } from "./CheckoutPage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartPage } from "./CartPage";
import {Page, test} from "@playwright/test"

export class POManager
{   
    loginPage : LoginPage;
    inventoryPage : InventoryPage;
    cartPage : CartPage ;
    checkoutPage : CheckoutPage
    productDetailsPage : ProductDetailsPage ;
    page: Page;


    constructor(page: Page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.inventoryPage = new InventoryPage(this.page) ;
        this.checkoutPage = new CheckoutPage(this.page) ;
        this.productDetailsPage = new ProductDetailsPage(this.page) ;
        this.cartPage = new CartPage(this.page) ;
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getInventoryPage()
    {
        return this.inventoryPage ; 
    }

    getProductDetailsPage()
    {
        return this.productDetailsPage ;
    }

    getCartPage()
    {
        return this.cartPage ;
    }
    getCheckoutPage()
    {
        return this.checkoutPage ;
    }
}

