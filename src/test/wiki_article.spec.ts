import { test, expect } from "@playwright/test";

test.describe("Wiki Article", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/wiki/diagnosis-report/");
  });

  test("Header Exists", async ({ page }) => {
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("Article Loads", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Diagnosis Report" })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Generate a report containing diagnostics usually received by an LSP client."
      )
    ).toBeVisible();
    await expect(page.getByText("Last Modified:")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "circle dot Open Issue" })
    ).toBeVisible();
  });

  test("Article Sidebar", async ({ page }) => {
    const sidebar = page.locator("#article-browser");

    await page.getByRole("button", { name: "Open article browser" }).click();
    expect(await sidebar.getAttribute("open")).toBe("");

    const link = page.getByRole("link", { name: "Usage" });
    const href = await link.getAttribute("href");
    expect(href).toBe(`/wiki/usage/`);

    await sidebar
      .getByRole("button", { name: "Close article browser" })
      .click();
    expect(await sidebar.getAttribute("open")).toBe(null);
  });

  test("Outline Sidebar", async ({ page }) => {
    const sidebar = page.locator("#outline");

    await page.getByRole("button", { name: "Open outline" }).click();
    expect(await sidebar.getAttribute("open")).toBe("");

    const link = sidebar.getByRole("link", { name: "Diagnosis Report" });
    const href = await link.getAttribute("href");
    expect(href).toBe(`#diagnosis-report`);

    await sidebar.getByRole("button", { name: "Close outline" }).click();
    expect(await sidebar.getAttribute("open")).toBe(null);
  });

  test("Edit Page Button", async ({ page }) => {
    const link = page.getByRole("link", { name: "pencil Edit this page" });
    await expect(link).toBeVisible();

    const href = await link.getAttribute("href");
    expect(href).toBe(
      "https://github.com/LuaLS/LuaLS.github.io/tree/main/src/content/wiki/diagnosis-report.mdx"
    );
  });

  test("Open Issue Button", async ({ page }) => {
    const link = page.getByRole("link", { name: "circle dot Open Issue" });
    await expect(link).toBeVisible();
  });
});
