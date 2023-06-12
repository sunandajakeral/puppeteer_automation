import dotenv from "dotenv";
import { expect } from "chai";
const xml2js = require("xml2js");
import { launchBrowser } from "@e2e/utils/testUtils";

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
    retrivedPetId;
  const parser = new xml2js.Parser();
  const requestBody = {
    id: 0,
    category: {
      id: 0,
      name: "animals",
    },
    name: "doggie",
    photoUrls: ["https://example.com"],
    tags: [
      {
        id: 0,
        name: "mypet",
      },
    ],
    status: "available",
  };

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
          postData: JSON.stringify(requestBody),
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
      expect(petName).to.equal(requestBody.name);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
