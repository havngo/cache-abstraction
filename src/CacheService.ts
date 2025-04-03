import CacheProvider from "./CacheProvider";
import { RedisAdapter } from "./RedisAdapter";

/** 
 * All caching will be handled through this service by a cache provider passed in the constructor
 * Also handle errors
 */
class CacheService<U> {
    constructor(private cacheProvider: CacheProvider<U>) {}
    // setting up the cache provider
    async setup() {
        try {
            await this.cacheProvider.setup();    
        } catch (e) {
            console.error(`Cannot set up cach provider ${e}`)
        }
    }
    // get key
    async get(key: string) {
        try {
            return this.cacheProvider.get(key);
        } catch (e) {
            console.error(`Cannot get ${key}: ${e}`)
        }
    }
    // set key-value
    async set(key: string, value: U) {
        try {
            return this.cacheProvider.set(key, value);
        } catch (e) {
            console.error(`Cannot set ${key}: ${e}`)
        }
    }
}

/**
 * A single instance of CacheService that is responsible for managing all caches in this application
 */
export const CacheClient = new CacheService(new RedisAdapter());
