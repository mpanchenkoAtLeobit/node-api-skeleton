import { Config } from '../../config';
import redis, { RedisClient } from 'redis';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
class RedisService {
  private redis: RedisClient;
  private redisUrl: string;

  constructor(@Inject config: Config) {
    this.redisUrl = config.redis.url;
    this.redis = redis.createClient({
      url: this.redisUrl,
    });
  }

  getClient(): RedisClient {
    return this.redis;
  }

  ping(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redis.ping((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

export { RedisService };
