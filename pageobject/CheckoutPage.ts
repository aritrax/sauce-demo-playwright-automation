
import {Page , expect, Locator} from "@playwright/test" ;


export class CheckoutPage
{   

    page: Page;
    checkoutButton: Locator;
    fristName : Locator;
    lastName : Locator;
    zipcode : Locator;
    continueButton : Locator;
    finishButton : Locator;
    errormessage : Locator ;
    backpack : Locator ;
    productPrice :Locator ;
    paymentInfo : Locator ;
    shippingInfo : Locator ;
    itemTotal : Locator ;
    tax : Locator ;
    total : Locator ;


    constructor(page: Page)
    {
        this.page = page ;
        this.checkoutButton = page.locator("#checkout") ;
        this.fristName = page.getByPlaceholder("First Name") ;
        this.lastName = page.getByPlaceholder("Last Name") ;
        this.zipcode = page.getByPlaceholder("Zip/Postal Code") ;
        this.continueButton = page.locator("#continue") ;
        this.finishButton = page.locator("#finish")
        this.errormessage = page.locator(".error-message-container.error") ;
        this.backpack = page.locator("[data-test='inventory-item']").filter({ hasText: "Sauce Labs Backpack" });
        this.productPrice = page.locator(".inventory_item_price") ;
        this.paymentInfo = page.locator("[data-test='payment-info-value']") ;
        this.shippingInfo = page.locator("[data-test='shipping-info-value']")
        this.itemTotal = page.locator("[data-test='subtotal-label']");
        this.tax = page.locator("[data-test='tax-label']");
        this.total = page.locator("[data-test='total-label']");
        this.finishButton = page.getByRole('button', {name : "Finish"}) ;
    }

    async verifyCheckoutInformationPage()
    {
        await expect (this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html") ;
    }

    async verifyCheckoutInformationField()
    {
        await expect(this.fristName).toBeVisible() ;
        await expect(this.lastName).toBeVisible() ;
        await expect(this.zipcode).toBeVisible() ;
    }

    async verifyCheckoutInformationValidation()
    {
        await this.fristName.fill("") ;
        await this.lastName.fill("") ;
        await this.zipcode.fill("") ;
        await this.continueButton.click() ;
        await expect (this.errormessage).toBeVisible();
    }

    async checkoutwithValid(fristName: string,lastName : string,pinCode : string)
    {
        await this.fristName.fill(fristName) ;
        await this.lastName.fill(lastName) ;
        await this.zipcode.fill(pinCode) ;
        await this.continueButton.click() ;
        await expect (this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html") ;    
    }

    async checkoutOverviewProduct()
    {
        await expect (this.backpack.locator(".inventory_item_name")).toContainText("Sauce Labs Backpack") ;
        await expect(this.productPrice).toBeVisible() ;    
    }

    async checkoutOverviewPayment()
    {
        await expect(this.paymentInfo).toBeVisible() ;
        await expect(this.shippingInfo).toBeVisible() ;
    }

    async checkoutPriceOverview()
    {
        const itemTotalText = await this.itemTotal.textContent();
        const itemTotal = parseFloat(itemTotalText!.replace("Item total: $", ""));
        const taxText = await this.tax.textContent();
        const tax = parseFloat(taxText!.replace("Tax: $", ""));
        const totalText = await this.total.textContent();
        const total = parseFloat(totalText!.replace("Total: $", ""));
        expect(itemTotal + tax).toBeCloseTo(total, 2);
    }

    async checkoutFinish()
    {
        await this.finishButton.click() ;
    }


    async verifyConfirmation ()
    {
        await expect(this.page.getByText("Thank you for your order!")).toBeVisible() ;

    }
}
