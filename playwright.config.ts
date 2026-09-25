
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  retries: 2 ,
  /* Run tests in files in parallel */
  timeout: 30* 1000 ,
  expect : {
    timeout: 30* 1000,
  },

  reporter: [
  ['allure-playwright', { resultsDir: 'allure-results' }],
  ['html']
  ],
  projects : [
    /*{
      name : 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on', // off, on
        ...devices['iPhone 17 Pro Max']
      },
    },*/
    {
      name : 'chorme',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        //video: 'on' ,
        ignoreHTTPSErrors : true ,
        permissions : ['geolocation'] ,
        //trace: 'on', // off, on
        viewport : {width:720,height:720}
      },
    },
    /*{
      name : 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'on', // off, on
      },
    }*/
  ],
  
});

