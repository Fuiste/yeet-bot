"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("redis");
const environment_1 = require("../environment");
const DAY = 60 * 60 * 24;
var client = Redis.createClient({ url: environment_1.REDIS_URL });
class RedisClient {
    constructor(prefix) {
        this.prefix = prefix;
    }
    set(key, value) {
        client.set(this.prefix + key, value);
    }
    setCached(key, value) {
        client.setex(this.prefix + key, DAY, value);
    }
    get(key) {
        return new Promise((resolve, reject) => {
            client.get(this.prefix + key, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    keys(key) {
        return new Promise((resolve, reject) => {
            client.keys(`*${key}*`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
}
exports.RedisClient = RedisClient;
