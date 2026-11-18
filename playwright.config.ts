import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({

    testDir: './test',

    // Test execution
    fullyParallel: true,
    retries: 2,
    timeout: 30 * 1000,

    expect: {
        timeout: 10 * 1000,
    },

    // Reports
    reporter: [
        ['allure-playwright', { resultsDir: 'allure-results' }],
        ['html']
    ],

    // Shared browser settings
    use: {
        headless: true ,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        baseURL : process.env.BASE_URL ,
    },

    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts/,
        },
        
        {
            name: 'chromium',
            use: {
                 ...devices['Desktop Chrome'],
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],
});