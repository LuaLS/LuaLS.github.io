# Contributing to the Wiki

The content of the wiki articles is stored in `src/content/wiki` in [MDX](https://mdxjs.com/) files. MDX allows us to use components in Markdown.

The various components available for use can be found in [`src/components/common`](../src/components/common/) and [`src/components/wiki`](../src/components/wiki/). Make sure to check out their `README` files to learn more about the components.

## Article Frontmatter

All wiki articles must contain some frontmatter at the top of the file.

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

## Images

The way images are handled in Astro is slightly odd, but it does come with some nice benefits.

### Remote Images

Remote images can simply be linked to like standard markdown:

```md
![Alt text is important!](https://avatars.githubusercontent.com/u/124349233)
```

### Local Images

Unless there is a good reason for an image to be [permanently and publically linkable](#public-images), images should saved to `src/assets/images/` and loaded like so:

```astro
![A cat walking](~/assets/images/cat.png)
```

In some rare cases, they may have to be manually imported and loaded using the `<Image>` or other component:

```astro
import {Image} from "astro:assets"; import dog from "~/assets/images/dog.png";

<Image src={dog} alt="A dog sitting" />
```

### Public Images

Images that need to be publically available, say for serving to other software, or for linking to other websites, need to be saved to `public/images/`. They can then be used just like [local images](#local-images), but the file path is instead relative to the public directory:

```diff
- ![A cat walking](~/assets/images/cat.png)
+ ![A cat walking](/images/cat.png)
```
