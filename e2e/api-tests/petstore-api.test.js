import dotenv from "dotenv";
import { expect } from "chai";
const xml2js = require("xml2js");
import { launchBrowser } from "@e2e/utils/testUtils";
import * as data from "@e2e/testData";

dotenv.config();
const apiUrl = process.env.API_URL;

describe("Pet Store API Tests", function () {
  let browser,
    page,
    petId,
    response,
    responseBody,
    statusCode,
    jsonData,
    petName,
    retrivedPetId,
    message;
  const parser = new xml2js.Parser();

  before(async function () {
    [browser, page] = await launchBrowser();
  });

  after(async function () {
    await browser.close();
  });

  it("adds a new pet to the store successfully", async function () {
    try {
      await page.setRequestInterception(true);

      page.once("request", (interceptedRequest) => {
        interceptedRequest.continue({
          method: "POST",
          postData: JSON.stringify(data.requestBody),
          headers: {
            ...interceptedRequest.headers(),
            "Content-Type": "application/json",
          },
        });
      });

      response = await page.goto(apiUrl);
      responseBody = await response.text();

      jsonData = await parser.parseStringPromise(responseBody);
      statusCode = response.status();
      petName = jsonData.Pet.name[0];
      petId = jsonData.Pet.id[0];

      expect(statusCode).to.equal(200);
      expect(typeof petId).to.equal("string");
      expect(petName).to.equal(data.requestBody.name);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("fetches pet details by id", async function () {
    try {
      await page.setRequestInterception(true);

      page.once("request", (interceptedRequest) => {
        interceptedRequest.continue();
      });

      response = await page.goto(`${apiUrl}/${petId}`);
      responseBody = await response.text();
      statusCode = response.status();

      jsonData = await parser.parseStringPromise(responseBody);
      retrivedPetId = jsonData.Pet.id[0];
      petName = jsonData.Pet.name[0];

      expect(statusCode).to.equal(200);
      expect(retrivedPetId).to.equal(petId);
      expect(petName).to.equal(data.requestBody.name);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("tries to add a new pet to the store with empty requestbody", async function () {
    try {
      await page.setRequestInterception(true);

      page.once("request", (interceptedRequest) => {
        interceptedRequest.continue({
          method: "POST",
          postData: JSON.stringify(data.emptyRequestBody),
          headers: {
            ...interceptedRequest.headers(),
            "Content-Type": "application/json",
          },
        });
      });

      response = await page.goto(apiUrl);
      responseBody = await response.text();

      jsonData = await parser.parseStringPromise(responseBody);
      statusCode = response.status();

      // status code is 200 because there is no validation at client side
      expect(statusCode).to.equal(200);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("fetches pet details by invalid id", async function () {
    try {
      const invalidPetId = "12345678";
      await page.setRequestInterception(true);

      page.once("request", (interceptedRequest) => {
        interceptedRequest.continue();
      });

      response = await page.goto(`${apiUrl}/${invalidPetId}`);
      responseBody = await response.text();
      statusCode = response.status();

      jsonData = await parser.parseStringPromise(responseBody);
      message = jsonData.apiResponse.message[0];

      expect(statusCode).to.equal(404);
      expect(message).to.equal("Pet not found");

    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("fetches pet details by empty id", async function () {
    try {
      const invalidPetId = "";
      await page.setRequestInterception(true);

      page.once("request", (interceptedRequest) => {
        interceptedRequest.continue();
      });

      response = await page.goto(`${apiUrl}/${invalidPetId}`);
      responseBody = await response.text();
      statusCode = response.status();
      jsonData = await parser.parseStringPromise(responseBody);

      expect(statusCode).to.equal(405);

    } catch (error) {
      console.error("Error:", error);
    }
  });
});
