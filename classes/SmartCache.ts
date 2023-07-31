import axios from "axios";

const PREFIX = "Scache-";

export class SmartCache {
  id: string;
  url: string;

  constructor(url: string, options?: { includeSearch?: boolean }) {
    this.url = url;

    if (options?.includeSearch === false) {
      const u = new URL(url);
      this.id = u.protocol + u.host + u.pathname;
    } else {
      this.id = url;
    }
  }

  private save(response: any) {
    localStorage.setItem(
      PREFIX + this.id,
      JSON.stringify({
        url: this.url,
        data: response.data,
        eTag: response.headers["etag"],
        lastModified: response.headers["last-modified"],
      })
    );
  }

  async get() {
    const cache = localStorage.getItem(PREFIX + this.id);

    // If it has never been cached, send the request right away
    if (cache === null) {
      const response = await axios.get(this.url);

      // Cache response in local storage
      this.save(response);
      return response.data;
    }

    const parsed = JSON.parse(cache);

    const headers: Record<string, string> = {};

    if (parsed.eTag) {
      headers["If-None-Match"] = parsed.eTag;
    } else if (parsed.lastModified) {
      headers["If-Modified-Since"] = parsed.lastModified;
    }

    const response = await axios.get(this.url, {
      headers,
      validateStatus(status) {
        return status === 304 || (status >= 200 && status < 300);
      },
    });

    if (response.status === 304) {
      return parsed.data;
    } else {
      this.save(response);

      return response.data;
    }
  }
}
