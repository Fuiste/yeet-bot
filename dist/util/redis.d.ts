export declare class RedisClient {
    prefix: string;
    constructor(prefix: string);
    set(key: string, value: string): void;
    setCached(key: string, value: string, expire?: number): void;
    get(key: string): Promise<string>;
    keys(key: string): Promise<string[]>;
}
