# Component List

## [Accordion](./Accordion.astro)

Extends the default [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) HTML element.

### Arguments

| Name   | Type       | Description                                                                        |
| ------ | ---------- | ---------------------------------------------------------------------------------- |
| `open` | `boolean?` | Whether or not the accordion should default to open. Defaults to `false` (closed). |

### Slots

`summary` - Content that should be displayed in the `<summary>` of the accordion.

### Example

```HTML
<Accordion>
    <span slot="summary">Example</span>
    <!-- Feel free to put whatever you want in here.
    It will only be shown when the accordion is open. -->
    <p>Peekaboo!</p>
</Accordion>
```

## [AccordionGroup](./AccordionGroup.astro)

Used for containing multiple [`Accordion`](#accordion) components. Only allows one [`Accordion`](#accordion) to be open at a time, closing others.

### Example

```HTML
<AccordionGroup>
    <Accordion>
        <span slot="summary">I am open</span>
        <p>Hello</p>
    </Accordion>
    <Accordion>
        <span slot="summary">Or I am open</span>
        <p>But not both</p>
    </Accordion>
</AccordionGroup>
```

## [CodeBlock](./CodeBlock.astro)

Adds syntax highlighting to code using [highlight.js](https://highlightjs.org/).

### Arguments

| Name       | Type      | Description                                                                                                                                                                                                                                                              |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `language` | `string?` | The [language](https://highlightjs.org/static/demo/#all) to highlight. Technically not case-sensitive, but the displayed language will be what is entered here, so please respect capitalization of language names. If omitted, will attempt to auto-detect the language |

### Slots

`default` - The code to syntax highlight. Should be passed in using a `<pre>` element to preserve indenting and new lines.

### Example

```HTML
<CodeBlock language="Lua">
<pre>
local test = "Hello"
print(test)
</pre>
</CodeBlock>
```

## [ExternalLink](./ExternalLink.astro)

Extends the default `<a>` HTML element to add custom styles. Should be used on all links that do not point to the local domain.

### Arguments

| Name     | Type       | Description                                                                                                                      |
| -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `url`    | `string`   | The url to link to                                                                                                               |
| `newTab` | `boolean?` | Whether the linked page should be opened in another tab. Defaults to `true`.                                                     |
| `refer`  | `boolean?` | Whether to [refer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) when navigating away. Defaults to `false`. |
| `icon` | `boolean?` | Whether or not to display the "external" icon next to the link. Defaults to `true`.                                             |
| `class`  | `string?`  | Allows you to pass in a class to be applied to the link.                                                                         |

### Slots

`default` - The content that should appear linked.

### Example

```HTML
<ExternalLink url="https://github.com" refer={true}>Link to GitHub</ExternalLink>
```

## [FileTreeItem](./FileTreeItem.astro)

Extends the default `<details>` HTML element to display a file tree. Nest them to create a tree of [`Accordion`](#accordion)-like elements.

### Arguments

| Name         | Type                                         | Description                                                                                  |
| ------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `name`       | `string`                                     | Name of the file                                                                             |
| `type`       | `"file" \| "code" \| "image" \| "directory"` | Type of the entry. This dictates the icon that will be used                                  |
| `gitignored` | `boolean?`                                   | Whether it is ignored and should have a little "blocked" icon next to it. Defaults to false. |
| `open`       | `boolean?`                                   | Whether this element should be open/expanded by default. Defaults to false.                  |

### Slots

`default` - The content that should appear in the expanded tree. Can be more [`FileTreeItem`](#filetreeitem) elements, text, or other HTML.

### Example

```HTML
<FileTreeItem name="root/" type="directory" open={true}>
    <FileTreeItem name="path/" type="directory">
        <FileTreeItem name="file.lua" type="code">
            <p>This file is very cool</p>
        </FileTreeItem>
    </FileTreeItem>
</FileTreeItem>
```

## [Icon](./Icon.astro)

Free icons from [fontawesome](https://fontawesome.com/icons).

### Arguments

| Name    | Type                  | Description                                       |
| ------- | --------------------- | ------------------------------------------------- |
| `group` | `"brands" \| "solid"` | The group that the icon belongs to i.e. "brands". |
| `name`  | `string`              | The name of the icon.                             |
| `class` | `string?`             | The name of a class to apply to the icon.         |
| `color` | `string?`             | The colour of the icon.                           |

### Example

```HTML
<Icon group="solid" name="peace" color="#9400ff"/>
```

## [Loading](./Loading.astro)

Displays a loading spinner while child content loads. When a child fires the `content_loaded` event, the spinner is removed and the content is revealed.

### Slots

`default` - The content that will load in the background and be revealed after firing `content_loaded`.

### Example

```HTML
<Loading>
    <!-- The list of users needs to be fetched first -->
    <!-- Once fetched, the below div will need to fire a `content_loaded` event -->
    <div id="user-list"></div>
</Loading>
```

## [Remark](./Remark.astro)

A remark/note/admonition that stands out to readers.

### Arguments

| Name      | Type                                                                     | Description                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | `"note" \| "warning" \| "important" \| "WIP" \| "deprecated" \| "issue"` | The type of remark to make. Each has their own icon and colour.                                                                                                                                                           |
| `display` | `"fit" \| "block" \| "compact"`                                          | How the remark should be displayed. `"fit"` will only take up the required width, `"block"` (default) will take up the entire width of the parent, `"compact"` will display the remark type and content on the same line. |

### Slots

`default` - The content of the remark

### Example

```HTML
<Remark type="note" display="compact">
    <p>Wait, people actually read this?</p>
</Remark>
```

## [Tabs](./Tabs.astro)

A group of tabs where the content of only one tab is visible at a time.

### Arguments

| Name      | Type                                                                 | Description                                                                                                                                                                                                                                                                                                                                  |
| --------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttons` | `{ name: string, image?: string, icon?: string, accent?: string }[]` | An array of buttons that will select the various tabs. There should be a button per tab. There should only be an `image` **OR** `icon` specified for each button. `image` should be a path/URL to the image. `icon` should be the name of a solid icon from fontawesome. `accent` is an accent colour displayed under the tab when selected. |
| `active`  | `boolean`                                                            | Whether this button/tab combo is active. Only one should be marked active.                                                                                                                                                                                                                                                                   |

### Slots

`default` - Within this one slot there should be a div for each button you have defined. The div should have an attribute `data-tab` where the value should be the the name of a button. These are your tabs of content.

### Example

```JSX
<Tabs
  active="VS Code"
  buttons={[
    { name: "VS Code", image: "/images/vscode.svg", accent: "#23a9f2" },
    { name: "Neovim", image: "/images/neovim.svg", accent: "#78e027" },
  ]}
>
  <div data-tab="VS Code"></div>
  <div data-tab="Neovim"></div>
</Tabs>
```

## [Tooltip](./Tooltip.astro)

A [tippy.js](https://atomiks.github.io/tippyjs/) tooltip that can be placed around other elements.

### Arguments

| Name        | Type                                                                                                                                                                                                         | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `text`      | `string`                                                                                                                                                                                                     | The text to display in the tooltip.                                             |
| `placement` | `"auto" \| "auto-start" \| "auto-end" \| "top" \| "bottom" \| "right" \| "left" \| "top-start" \| "top-end" \| "bottom-start" \| "bottom-end" \| "right-start" \| "right-end" \| "left-start" \| "left-end"` | Where to place the tooltip relative to the element.                             |
| `delay`     | [`string?`](https://atomiks.github.io/tippyjs/v6/all-props/#delay)                                                                                                                                           | Delay in milliseconds between showing and hiding.                               |
| `arrow`     | [`(string \| boolean)?`](https://atomiks.github.io/tippyjs/v6/all-props/#arrow)                                                                                                                              | Whether or not the tooltip should have an arrow pointing to the target element. |
| `class`     | `string?`                                                                                                                                                                                                    | Name of a class to apply.                                                       |

### Slots

`default` - The content to place the tooltip on

### Example

```HTML
<Tooltip text="Hello!" placement="bottom">
    <button>Hover me!</button>
</Tooltip>
```
