# Component List

## [Accordion](./Accordion.astro)
Extends the default [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) HTML element.

### Arguments
| Name   | Type       | Description                                                                        |
| ------ | ---------- | ---------------------------------------------------------------------------------- |
| `open` | `boolean?` | Whether or not the accordion should default to open. Defaults to `false` (closed). |

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
