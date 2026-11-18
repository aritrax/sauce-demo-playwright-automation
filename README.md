# Sauce Demo Playwright Automation

[![Playwright Tests](https://github.com/aritrax/sauce-demo-playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/aritrax/sauce-demo-playwright-automation/actions/workflows/playwright.yml)

A Playwright automation framework built with TypeScript, the Page Object Model and custom fixtures to automate the Sauce Demo e-commerce application.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Playwright** | Web UI automation and browser testing |
| **TypeScript** | Test scripting and type safety |
| **Node.js** | Runtime environment |
| **dotenv** | Environment configuration |
| **GitHub Actions** | Continuous integration |
| **Allure** | Test reporting |
| **Git / GitHub** | Version control and source code management |

## Application Under Test

**Sauce Demo**: https://www.saucedemo.com/

## Key Features

- Page Object Model (POM) with one class per application page
- Custom Playwright fixtures that provide page objects to tests
- Login reuse through a setup project and `storageState`
- Data-driven login testing using JSON test data
- Environment configuration through `.env` (`BASE_URL` and credentials)
- GitHub Actions pipeline that runs the suite and uploads the HTML report
- Smoke and regression test tagging for selective execution
- Playwright built-in assertions and auto-waiting
- End-to-end coverage of Login, Inventory, Cart and Checkout modules
- Product sorting, cart validation, price calculation and order confirmation checks
- Playwright HTML report and Allure report

## Framework Design

- **Page objects.** Each application page has a dedicated class. Locators and page-specific actions live inside it.
- **Fixtures.** `fixtures/testFixtures.ts` extends Playwright's `test` and provides `loginPage`, `inventoryPage`, `productDetailsPage`, `cartPage` and `checkoutPage`. A test asks for the page objects it needs by name, and each one is created per test.
- **Authentication.** A setup project (`test/auth.setup.ts`) logs in once and saves the session to `.auth/user.json`. The `chromium` project depends on it and starts every test already logged in. The login spec opts out, so the real login flow is still tested.
- **Test data.** `loginData/logindata.json` drives the login scenarios: valid user, invalid username, invalid password, locked-out user and blank credentials.
- **Configuration.** `BASE_URL`, `STANDARD_USER` and `STANDARD_PASSWORD` are read from environment variables. Locally they come from `.env`, and in CI from the workflow. `.env` is git-ignored, and `.env.example` lists the required keys.
- **Assertions.** Tests use Playwright's web-first assertions, which retry until the condition is met.
- **Tags.** `@smoke` and `@regression` allow selective runs.

## Framework Structure

```text
sauce-demo-playwright-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI pipeline
├── fixtures/
│   └── testFixtures.ts           # custom test with page object fixtures
├── loginData/
│   └── logindata.json            # data for data-driven login tests
├── pageobject/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── ProductDetailsPage.ts
├── test/
│   ├── auth.setup.ts             # logs in once, saves .auth/user.json
│   ├── 01_LoginPage.spec.ts
│   ├── 02_InventoryPage.spec.ts
│   ├── 03_CartPage.spec.ts
│   └── 04_CheckoutPage.spec.ts
├── .env.example                  # required environment variables
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## Environment Setup

Create a `.env` file in the project root (copy `.env.example`):

```text
BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
```

## How to Run the Tests

```bash
# 1. Clone the repository
git clone https://github.com/aritrax/sauce-demo-playwright-automation.git
cd sauce-demo-playwright-automation

# 2. Install dependencies and browsers
npm install
npx playwright install

# 3. Create .env (see Environment Setup above), then run all tests
npx playwright test
```

| Goal | Command |
|---|---|
| Run all tests | `npx playwright test` |
| Run in headed mode | `npx playwright test --headed` |
| Run in UI mode | `npx playwright test --ui` |
| Run one file | `npx playwright test test/01_LoginPage.spec.ts` |
| Run smoke tests | `npx playwright test --grep @smoke` |
| Run regression tests | `npx playwright test --grep @regression` |
| Open the HTML report | `npx playwright show-report` |
| Generate the Allure report | `allure generate allure-results --clean -o allure-report` |
| Open the Allure report | `allure open allure-report` |

The `setup` project runs automatically before the other tests, so the report shows one extra test for the login step.

## Continuous Integration

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on every push and pull request to `main`. It installs dependencies with `npm ci`, installs the Playwright browsers, runs the suite headless with the environment values supplied in the workflow, and uploads the Playwright HTML report as a build artifact.

## Test Coverage

The framework contains **26 automated test cases** covering Login, Inventory & Products, Cart and Checkout workflows.

| Module | Test Cases | Smoke | Regression |
|---|---:|---:|---:|
| Login | 5 | 1 | 5 |
| Inventory & Products | 7 | 2 | 7 |
| Cart | 5 | 2 | 5 |
| Checkout | 9 | 3 | 9 |
| **Total** | **26** | **8** | **26** |

<details>
<summary><strong>Login (TC01 to TC05)</strong></summary>

| TC | Test Case | Tag |
|---|---|---|
| TC01 | Valid login | `@smoke @regression` |
| TC02 | Invalid username | `@regression` |
| TC03 | Invalid password | `@regression` |
| TC04 | Locked-out user | `@regression` |
| TC05 | Blank username and password | `@regression` |

</details>

<details>
<summary><strong>Inventory & Products (TC06 to TC12)</strong></summary>

| TC | Test Case | Tag |
|---|---|---|
| TC06 | Verify user lands on Products/Inventory page | `@smoke @regression` |
| TC07 | Verify all products are displayed | `@smoke @regression` |
| TC08 | Verify product information: name, price, image | `@regression` |
| TC09 | Verify product details page opens correctly | `@regression` |
| TC10 | Verify product sorting: Name A to Z | `@regression` |
| TC11 | Verify product sorting: Name Z to A | `@regression` |
| TC12 | Verify product sorting: Price Low to High | `@regression` |

</details>

<details>
<summary><strong>Cart (TC13 to TC17)</strong></summary>

| TC | Test Case | Tag |
|---|---|---|
| TC13 | Add a single product to cart | `@smoke @regression` |
| TC14 | Add multiple products to cart | `@smoke @regression` |
| TC15 | Verify cart count matches number of added products | `@regression` |
| TC16 | Verify product details in cart | `@regression` |
| TC17 | Remove a product from cart | `@regression` |

</details>

<details>
<summary><strong>Checkout (TC18 to TC26)</strong></summary>

| TC | Test Case | Tag |
|---|---|---|
| TC18 | Verify Checkout page opens | `@regression` |
| TC19 | Verify checkout information fields | `@regression` |
| TC20 | Verify mandatory field validation | `@regression` |
| TC21 | Verify checkout with valid customer information | `@smoke @regression` |
| TC22 | Verify product information on Checkout Overview | `@regression` |
| TC23 | Verify payment/shipping information | `@regression` |
| TC24 | Verify price calculation | `@regression` |
| TC25 | Verify Finish order | `@smoke @regression` |
| TC26 | Verify order confirmation | `@smoke @regression` |

</details>

## Test Reporting

**Playwright HTML report.** Run `npx playwright show-report` after a test run. It shows execution status, durations, error details, and screenshots and traces when captured. The CI pipeline uploads the same report as a downloadable artifact on every run.

**Allure report.** An interactive report with the execution summary, test steps and failure details. Generate and open it with the commands in the table above.

## Author

**Aritra Paul**

SDET | Automation Engineer | Playwright | TypeScript
