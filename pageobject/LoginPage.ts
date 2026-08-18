import { Page , Locator } from "@playwright/test";

export class LoginPage
{   

    page: Page;
    Username: Locator;
    Password: Locator;
    LoginButton: Locator;

    constructor(page:Page)
    {
        this.page = page ;
        this.Username = page.getByPlaceholder("Username") ;
        this.Password = page.getByPlaceholder("Password") ;
        this.LoginButton = page.getByRole("button") ;
    }

    async goTo()
    {
        await this.page.goto("https://www.saucedemo.com/") ;
    }

    async validLogin(userName: string,password: string)
    {
        await this.Username.fill(userName);
        await this.Password.fill(password) ;
        await this.LoginButton.click() ;
        await this.page.waitForLoadState('networkidle');
    }
}
