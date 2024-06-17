export interface IEnv {
    DATABASE_HOST: string;
    DATABASE_USER: string;
    DATABASE_PORT: number;
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;

    JWT_SECRET: string;
    
    SERVER_PORT: number
}