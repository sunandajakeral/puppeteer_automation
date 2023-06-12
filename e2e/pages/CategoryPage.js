import * as locators from "@e2e/locators";
import { expect } from "chai";

export default class CategoryPage {
  constructor(page) {
    this.page = page;
  }

  async validateEckSofasPage() {
    const currentURL = this.page.url();
    expect(currentURL).to.include("/ecksofas");
  }

  async clickAddToWishlist(numberOfProducts) {
    // Click the AddToWishlist
    await this.page.waitForSelector(locators.addToWishlist);

    const elements = await this.page.$$(locators.addToWishlist);
    if (elements.length > 0) {
      for (let i = 0; i < numberOfProducts; i++) {
        await elements[i].click();
      }
    }
  }

  async clickWishList() {
    // Click Wishlist link
    await this.page.waitForSelector(locators.wishListLink);

    const elements = await this.page.$$(locators.wishListLink);
    if (elements.length > 0) {
      await elements[0].click();
    }
  }
}
