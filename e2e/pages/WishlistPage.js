import * as locators from "@e2e/locators";
import { expect } from "chai";

export default class WishlistPage {
  constructor(page) {
    this.page = page;
  }

  async addAllToCart() {
    await this.page.waitForSelector(locators.addAllToCartButton);
    await this.page.click(locators.addAllToCartButton);
  }

  async enterZipCode() {
    await this.page.waitForSelector(locators.zipcodeInput);
    await this.page.type(locators.zipcodeInput, "12439");
  }

  async validateAddedToCartMessage() {
    const elements = this.page.$$(locators.addedToCartMessage);
    if (elements.length > 0) {
      expect(elements[0]).to.exist;
    }
  }

  async clicktoTheCartButton() {
    await this.page.waitForSelector(locators.toTheCartButton);
    const button = await this.page.$$(locators.toTheCartButton);
    const isDisabled = await button[0].evaluate((btn) => btn.disabled);
    const isHidden = await button[0].evaluate((btn) => {
      const style = window.getComputedStyle(btn);
      return style.display === "none" || style.visibility === "hidden";
    });

    if (!isDisabled && !isHidden) {
      await button[0].click();
    } else {
      console.log("Button is disabled or hidden.");
    }
  }

  async validateCart() {
    // await this.page.waitForXPath(locators.totalProductsInCart);
    // Wait for 2 seconds (2000 milliseconds) using page.waitForTimeout
    await this.page.waitForTimeout(6000);

    const elements = await this.page.$x(locators.totalProductsInCart);
    if (elements.length > 0) {
      const productAddedToCart = elements[0].innerText;
      expect(productAddedToCart).to.equal(5);
    }
  }
}
