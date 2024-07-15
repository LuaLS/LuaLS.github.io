import { test, expect, type Locator } from "@playwright/test";

test.describe("Header", () => {
  let header: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/wiki/");
    header = page.getByRole("banner")
  });

  test("Exists", async ({ page }) => {
    await expect(header).toBeVisible();
  });

  test("Home Link", async ({ page, baseURL }) => {
    await header.getByRole("link", { name: "home" }).click();
    expect(page.url()).toBe(baseURL);
  });

  test("Wiki Link", async ({ page, baseURL }) => {
    await header.getByRole("link", {name: "wiki"}).click();
    await page.waitForURL("/wiki/");
    expect(page.url()).toBe(baseURL + "wiki/");
  });

  test("GitHub Link", async ({ page, context }) => {
    const href = await header
      .getByRole("link", { name: "github" })
      .getAttribute("href");
    expect(href).toBe("https://github.com/luals/lua-language-server");
  });
});
