import dotenv from "dotenv";
import { launchBrowser } from "@e2e/utils/testUtils";
import LoginPage from "@e2e/pages/LoginPage";
import HomePage from "@e2e/pages/HomePage";
import CategoryPage from "@e2e/pages/CategoryPage";
import WishlistPage from "@e2e/pages/WishlistPage";

dotenv.config();
const appUrl = process.env.APP_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

describe("Shopping scenario", function () {
  let browser, page, loginPage, homePage, categoryPage, wishlistPage;

  before(async () => {
    [browser, page] = await launchBrowser();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    wishlistPage = new WishlistPage(page);
  });

  after(async function () {
    await browser.close();
  });

  it("adds Products to the Shopping Cart successfully", async function () {
    try {
      await page.setViewport({
        width: 1200, 
        height: 3072, 
        deviceScaleFactor: 1,
      });

      // Navigate to the login page
      await homePage.navigateToLoginPage(appUrl);

      await homePage.isHomePageDisplayed();

      // Accepts the cookies if the window exists
      await homePage.acceptAllCookies();

      // click login link
      await homePage.clickLoginLink();

      // enter credentials
      await loginPage.enterCredentials(username, password);

      // Click the login button
      await loginPage.clickLoginButton();

      // Assert that the login was successful
      await homePage.isLoggedIn();

      // Select the product category
      await homePage.selectProductCategoryMoebel();
      await homePage.selectSubCategoryEckSofas();
      await categoryPage.validateEckSofasPage();

      // add products to wishlist
      await categoryPage.clickAddToWishlist(5);
      await categoryPage.clickWishList();

      // add products to cart
      await wishlistPage.enterZipCode();
      await wishlistPage.addAllToCart();
      await wishlistPage.validateAddedToCartMessage();
      await wishlistPage.clicktoTheCartButton();
      await wishlistPage.validateCart();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
