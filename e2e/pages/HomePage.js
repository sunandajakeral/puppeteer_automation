import * as locators from "../locators";
import { expect } from "chai";

export default class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage(appUrl) {
    // Navigate to the login page
    await this.page.goto(appUrl);
  }

  async isHomePageDisplayed() {
    await this.page.$eval(locators.headerMenuContainer, (element) => {
      return (
        window.getComputedStyle(element).getPropertyValue("display") !== "none"
      );
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
    await this.page.waitForSelector(locators.loginLink, {
      visible: true,
      clickable: true,
    });
    await this.page.click(locators.loginLink);
  }

  async isLoggedIn() {
    await this.page.waitForSelector(locators.customerAccountLink);
    const element = await this.page.$(locators.customerAccountLink);
    expect(element).to.exist;
  }
}
