import dayjs from "dayjs";

const PREFIX = "cache-";

export class Cache<T> {
  private name: string;

  private items: { [key: string]: T };

  /** Unix timestamp of when the cache should expire */
  private expiry: number;

  /**
   * @param name The name of the cache. Must be unique
   * @param lifetime The number of seconds the cache should live for before being invalidated
   */
  constructor(
    name: string,
    lifetime: number,
    options: { includeSearch: boolean }
  ) {
    if (options.includeSearch || options.includeSearch === undefined) {
      const url = new URL(name);
      this.name = url.protocol + url.host + url.pathname;
    } else {
      this.name = name;
    }
    this.items = {};
    this.expiry = dayjs().add(lifetime, "seconds").unix();
  }

  /** Will return the cached value, or null if expired, or undefined if the cache item doesn't exist. */
  get(): T | null | undefined {
    // If expired, return null
    if (dayjs().unix() > this.expiry) {
      return null;
    }

    const data = localStorage.getItem(PREFIX + this.name);

    if (data === null) {
      return undefined;
    }

    return JSON.parse(data);
  }

  delete(): void {
    return localStorage.removeItem(PREFIX + this.name);
  }

  store(value: any) {
    localStorage.setItem(PREFIX + this.name, JSON.stringify(value));
  }
}
