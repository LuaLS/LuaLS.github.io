import { defineCollection, z } from "astro:content";

const wikiArticleCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ["getting-started"]: z.boolean().optional(),
    incomplete: z.boolean().optional(),
  }),
});

export const collections = {
  wiki: wikiArticleCollection,
};
