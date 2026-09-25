import { defineConfig, devices } from '@playwright/test';

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
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',

            use: {
                browserName: 'chromium',
                viewport: { width: 720, height: 720 },
            },
        },
    ],
});