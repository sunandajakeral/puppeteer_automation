import dotenv from "dotenv";
import * as data from "@e2e/testData";
import { launchBrowser } from "@e2e/utils/testUtils";
import LoginPage from "@e2e/pages/LoginPage";
import HomePage from "@e2e/pages/HomePage";

dotenv.config();
const appUrl = process.env.APP_URL;

describe("Login to the application", function () {
  let browser, page, loginPage, homePage;

  before(async () => {
    [browser, page] = await launchBrowser();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.setViewport({
      width: 1200, 
      height: 3072, 
      deviceScaleFactor: 1,
    });
  });

  after(async function () {
    await browser.close();
  });

  it("logs in to moebel-kraft.com with valid credentials", async function () {
    try {
      // Navigate to the login page
      await homePage.navigateToLoginPage(appUrl);

      await homePage.isHomePageDisplayed();

      // Accepts the cookies if the window exists
      await homePage.acceptAllCookies();

      // click login link
      await homePage.clickLoginLink();

      // enter credentials
      await loginPage.enterCredentials(data.EMAIL, data.PASSWORD);

      // Click the login button
      await loginPage.clickLoginButton();

      // Assert that the login was successful
      await homePage.isLoggedIn();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  it("tries to login with empty credentials", async function () {
    try {
      // Navigate to the login page
      await homePage.navigateToLoginPage(appUrl);

      await homePage.isHomePageDisplayed();

      // Accepts the cookies if the window exists
      await homePage.acceptAllCookies();

      // click login link
      await homePage.clickLoginLink();

      // enter credentials
      await loginPage.enterCredentials("", "");

      // Click the login button
      await loginPage.clickLoginButton();

      // validate the login errors
      await loginPage.validateLoginEmailError(data.LOGIN_WITH_EMPTY_EMAIL_ERROR);

      // validate the password errors
      await loginPage.validatePasswordError(data.PASSWORD_ERROR);

    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  it("tries to login with invalid username", async function () {
    try {
      // Navigate to the login page
      await homePage.navigateToLoginPage(appUrl);

      await homePage.isHomePageDisplayed();

      // Accepts the cookies if the window exists
      await homePage.acceptAllCookies();

      // click login link
      await homePage.clickLoginLink();

      // enter credentials
      await loginPage.enterCredentials("username", "password");

      // Click the login button
      await loginPage.clickLoginButton();

      // validate the login errors
      await loginPage.validateLoginEmailError(data.LOGIN_INVALID_EMAIL_ERROR);

    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  it("tries to login with the valid emailid without customer account", async function () {
    try {
      // Navigate to the login page
      await homePage.navigateToLoginPage(appUrl);

      await homePage.isHomePageDisplayed();

      // Accepts the cookies if the window exists
      await homePage.acceptAllCookies();

      // click login link
      await homePage.clickLoginLink();

      // enter credentials
      await loginPage.enterCredentials("name@gmail.com", data.PASSWORD);

      // Click the login button
      await loginPage.clickLoginButton();

      // validate the login errors
      await loginPage.validateLoginEmailError(data.LOGIN_WITHOUT_ACCOUNT_ERROR);

    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
