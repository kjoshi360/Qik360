import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST ?? 'localhost',
      port: Number(process.env.REDIS_PORT ?? '6379'),
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
  }

  getClient() {
    return this.client;
  }
}
