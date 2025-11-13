import NodeFetchCache, { FileSystemCache } from "node-fetch-cache";
import type { default as nodeFetch } from "node-fetch";
import os from "os";

/* Cache location:
 Windows: C:\Users\USER\AppData\Local\Temp\LuaLS_website_cache
 Linux: /tmp/LuaLS_website_cache
*/

const cacheDir = os.tmpdir() + "/LuaLS_website_cache/";
const cacheDuration = 1800000; // 30 minutes;
const cacheFetch = NodeFetchCache.create({
  cache: new FileSystemCache({ cacheDirectory: cacheDir, ttl: cacheDuration }),
});

/** If in development mode, caches requests to prevent vite from DDOSing api endpoints */
export default async (request: RequestInfo, init?: RequestInit) => {
  if (import.meta.env.PROD) {
    return await fetch(request, init);
  } else {
    return await cacheFetch(
      request as Parameters<typeof nodeFetch>[0],
      init as Parameters<typeof nodeFetch>[1],
    ).then(async (response) => {
      if (!response.ok) {
        await response.ejectFromCache();
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response;
      }
    });
  }
};
