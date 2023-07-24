import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import rehypeMermaid from "rehype-mermaidjs";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    /** We use our own syntax highlight from highlight.js */
    syntaxHighlight: false,
    smartypants: false,
    rehypePlugins: [
      () => rehypeMermaid({ mermaidConfig: { darkMode: true, theme: "dark" } }),
    ],
  },
});
