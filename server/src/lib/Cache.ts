import Redis, { KeyType } from 'ioredis';

class Cache {
  public redis = new Redis({
    port: 6379 || process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    keyPrefix: 'cache:',
  });

  set(key: KeyType, value: any): Promise<string> {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key: KeyType): Promise<string | null> {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key: KeyType) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix: KeyType): Promise<number> {
    const keys = await this.redis.keys(`cache:${prefix}:*`);

    const keysWithoutPrefix = keys.map((key) => key.replace('cache:', '')).toString();

    return this.redis.del(keysWithoutPrefix);
  }
}

export default new Cache();
