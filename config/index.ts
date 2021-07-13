require('dotenv').config()
import { ConfigUtils } from './utils';
import { CorsOptions } from 'cors';
import { Singleton } from 'typescript-ioc';
import { Knex } from 'knex'

export interface IDbConnection extends Knex.PgConnectionConfig { }

export interface IDbPool extends Knex.PoolConfig { }

interface DbConfig {
    connection: IDbConnection,
    pool: IDbPool
}

interface RedisConfig {
    url: string
}

interface HttpServerConfig {
    port: number
}

interface RabbitConfig {
    url: string
}

interface ApiConfig {
    apiKey: string
}

@Singleton
class Config {
    db: DbConfig;
    httpServer: HttpServerConfig;
    redis: RedisConfig;
    rabbit: RabbitConfig;
    cors: CorsOptions;
    service: string;
    api: ApiConfig;

    constructor() {
        this.db = {
            connection:
            {
                host: ConfigUtils.getAsString('DB_HOST', 'localhost'),
                port: ConfigUtils.getAsNumber('DB_PORT', 5432),
                database: ConfigUtils.getAsString('DB_NAME', 'rush-mls-db'),
                user: ConfigUtils.getAsString('DB_USER', 'postgres'),
                password: ConfigUtils.getAsString('DB_PASSWORD', ''),
                ssl: ConfigUtils.getAsBoolean('DB_SSL', 'true')
            },
            pool: {
                min: ConfigUtils.getAsNumber('DB_POOL_MIN', 2),
                max: ConfigUtils.getAsNumber('DB_POOL_MAX', 30)
            }
        };
        this.httpServer = {
            port: ConfigUtils.getAsNumber('PORT', 5008)
        };
        this.redis = {
            url: ConfigUtils.getAsString('REDISCLOUD_URL', 'redis://localhost:6379')
        };
        this.rabbit = {
            url: ConfigUtils.getAsString('RABBIT_URL', 'amqp://localhost:5672'),
        };
        this.service = ConfigUtils.getAsString('SERVICE', 'Api Service');
        this.api = {
            apiKey: ConfigUtils.getAsString('API_KEY', 'API_KEY')
        };
        this.cors = {
            maxAge: 600, // 10 min
            origin: [
                // localhos
                /https?:\/\/localhost/,
                /https?:\/\/127.0.0.1/,
                // private networks
                // 16-bit block / 192.168.0.0 – 192.168.255.255
                /https?:\/\/192.168\..+/,
                // 20-bit block / 172.16.0.0 – 172.31.255.255
                /https?:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\..+/,
                // 24-bit block /10.0.0.0 – 10.255.255.255
                /https?:\/\/10\..+/,
                new RegExp('https://rushhome.com'),
            ]
        };
    }
}

export { Config };
