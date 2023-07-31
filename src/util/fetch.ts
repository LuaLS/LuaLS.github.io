import defaultFetch, { fetchBuilder, FileSystemCache } from "node-fetch-cache";
import os from "os";

/* Cache location:
 Windows: C:\Users\USER\AppData\Local\Temp\LuaLS_website_cache
*/

const cacheDir = os.tmpdir() + "/LuaLS_website_cache/";
const cacheDuration = 1800000; // 30 minutes;
const cacheFetch = fetchBuilder.withCache(
  new FileSystemCache({ cacheDirectory: cacheDir, ttl: cacheDuration })
);

/** If in development mode, caches requests to prevent vite from DDOSing api endpoints */
export default async (...args: Parameters<typeof defaultFetch>) => {
  if (import.meta.env.PROD) {
    return await fetch(...(args as [RequestInfo, RequestInit]));
  } else {
    return await cacheFetch(...args).then(async (response) => {
      if (!response.ok) {
        await response.ejectFromCache();
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response;
      }
    });
  }
};
