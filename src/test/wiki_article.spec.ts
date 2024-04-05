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

  test("Article Sidebar", async ({ page }) => {
    const sidebar = page.locator("#article-browser");

    await page.getByRole("button", { name: "newspaper" }).click();
    expect(await sidebar.getAttribute("open")).toBe("");

    await sidebar.getByRole("button", { name: "x" }).click();
    expect(await sidebar.getAttribute("open")).toBe(null);

    await page.getByRole("button", { name: "newspaper" }).click();
    const link = page.getByRole("link", { name: "Usage" });
    const href = await link.getAttribute("href");
    expect(href).toBe(`/wiki/usage/`);
  });

  test("Outline Sidebar", async ({ page }) => {
    const sidebar = page.locator("#outline");

    await page.getByRole("button", { name: "list" }).click();
    expect(await sidebar.getAttribute("open")).toBe("");

    await sidebar.getByRole("button", { name: "x" }).click();
    expect(await sidebar.getAttribute("open")).toBe(null);

    await page.getByRole("button", { name: "list" }).click();
    const link = sidebar.getByRole("link", { name: "Build" });
    const href = await link.getAttribute("href");
    expect(href).toBe(`#build`);
  });

  test("Edit Page Button", async ({ page }) => {
    const link = page.getByRole("link", { name: "pencil Edit this page" });
    await expect(link).toBeVisible();

    const href = await link.getAttribute("href");
    expect(href).toBe(
      "https://github.com/LuaLS/LuaLS.github.io/tree/main/src/content/wiki/build.mdx"
    );
  });

  test("Open Issue Button", async ({ page }) => {
    const link = page.getByRole("link", { name: "circle dot Open Issue" });
    await expect(link).toBeVisible();
  });
});
