import Fuse from "fuse.js";
import { assertElement } from "~/util/DOM";

export class SearchSuggestion {
  element: HTMLAnchorElement;
  text: string;
  href: string;

  constructor(element: HTMLAnchorElement) {
    this.element = element;

    this.text = (element.querySelector("span.term") as HTMLSpanElement)
      .textContent as string;
    this.href = (element.querySelector("span.page") as HTMLSpanElement)
      .textContent as string;

    element.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        const next = element.nextSibling as HTMLDivElement | null;
        next?.focus();
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        const previous = element.previousSibling as HTMLDivElement | null;
        if (
          previous?.previousSibling === null ||
          previous?.previousSibling instanceof HTMLAnchorElement
        ) {
          previous.focus();
        } else {
          element.dispatchEvent(new Event("focus-input", { bubbles: true }));
        }
        e.preventDefault();
      }
    });
  }

  show(position: number) {
    this.element.classList.add("match");
    const parent = this.element.parentElement as HTMLDivElement;
    parent.insertBefore(this.element, parent.children[position]);
  }

  hide() {
    this.element.classList.remove("match");
  }
}

export class SearchDialog {
  element: HTMLDialogElement;
  openElement: Element;
  inputElement: HTMLInputElement;
  suggestionsElement: HTMLDivElement;
  suggestions: SearchSuggestion[];
  haystack: Fuse<SearchSuggestion>;

  constructor(element: HTMLDialogElement) {
    this.element = element;
    this.openElement = assertElement("header button.site-search-icon");
    this.inputElement = assertElement<HTMLInputElement>(
      ":scope > input[type='search']",
      element
    );
    this.suggestionsElement = assertElement<HTMLDivElement>(
      ":scope > div.suggestions",
      element
    );
    this.suggestions = [];
    for (const suggestion of this.suggestionsElement.querySelectorAll("a")) {
      this.suggestions.push(
        new SearchSuggestion(suggestion as HTMLAnchorElement)
      );
    }

    this.haystack = new Fuse(this.suggestions, {
      keys: [{ name: "text", weight: 3 }, "href"],
      includeScore: true,
    });

    // Open event listeners
    this.openElement.addEventListener("click", () => this.open());
    document.addEventListener("keydown", (e) => {
      if (e.key !== "/") return;
      e.preventDefault();
      this.open();
    });

    // Close event listeners
    this.element.addEventListener(
      "click",
      (e) => e.target === this.element && this.close()
    );
    this.suggestionsElement.addEventListener("click", () => this.close());

    // Input element event listeners
    this.inputElement.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "Enter":
          (
            this.suggestionsElement.querySelector("a") as HTMLAnchorElement
          ).click();
          break;
        case "ArrowDown":
          (
            this.suggestionsElement.querySelector(
              "a:nth-child(2)"
            ) as HTMLAnchorElement
          ).focus();
          break;
        default:
          this.updateSuggestions();
          break;
      }
    });
    this.suggestionsElement.addEventListener("focus-input", (e) => {
      e.stopPropagation();
      this.inputElement.focus();
    });
  }

  open() {
    if (this.element.isConnected === false) {
      document.body.appendChild(this.element);
    }
    this.close();
    this.element.showModal();
    this.inputElement.setSelectionRange(0, this.inputElement.value.length);
  }

  close() {
    this.element.close();
  }

  updateSuggestions() {
    const input = this.inputElement.value.trim().toLowerCase();

    if (input.length === 0) this.suggestions.forEach((s) => s.hide());

    const results = this.haystack.search(input, { limit: 30 });
    results.sort((a, b) => (a?.score ?? 1) - (b?.score ?? 1));

    // Hide all options
    this.suggestions.forEach((s) => s.hide());

    results.forEach((result, i) => {
      if (result.score && result.score < 0.1) {
        const suggestion = this.suggestions[result.refIndex];
        suggestion.show(i);
      }
    });
  }
}
