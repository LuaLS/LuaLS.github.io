import { test, expect } from "@playwright/test";

test.describe("Wiki Article", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/wiki/build/");
  });

  test("Header Exists", async ({ page }) => {
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("Article Loads", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Build" })).toBeVisible();
    await expect(
      page.getByText(
        "Instructions for building the Lua Language Server from source."
      )
    ).toBeVisible();
    await expect(page.getByText("Last Modified:")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "circle dot Open Issue" })
    ).toBeVisible();
  });

  test("Article Sidebar", async ({ page, baseURL }) => {
    const sidebar = page.locator("#article-browser");

    await page.getByRole("button", { name: "newspaper" }).click();
    expect(await sidebar.getAttribute("open")).toBe("");

    await sidebar.getByRole("button", { name: "x" }).click();
    expect(await sidebar.getAttribute("open")).toBe(null);

    await page.getByRole("button", { name: "newspaper" }).click();
    await page.getByRole("link", { name: "Usage" }).click();
    await page.waitForURL(`${baseURL}wiki/usage/`);
    expect(page.url()).toBe(`${baseURL}wiki/usage/`);
    await expect(page.getByRole("heading", { name: "Usage" })).toBeVisible();
  });

  test("Outline Sidebar", async ({ page, baseURL }) => {
    const sidebar = page.locator("#outline");

    await page.getByRole("button", { name: "list" }).click();
    expect(await sidebar.getAttribute("open")).toBe("");

    await sidebar.getByRole("button", { name: "x" }).click();
    expect(await sidebar.getAttribute("open")).toBe(null);

    await page.getByRole("button", { name: "list" }).click();
    await sidebar.getByRole("link", { name: "Build" }).click();
    await page.waitForURL(`${baseURL}wiki/build/#build`);
    expect(page.url()).toBe(`${baseURL}wiki/build/#build`);
    await expect(page.getByRole("heading", { name: "Build" })).toBeVisible();
  });

  test("Edit Page Button", async ({ page, context }) => {
    const link = page.getByRole("link", { name: "pencil Edit this page" });
    await expect(link).toBeVisible();

    const pagePromise = context.waitForEvent("page");
    await link.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toBe(
      "https://github.com/LuaLS/LuaLS.github.io/blob/main/src/content/wiki/build.mdx"
    );
  });

  test("Open Issue Button", async ({ page }) => {
    const link = page.getByRole("link", { name: "circle dot Open Issue" });
    await expect(link).toBeVisible();
  });
});
