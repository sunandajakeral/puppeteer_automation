import * as locators from "../locators";

export default class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage(appUrl) {
    // Navigate to the login page
    await this.page.goto(appUrl);
  }

  async isHomePageDisplayed(){
    await this.page.$eval(locators.headerMenuContainer, (element) => {
      return window.getComputedStyle(element).getPropertyValue('display') !== 'none';
    });
  }

  async acceptAllCookies() {
    // Accepts the cookies if the window exists
    await this.page.$eval(locators.acceptAllButton, (element) => {
      if (element) {
        element.click();
      }
    });
  }

  async clickLoginLink() {
    await this.page.waitForSelector(locators.loginLink);
    await this.page.click(locators.loginLink);
  }

  async enterCredentials(username, password) {
    await this.page.waitForSelector(locators.loginForm);

    // Enter the username and password
    await this.page.type(locators.loginEmailInput, username);
    await this.page.type(locators.loginPasswordInput, password);
  }

  async clickLoginButton() {
    // Click the login button
    await this.page.click(locators.loginButton);
  }

  async clickJoinNowButton() {
    // Click the Join Now button
    await this.page.click(locators.joinNowButton);
  }

}
