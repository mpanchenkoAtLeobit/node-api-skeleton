import { WrappedNodeRedisClient  } from 'handy-redis';
import {RedisService} from '../services/redisService';
import {Base} from '../base';
import {Inject} from 'typescript-ioc';

abstract class BaseRedisResource extends Base {
    protected redis: WrappedNodeRedisClient;
    protected expirationTime: number;
    protected keyPrefix: string;

    protected constructor(filename: string, @Inject redisService: RedisService, keyPrefix: string, expirationTime: number) {
        super(filename);
        this.redis = redisService.getClient();
        this.keyPrefix = keyPrefix;
        this.expirationTime = expirationTime;
    }

    /*
    async deleteByPattern(key: string): Promise<number> {
        let keys: string[] = await this.redis.keys(key);
        return this.redis.del(keys);
    }
    */

    delete(key: string): Promise<number> {
        return this.redis.del(key);
    }

    get(keyData: object): Promise<string | null> {
        const key = this.generateKey(keyData);
        return this.redis.get(key);
    }

    async getAsObject(keyData: object): Promise<object | null> {
        const value = await this.get(keyData);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    }

    async set(keyData: object, entity: string | object): Promise<void> {
        const key: string = this.generateKey(keyData);
        await this.redis.set(key, this.toString(entity), ['PX', this.expirationTime]);
        return;
    }

    private toString(data: string | object): string {
        return typeof data === 'string' ? data : JSON.stringify(data);
    }

    protected generateKey(data: object): string {
        let generatedKey = `${this.keyPrefix}`;
        for (const index in data) {
            if (data.hasOwnProperty(index)) {
                generatedKey += `:${(data as any)[index]}`;
            }
        }
        return generatedKey;
    }
}

export {BaseRedisResource};
