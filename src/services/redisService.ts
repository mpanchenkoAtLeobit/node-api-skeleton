import { Config } from '../../config';
import { createNodeRedisClient, WrappedNodeRedisClient  } from 'handy-redis';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
class RedisService {
  private redis: WrappedNodeRedisClient;
  private redisUrl: string;

  constructor(@Inject config: Config) {
    this.redisUrl = config.redis.url;
    this.redis = createNodeRedisClient({
      url: this.redisUrl,
    });
  }

  getClient(): WrappedNodeRedisClient {
    return this.redis;
  }

  ping(): Promise<string> {
    return this.redis.ping();
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

export { RedisService };
