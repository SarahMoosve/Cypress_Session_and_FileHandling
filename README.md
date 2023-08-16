# Cypress_Session_File_Handling_for_Ecommerce Website
This repository contains E2E tests for an e-commerce website using Cypress with the MOCHA framework. The project follows the Page Object Model (POM) design pattern, ensuring maintainability and scalability of the test suite.
## Project Structure
- E2E Tests:`Session.js` present inside the integration folder covers the end-to-end testing of the ecommerce application 
- Page Object Model: All locators are defined in the integration>pageObject folder:

    - `Session.js` - Contains locators and methods for the session page.

## Session Handling:
- The code defines a custom command `LoginAPI` that authenticates a user via a `POST` request and stores the received token in an `env` variable. In the test case "Logged in local storage", after authentication, the token is set in the browser's local storage before visiting a specific client page. This approach ensures the client page has the necessary authentication token for subsequent operations.

## File Handling

- The code reads and processes data from both XLSX and CSV files related to order invoices. For the XLSX file, it reads the file from a specified path using `cy.readFile()`. The XLSX data is converted into a JSON format using the `XLSX` library. It extracts the "Product Name" and "Invoice Number" from the first row of the downloaded "XLSX" file and compares them with expected values (prodName and invoiceNo).

- For the CSV file, it reads the file similarly using `cy.readFile()`. The CSV data is parsed into a structured format using `neatCSV`. Like the XLSX process, it extracts the "Product Name" and "Invoice Number" from the first row of the downloaded "CSV" file and validates them against expected values.

The purpose is to validate order invoice details from downloaded XLSX and CSV files against expected values.


## Setup & Installation
1. Clone the Repository:

git clone https://github.com/yourUsername/Cypress_Practice_Projects.git
cd Cypress_Practice_Projects
2. Install Dependencies:
```bash
npm install
```
3. Configuration: Ensure your configurations are correctly set in the appropriate .json file inside the fixtures folder.

4. Running the Tests
```bash
npx cypress open
```
After opening, select the desired .js file.

5. Run a Specific test file:
```bash
npx cypress run --spec "add_path_to_project/cypress/integration/UI/name_of_file"
```


