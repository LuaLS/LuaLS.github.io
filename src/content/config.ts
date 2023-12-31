import { defineCollection, z } from "astro:content";

const wikiArticleCollection = defineCollection({
  type: "content",
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
