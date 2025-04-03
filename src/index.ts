import {CacheClient} from "./CacheService";

const CACHE_KEY = 'data'

// Helper to fetch data, whether use caching or not
const fetchUserData = async (cache: boolean) => {
  if (cache) {
    return await CacheClient.get(CACHE_KEY) as string;
  } else {
    const res = await fetch('https://dummyjson.com/user');
    const data = await res.json()
    return JSON.stringify(data)
  }
}

const main = async () => {
  // init cache service
  await CacheClient.setup()
  
  // fetch for the first time (no cache)
  console.time('Fetch without cache');
  const data = await fetchUserData(false);
  console.timeEnd('Fetch without cache');
  // let's cache the result
  await CacheClient.set(CACHE_KEY, data);
  
  // fetch after the first time (now with cache)
  console.time('Fetch with cache');
  await fetchUserData(true);
  console.timeEnd('Fetch with cache');
  
  process.exit();
}

main();


