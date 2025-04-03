/**
 * An abstract class for different cache providers. 
 */
export default abstract class CacheProvider<U> {
    // setting up the cache provider (eg. connecting to server)
    abstract setup(...args: any): Promise<void>;
    abstract set(key: string, value: U): Promise<void>;
    abstract get(key: string): Promise<U | null>;
};
