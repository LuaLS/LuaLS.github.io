import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/wiki/");
  });

  test("Exists", async ({ page }) => {
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("Home Link", async ({ page, baseURL }) => {
    await page.getByRole("link", { name: "house" }).click();
    expect(page.url()).toBe(baseURL);
  });

  test("Wiki Link", async ({ page, baseURL }) => {
    await page.getByRole("link", { name: "book" }).click();
    await page.waitForURL("/wiki/");
    expect(page.url()).toBe(baseURL + "wiki/");
  });

  test("GitHub Link", async ({ page, context }) => {
    const href = await page
      .getByRole("link", { name: "github" })
      .getAttribute("href");
    expect(href).toBe("https://github.com/luals/lua-language-server");
  });
});
