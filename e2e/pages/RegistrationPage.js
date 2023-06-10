import * as locators from "@e2e/locators";

export default class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  async waitForRegisterPageToLoad() {
    await this.page.waitForSelector(locators.registerForm);
  }

  async selectSalutation(salutation) {
    // Select the salutation
    await this.page.select(locators.salutationDropDown, salutation);
  }

  async enterFirstName(firstName) {
    // Enter the firstname
    await this.page.type(locators.firstNameInput, firstName);
  }

  async enterLastName(lastName) {
    // Enter the lastname
    await this.page.type(locators.lastNameInput, lastName);
  }

  async enterEmail(email) {
    // Enter the email address
    await this.page.type(locators.emailInput, email);
  }

  async enterPassword(password) {
    // Enter the password
    await this.page.type(locators.passwordInput, password);
  }

  async enterPasswordAgain(password) {
    // Enter the password
    await this.page.type(locators.repeatPasswordInput, password);
  }

  async acceptTermsConditions() {
    await this.page.$$eval(locators.termsConditionsButton, (elements) => {
      if (elements) {
        elements[1].click();
      }
    });
  }

  async clickRegisterButton() {
    // Click the login button
    await this.page.click(locators.registerButton);
  }
}
