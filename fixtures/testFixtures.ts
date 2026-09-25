import { test as base } from "@playwright/test";
import { POManager } from "../pageobject/POManger";

type Fixtures = {
    poManager: POManager;
};

export const test = base.extend<Fixtures>({
    poManager: async ({ page }, use) => {
        const poManager = new POManager(page);
        await use(poManager);
    },
})