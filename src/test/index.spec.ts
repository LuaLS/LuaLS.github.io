import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    page.route(
      "https://api.github.com/repos/LuaLS/lua-language-server",
      async (route) => {
        const json = { stargazers_count: 2000 };
        return route.fulfill({ json });
      }
    );

    await page.goto("/", { waitUntil: "load", timeout: 3000 });
  });

  test("Metadata", async ({ page }) => {
    await expect(page).toHaveTitle("Lua Language Server | Home");
  });

  test.describe("Install Instructions Visible", () => {
    test("VS Code", async ({ page, baseURL }) => {
      await page.getByRole("button", { name: "Visual Studio Code" }).click();
      expect(page.url()).toBe(`${baseURL}#vscode-install`);
      await expect(
        page.getByRole("heading", { name: "Visual Studio Code" })
      ).toBeVisible();
    });

    test("Neovim", async ({ page, baseURL }) => {
      await page.getByRole("button", { name: "Neovim" }).click();
      expect(page.url()).toBe(`${baseURL}#neovim-install`);
      await expect(page.getByRole("heading", { name: "Neovim" })).toBeVisible();
    });

    test("Other", async ({ page, baseURL }) => {
      await page.getByRole("button", { name: "question" }).click();
      expect(page.url()).toBe(`${baseURL}#other-install`);
      await expect(page.getByRole("heading", { name: "Other" })).toBeVisible();
    });
  });
});
