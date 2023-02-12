/* globals beforeAll, describe, test, page, expect */
const timeout = 15000;
beforeAll(async () => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
});
describe("Test BK Pets", () => {
  test(
    "Page title is 'BK PETS'",
    async () => {
      const title = await page.title();
      expect(title).toBe("BK PETS");
    },
    timeout
  );
  test(
    "Hero Section exists",
    async () => {
      const sections = await page.$("#HeroSideImageRight");
      expect(sections).toBeTruthy();
    },
    timeout
  );
  test(
    "Products Section exists",
    async () => {
      const sections = await page.$("#FeatureList");
      expect(sections).toBeTruthy();
    },
    timeout
  );
  test(
    "Buy Now Button exists and the text says 'Buy Now'",
    async () => {
      const buyNow = await page.$("#buy-now-button");
      let value = await page.evaluate((el) => el.textContent, buyNow);
      const isDisabled = await page.$eval(
        "#buy-now-button",
        (btn) => btn.disabled
      );
      expect(value).toBe("Buy Now");
      expect(isDisabled).toBe(false);
    },
    timeout
  );
  test(
    "Click Buy Now Button",
    async () => {
      const buyNow = await page.$("#buy-now-button");
      await buyNow.evaluate((el) => el.click());
    },
    timeout
  );
});