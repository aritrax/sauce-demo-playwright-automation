# Sauce Demo Playwright Automation

A Playwright automation framework built using TypeScript and the Page Object Model (POM) to automate the Sauce Demo e-commerce application.

##  Tech Stack

| Technology | Purpose |
|---|---|
| **Playwright** | Web UI automation and browser testing |
| **TypeScript** | Test scripting and type safety |
| **Node.js** | Runtime environment |
| **Allure** | Test reporting |
| **Git** | Version control |
| **GitHub** | Source code management and portfolio |

##  Application Under Test

**Sauce Demo**

https://www.saucedemo.com/


##  Key Features

- Page Object Model (POM) based framework
- Page Object Manager for centralized page object handling
- Data-driven login testing using JSON test data
- Reusable locators and page-level methods
- Smoke and regression test tagging
- Playwright built-in assertions and auto-waiting
- End-to-end testing across Login, Inventory, Cart and Checkout modules
- Product sorting and cart validation
- Checkout and order confirmation validation
- Playwright HTML reporting
- Allure test reporting
- TypeScript-based automation framework

##  Framework Design

The framework follows the **Page Object Model (POM)** design pattern.

- Each application page has a dedicated Page Object class.
- Locators and page-specific actions are maintained inside the respective Page Object.
- `POManager` provides centralized access to Page Objects.
- Test files contain the test scenarios and validations.
- JSON test data is used for data-driven login testing.
- Playwright assertions are used for validation.
- Smoke and regression tags are used for selective test execution.

##  Framework Structure
```text
sauce-demo-playwright-automation/
│
├── loginData/
│   └── logindata.json
│
├── pageobject/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   ├── POManager.ts
│   └── ProductDetailsPage.ts
│
├── test/
│   ├── 01_LoginPage.spec.ts
│   ├── 02_InventoryPage.spec.ts
│   ├── 03_CartPage.spec.ts
│   └── 04_CheckoutPage.spec.ts
│
├── .gitignore
├── playwright.config2.ts
└── README.md
```

##  Test Coverage

The framework currently contains **26 automated test cases** covering Login, Inventory & Products, Cart, and Checkout workflows.

###  Login — TC01 to TC05

| TC | Test Case | Tag |
|---|---|---|
| TC01 | Valid login | `@smoke @regression` |
| TC02 | Invalid username | `@regression` |
| TC03 | Invalid password | `@regression` |
| TC04 | Locked-out user | `@regression` |
| TC05 | Blank username and password | `@regression` |

###  Inventory & Products — TC06 to TC12

| TC | Test Case | Tag |
|---|---|---|
| TC06 | Verify user lands on Products/Inventory page after login | `@smoke @regression` |
| TC07 | Verify all products are displayed | `@smoke @regression` |
| TC08 | Verify product information — name, price, image | `@regression` |
| TC09 | Verify product details page opens correctly | `@regression` |
| TC10 | Verify product sorting — Name A → Z | `@regression` |
| TC11 | Verify product sorting — Name Z → A | `@regression` |
| TC12 | Verify product sorting — Price Low → High | `@regression` |

###  Cart — TC13 to TC17

| TC | Test Case | Tag |
|---|---|---|
| TC13 | Add a single product to cart | `@smoke @regression` |
| TC14 | Add multiple products to cart | `@smoke @regression` |
| TC15 | Verify cart count matches number of added products | `@regression` |
| TC16 | Verify product details in cart | `@regression` |
| TC17 | Remove a product from cart | `@regression` |

###  Checkout — TC18 to TC26

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

###  Test Suite Summary

| Module | Test Cases | Smoke | Regression |
|---|---:|---:|---:|
| Login | 5 | 1 | 5 |
| Inventory & Products | 7 | 2 | 7 |
| Cart | 5 | 2 | 5 |
| Checkout | 9 | 0 | 9 |
| **Total** | **26** | **5** | **26** |

##  How to Run the Tests

### 1. Clone the Repository

```bash
git clone https://github.com/aritrax/sauce-demo-playwright-automation.git
cd sauce-demo-playwright-automation
```

### 2. Install Dependencies

Install the project dependencies using:

```bash
npm install
```

### 3. Install Playwright Browsers

If Playwright browsers are not already installed:

```bash
npx playwright install
```

### 4. Run All Tests

Run the complete test suite:

```bash
npx playwright test
```

### 5. Run Tests in Headed Mode

To execute the tests with the browser visible:

```bash
npx playwright test --headed
```

### 6. Run a Specific Test File

For example, to run the Login test suite:

```bash
npx playwright test test/01_LoginPage.spec.ts
```

Other test suites can be executed similarly:

```bash
npx playwright test test/02_InventoryPage.spec.ts
npx playwright test test/03_CartPage.spec.ts
npx playwright test test/04_CheckoutPage.spec.ts
```

### 7. Run Smoke Tests

Run only tests tagged with `@smoke`:

```bash
npx playwright test --grep @smoke
```

### 8. Run Regression Tests

Run tests tagged with `@regression`:

```bash
npx playwright test --grep @regression
```

### 9. View Playwright HTML Report

After test execution, open the Playwright HTML report using:

```bash
npx playwright show-report
```

### 10. Generate and Open Allure Report

Generate the Allure report from the test results:

```bash
allure generate allure-results --clean -o allure-report
```

Open the generated Allure report:

```bash
allure open allure-report
```

##  Test Reporting

This project supports both **Playwright HTML Report** and **Allure Report** for test execution analysis.

### Playwright HTML Report

After executing the tests, generate and view the Playwright HTML report:

```bash
npx playwright show-report
```

The report provides:

- Test execution status
- Passed and failed tests
- Test duration
- Error details
- Screenshots and traces when available

### Allure Report

Allure is used for a more detailed and interactive test execution report.

Generate the report:

```bash
allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
allure open allure-report
```

The Allure report provides:

- Test execution summary
- Passed/failed test cases
- Test duration
- Test steps
- Failure details
- Historical execution information when configured


## 👨‍💻 Author

**Aritra Paul**

SDET | Automation Engineer | Playwright | TypeScript