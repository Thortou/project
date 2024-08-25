export interface IEnv {
    DATABASE_HOST: string;
    DATABASE_USER: string;
    DATABASE_PORT: number;
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;

    QUEUE_REDIS_HOST: string;
    QUEUE_REDIS_PORT: string;
    QUEUE_REDIS_USERNAME: string;
    QUEUE_REDIS_PASSWORD: string;

    CACHE_REDIS_HOST: string;
    CACHE_REDIS_PORT: string;
    CACHE_REDIS_USERNAME: string;
    CACHE_REDIS_PASSWORD: string;

    LOG_LEVEL: string;
    LOG_PATH: string;
    NODE_ENV: string;

    JWT_SECRET: string;

    SERVER_PORT: number
}