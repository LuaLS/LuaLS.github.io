import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import rehypeMermaid from "rehype-mermaid";
import { modifiedTime } from "./src/plugins/modifiedTime.mjs";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

// https://astro.build/config
export default defineConfig({
  site: "https://luals.github.io",
  integrations: [mdx()],
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
    /** We use our own syntax highlight from highlight.js */
    syntaxHighlight: false,
    smartypants: false,
    rehypePlugins: [
      () => rehypeMermaid({ mermaidConfig: { darkMode: true, theme: "dark" } }),
      rehypeMdxCodeProps,
    ],
    remarkPlugins: [modifiedTime],
  },
  trailingSlash: "always",
});
