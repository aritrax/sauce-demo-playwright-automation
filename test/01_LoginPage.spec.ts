import { test , expect } from "../fixtures/testFixtures";

test.use({ storageState: { cookies: [], origins: [] } })

import dataset from "../loginData/logindata.json" ;

for (const data of dataset)
{
    test(`${data.testcase} Login Test ${data.userName} ${data.tag}` , async({loginPage,page})=>
    {
        await loginPage.goTo();
        await loginPage.validLogin(data.userName,data.password) ;
        if (data.expectedResult === "success") 
            {
                await expect(page).toHaveURL(/inventory.html/);
                
            }
        else 
            {
                await expect(page.locator("[data-test='error']")).toBeVisible();
                const errorMessage : any = await page.locator("[data-test='error']").textContent() ;
                console.log(errorMessage);
            }
        
    })
}