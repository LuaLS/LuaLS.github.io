# Component List
Most of the components in here exist purely to provide some small customizations to the markdown elements [as they are converted into HTML](../../pages/wiki/[...slug].astro).

## [headings/H{level}](./headings/)
These just immediately pass the properties to [`Heading`](#heading). They only exist because when you are [replacing element with components](https://docs.astro.build/en/guides/markdown-content/#custom-components-with-imported-mdx), you have to specify each heading level individually if you want to be able to differentiate them.

## [Diagnostic](./Diagnostic.astro)
Used to display the priority level of the diagnostic next to its heading.

## [Heading](./Heading.astro)
Extends the default heading HTML element to have an anchor pointing to them, for ease of copying the URL to a specific heading.

## [Image](./Image.astro)
Wraps the default `<img>` HTML element so that images can be lazy loaded.

## [WikiLink](./WikiLink.astro)
Either renders a normal link when linking somewhere in the same local domain or an [ExternalLink](../common/ExternalLink.astro) when linking externally.
