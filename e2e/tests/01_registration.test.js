import dotenv from "dotenv";
import * as data from "../testData";
import { launchBrowser } from "e2e/utils/testUtils";
import LoginPage from "@e2e/pages/LoginPage";
import HomePage from "@e2e/pages/HomePage";
import RegistrationPage from "@e2e/pages/RegistrationPage";

dotenv.config();
const appUrl = process.env.APP_URL;

describe("Register a New user", function () {
  let browser, page, loginPage, registrationPage, homePage;

  before(async () => {
    [browser, page] = await launchBrowser();
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);
    homePage = new HomePage(page);
  });

  after(async function () {
    await browser.close();
  });

  it("registers a new user with valid details", async function () {
    try {
      // Navigate to the login page
      await homePage.navigateToLoginPage(appUrl);

      await homePage.isHomePageDisplayed();

      // Accepts the cookies if the window exists
      await homePage.acceptAllCookies();

      // click login link
      await homePage.clickLoginLink();
      await loginPage.waitForLoginForm();

      // click joinNow button
      await loginPage.clickJoinNowButton();

      // Enter the details on registration page
      await registrationPage.waitForRegisterPageToLoad();
      await registrationPage.selectSalutation(data.SALUTATION);
      await registrationPage.enterFirstName(data.FIRST_NAME);
      await registrationPage.enterLastName(data.LAST_NAME);
      await registrationPage.enterEmail(data.EMAIL);
      await registrationPage.enterPassword(data.PASSWORD);
      await registrationPage.enterPasswordAgain(data.PASSWORD);
      await registrationPage.acceptTermsConditions();
      await registrationPage.clickRegisterButton();

      // Assert that the login was successful
      await homePage.isLoggedIn();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
