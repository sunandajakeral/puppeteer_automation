import * as locators from "../locators";

export default class LoginPage {
  constructor(page) {
    this.page = page;
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

  async waitForLoginForm() {
    await this.page.waitForSelector(locators.loginForm);
  }

  async clickJoinNowButton() {
    // Click the Join Now button
    await this.page.click(locators.joinNowButton);
  }

}
