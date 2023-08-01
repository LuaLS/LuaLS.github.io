# Contributing to the Wiki

The content of the wiki articles is stored in `src/content/wiki` in [MDX](https://mdxjs.com/) files. MDX allows us to use components in Markdown.

The various components available for use can be found in [`src/components/common`](../src/components/common/) and [`src/components/wiki`](../src/components/wiki/). Make sure to check out their `README` files to learn more about the components.

## Article Frontmatter

All wiki articles can contain frontmatter at the top of the file.

|    Property     |    Type    | Required | Descripion                                                                                                                  |
| :-------------: | :--------: | :------: | --------------------------------------------------------------------------------------------------------------------------- |
|      title      |  `string`  |    ✅    | Display title of the article.                                                                                               |
|   description   |  `string`  |    ✅    | Short summary of the article.                                                                                               |
|      tags       | `string[]` |    ❌    | Keywords used in the site search to match this article.                                                                     |
| getting-started | `boolean`  |    ❌    | Whether or not the article should appear in the "Get Started" section on the wiki index.                                    |
|   incomplete    | `boolean`  |    ❌    | Mark this article as unfinished. A [`Remark`](../src/components/common/Remark.astro) will appear at the top of the article. |

```mdx
---
title: myArticleTitle
description: Wow, my own article, cool!
incomplete: true
---
```
