import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const wikiArticleCollection = defineCollection({
  loader: glob({pattern: '**/[^_]*.{md,mdx}', base: "./src/content/wiki" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.string().optional(),
    ["getting-started"]: z.boolean().optional(),
    incomplete: z.boolean().optional(),
    lastModified: z.string().optional(),
  }),
});

export const collections = {
  wiki: wikiArticleCollection,
};
