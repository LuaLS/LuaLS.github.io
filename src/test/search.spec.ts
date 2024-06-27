import { test, expect, type Locator } from "@playwright/test";

test.describe("Search", async () => {
  let searchInput: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/wiki/");

    searchInput = page.getByPlaceholder("Search...");
  });

  const isOpen = async () => {
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  };

  const isClosed = async () => {
    await expect(searchInput).not.toBeVisible();
  };

  test("Open Search With Button", async ({ page }) => {
    await page.getByRole("button", { name: "search" }).click();
    await isOpen();
  });

  test("Open Search With Keypress", async ({ page }) => {
    await page.getByRole("document").press("/");
    await isOpen();
  });

  test("Close Search With Escape", async ({ page }) => {
    await page.getByRole("document").press("/");
    await isOpen();
    await searchInput.press("Escape");
    await isClosed();
  });

  test("Close Search By Clicking Background", async ({ page }) => {
    await page.getByRole("document").press("/");
    await isOpen();
    await page.locator("#site-search dialog").click();
    await isClosed();
  });

  test("Search Finds Privacy Page", async ({ page, baseURL }) => {
    await page.getByRole("document").press("/");
    await searchInput.fill("priva");
    const link = page.getByRole("link", { name: "Privacy /privacy" });

    await expect(link).toBeVisible();
    await searchInput.press("Enter");
    expect(page.url()).toBe(`${baseURL}privacy/`);
  });

  test("Search Finds GitHub Repository", async ({ page, context }) => {
    await page.getByRole("document").press("/");
    await searchInput.fill("reposit");
    const link = page.getByRole("link", {
      name: "GitHub Repository https://github.com/LuaLS/LuaLS.github.io",
    });

    await expect(link).toBeVisible();

    const href = await link.getAttribute("href");
    expect(href).toBe("https://github.com/LuaLS/LuaLS.github.io");
  });
});
