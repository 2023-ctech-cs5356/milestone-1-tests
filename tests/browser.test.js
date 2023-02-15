import { resolve } from "path";
import { writeFileSync, mkdirSync } from "fs";
import { diffStringsUnified } from "jest-diff";

const timeout = 15000;
let errors = [];
let cwd = resolve(__dirname);
mkdirSync(`${cwd}/images`);

beforeAll(async () => {
  await page.goto(URL, { waitUntil: "networkidle0" });
  await page.setViewport({ width: 1080, height: 1080 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: `${cwd}/images/screenshot.png`,
    fullPage: true,
  });
});

afterAll(async () => {
  let commentBody = "";
  if (errors.length > 0) {
    commentBody = commentBody + `## Errors \n`;
    errors.forEach((element, idx) => {
      commentBody = commentBody + `${idx + 1}. ${element} \n`;
    });
  } else {
    commentBody = commentBody + `No errors found!\n`;
  }
  let base64commentBodytr = new Buffer.from(commentBody).toString("base64");
  writeFileSync(`${cwd}/errors.txt`, base64commentBodytr);
});

describe("BK Pets | Title", () => {
  test(
    "Page title should exist",
    async () => {
      const title = await page.title();
      try {
        expect(title).toBeTruthy();
      } catch (error) {
        handleError(
          errors,
          "Does not contain a title. Please add a <title> tag to the page's <head> section."
        );
      }
    },
    timeout
  );
  test(
    "Page title should be 'BK PETS'",
    async () => {
      const title = await page.title();
      let expectedValue = "BK PETS";
      try {
        expect(title).toBe("BK PETS");
      } catch (error) {
        handleError(
          errors,
          `The provided title is not correct. Please make sure the title is 'BK PETS'.`,
          expectedValue,
          title
        );
      }
    },
    timeout
  );
});

describe("BK PETS | Hero Section", () => {
  test(
    "Hero Section should exist",
    async () => {
      const sections = await page.$("#HeroSideImageRight");
      try {
        expect(sections).toBeTruthy();
      } catch (error) {
        handleError(
          errors,
          `Does not contain a Hero Section. Please add a <section> tag with an id of 'HeroSideImageRight' to the page's <body> section.`
        );
      }
    },
    timeout
  );
  test(
    "Hero Section should contain an element with id='hero-text' with the text 'The best products for your dog'",
    async () => {
      const heroText = await page.$("#hero-text");
      let value = await page.evaluate((el) => el.textContent, heroText);
      let expectedValue = "The best products for your dog";
      try {
        expect(value).toBe("The best products for your dog");
      } catch (error) {
        handleError(
          errors,
          `The provided text is not correct. Please make sure the text is 'The best products for your dog'.`,
          expectedValue,
          value
        );
      }
    },
    timeout
  );
});

describe("Products Section", () => {
  test(
    "Products Section should exist",
    async () => {
      const sections = await page.$("#FeatureList");
      try {
        expect(sections).toBeTruthy();
      } catch (error) {
        handleError(
          errors,
          "Does not contain a Products Section. Please add a <section> tag with an id of 'FeatureList' to the page's <body> section."
        );
      }
    },
    timeout
  );
  test(
    "Products Section's carousel should have the previous button with an id of 'previousButton'",
    async () => {
      const previousButton = await page.$("#previousButton");
      try {
        expect(previousButton).toBeTruthy();
      } catch (error) {
        handleError(
          errors,
          "Does not contain a previous button. Please add a <button> tag with an id of 'previousButton' to the Products Section's carousel."
        );
      }
    },
    timeout
  );
  test(
    "Products Section's carousel should have the next button with an id of 'nextButton'",
    async () => {
      const nextButton = await page.$("#nextButton");
      try {
        expect(nextButton).toBeTruthy();
      } catch (error) {
        handleError(
          errors,
          "Does not contain a next button. Please add a <button> tag with an id of 'nextButton' to the Products Section's carousel."
        );
      }
    },
    timeout
  );
  test(
    "Clicking the previous button moves the carousel to the left",
    async () => {
      const productTitleElement = await page.$("#product-title");
      let productTitle = await page.evaluate(
        (el) => el.textContent,
        productTitleElement
      );
      const previousButton = await page.$("#previousButton");
      await previousButton.evaluate((el) => el.click());
      let newProductTitle = await page.evaluate(
        (el) => el.textContent,
        productTitleElement
      );
      try {
        expect(newProductTitle).not.toBe(productTitle);
      } catch (error) {
        handleError(
          errors,
          "The carousel does not move to the left when the previous button is clicked. Please make sure the previous button is working correctly."
        );
      }
    },
    timeout
  );
  test(
    "Clicking the next button moves the carousel to the right",
    async () => {
      const productTitleElement = await page.$("#product-title");
      let productTitle = await page.evaluate(
        (el) => el.textContent,
        productTitleElement
      );
      const nextButton = await page.$("#nextButton");
      await nextButton.evaluate((el) => el.click());
      let newProductTitle = await page.evaluate(
        (el) => el.textContent,
        productTitleElement
      );
      try {
        expect(newProductTitle).not.toBe(productTitle);
      } catch (error) {
        handleError(
          errors,
          "The carousel does not move to the right when the next button is clicked. Please make sure the next button is working correctly."
        );
      }
    },
    timeout
  );
  test(
    "Buy Now Button should exist",
    async () => {
      const buyNow = await page.$("#buy-now-button");
      try {
        expect(buyNow).toBeTruthy();
      } catch (error) {
        handleError(
          errors,
          "Does not contain a Buy Now button. Please add a <button> tag with an id of 'buy-now-button' to the Products Section's carousel."
        );
      }
    },
    timeout
  );
  test(
    "Buy Now Button should not be disabled",
    async () => {
      const isDisabled = await page.$eval(
        "#buy-now-button",
        (btn) => btn.disabled
      );
      try {
        expect(isDisabled).toBe(false);
      } catch (error) {
        handleError(
          errors,
          "The Buy Now button is disabled. Please make sure the button is not disabled."
        );
      }
      expect(isDisabled).toBe(false);
    },
    timeout
  );
  test(
    "Buy Now Button should have a text that says 'Buy Now'",
    async () => {
      const buyNow = await page.$("#buy-now-button");
      let value = await page.evaluate((el) => el.textContent, buyNow);
      try {
        expect(value).toBe("Buy Now");
      } catch (error) {
        handleError(
          errors,
          `The provided text is not correct. Please make sure the text is 'Buy Now'`,
          "Buy Now",
          value
        );
      }
    },
    timeout
  );
  test(
    "Buy Now Button redirects to Stripe Checkout",
    async () => {
      {
        /* uncomment if we actually need to navigate to the next page */
      }
      // const buyNow = await page.$("#buy-now-button");
      // await Promise.all([
      //   buyNow.evaluate((el) => el.click()),
      //   page.waitForNavigation({ waitUntil: "networkidle2" }),
      // ]);
      // const pages = await browser.pages();
      // const newPage = pages[pages.length - 1];
      // const url = await newPage.url();

      const buyNowLink = await page.$("#buy-now-link");
      const yourHref = await page.evaluate(
        (anchor) => anchor.getAttribute("href"),
        buyNowLink
      );
      // run against regex
      let matches = yourHref.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
      // extract hostname (will be null if no match is found)
      matches = matches && matches[1];
      try {
        expect(yourHref).toMatch(/www.stripe.com/);
      } catch (error) {
        handleError(
          errors,
          `The Buy Now button does not redirect to Stripe Checkout. Please make sure the button is working correctly.`,
          "www.stripe.com",
          matches
        );
      }
    },
    timeout
  );
});

function handleError(
  errors,
  message,
  expected = undefined,
  actual = undefined
) {
  let commentMessage = message;
  let errorMessage = message;
  if (expected && actual) {
    commentMessage = commentMessage + "\n" + diffMD(expected, actual);
    errorMessage = errorMessage + "\n" + diffStringsUnified(expected, actual);
  }
  errors.push(commentMessage);
  throw new Error(errorMessage);
}

function diffMD(expected, actual) {
  return "```diff\n" + `+ ${expected}\n` + `- ${actual}\n` + "```";
}
