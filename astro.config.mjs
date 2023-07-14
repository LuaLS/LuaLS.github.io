import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    /** We use our own syntax highlight from highlight.js */
    syntaxHighlight: false,
    smartypants: false,
  },
});
