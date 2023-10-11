import { test, expect, Locator } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      "https://api.github.com/repos/LuaLS/lua-language-server",
      async (route) => {
        const json = { stargazers_count: 2000 };
        return route.fulfill({ json });
      }
    );

    await page.route(
      "https://corsproxy.io/?https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
      async (route) => {
        const json = {
          results: [
            {
              extensions: [
                {
                  statistics: [{ statisticName: "install", value: 1500000 }],
                },
              ],
            },
          ],
        };
        return route.fulfill({ json });
      }
    );

    await page.goto("/");
  });

  test("Metadata", async ({ page }) => {
    await expect(page).toHaveTitle("Lua Language Server | Home");
  });

  test.describe("Header", () => {
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

    test.describe("Search", async () => {
      let searchInput: Locator;

      test.beforeEach(async ({ page }) => {
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
        await page.locator("#site-search").click();
        await isClosed();
      });

      test("Search Finds Privacy Page", async ({ page, baseURL }) => {
        await page.getByRole("document").press("/");
        await searchInput.fill("priva");
        const link = page.getByRole("link", { name: "Privacy /privacy" });

        await expect(link).toBeVisible();
        await searchInput.press("Enter");
        await page.waitForURL("/privacy/");
        expect(page.url()).toBe(`${baseURL}privacy/`);
        await expect(page).toHaveTitle("Lua Language Server | Privacy");
      });

      test("Search Finds GitHub Repository", async ({ page, context }) => {
        await page.getByRole("document").press("/");
        await searchInput.fill("reposit");
        const link = page.getByRole("link", {
          name: "GitHub Repository https://github.com/LuaLS/LuaLS.github.io",
        });

        await expect(link).toBeVisible();

        const pagePromise = context.waitForEvent("page");
        await searchInput.press("Enter");
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        expect(newPage.url()).toBe("https://github.com/LuaLS/LuaLS.github.io");
      });
    });

    test("GitHub Link", async ({ page, context }) => {
      const pagePromise = context.waitForEvent("page");
      await page.getByRole("link", { name: "github" }).click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      expect(newPage.url()).toBe(
        "https://github.com/luals/lua-language-server"
      );
    });
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
