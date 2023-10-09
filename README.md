# LuaLS Website

This website explains the [lua-language-server](https://github.com/LuaLS/lua-language-server) and documents it via a [wiki](https://luals.github.io/wiki). The website is statically generated using [Astro](https://astro.build) 🚀.

## Project File Structure

- `/public/` All of the assets available from the root of the website such as images, fonts, etc.
- [`/src/components/`](./src/components/) reusable `.astro` components
  - [`/src/components/common/`](./src/components/common) common components used all over the website
  - `/src/components/layout/` components used in layouts such as headers and footers
  - [`/src/components/wiki/`](./src/components/wiki/) components used in the wiki
- `/src/content/` Content-full MDX and Markdown files used in the wiki
- `/src/layouts/` Various reusable layouts
- `/src/pages/` The pages of the website
- `/src/scss/` Common SCSS

## Developing

See the [contributing guide](./docs/CONTRIBUTING.md).

To get started, run `npm i` to install the dependencies.

You can then use `npm run dev` to start a local development server on `localhost:3000`.

`npm run build` will build the site for production so it can be previewed. `npm run preview` will preview your build of the website.

## Acknowledgments
This website uses tons of amazing open source software. Thanks to all the [great tools in use](package.json)!
