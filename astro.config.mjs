import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import { modifiedTime } from "./src/plugins/modifiedTime.mjs";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://luals.github.io",
  integrations: [mdx(), mermaid({ theme: "dark" })],
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
  fonts: [
    {
      name: "Poppins",
      cssVariable: "--font-poppins",
      provider: fontProviders.google(),
    },
    {
      name: "Prompt",
      cssVariable: "--font-prompt",
      provider: fontProviders.google(),
    },
    {
      name: "Source Code Pro",
      cssVariable: "--font-source-code-pro",
      provider: fontProviders.google(),
    },
  ],
  markdown: {
    rehypePlugins: [rehypeMdxCodeProps],
    remarkPlugins: [modifiedTime],
  },
  trailingSlash: "always",
});
