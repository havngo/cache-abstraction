import { RedisClientType, createClient } from 'redis';
import CacheProvider from './CacheProvider';

export class RedisAdapter extends CacheProvider<string> {
    private redisClient: RedisClientType;
    constructor(client?: RedisClientType) {
        super();
        this.redisClient = client ?? createClient();
    }
    
    async setup() {
        await this.redisClient.connect();
    }

    async get(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        this.redisClient.set(key, value);
    }

}