export const assertElement = <T extends Element>(
    selector: string,
    parent: Document | Element = document
  ): T => {
    const element = parent.querySelector<T>(selector);

    if (element === null) {
      throw new Error(`Could not find element: ${selector}`);
    }

    return element;
  };
