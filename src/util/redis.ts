import * as Redis from 'redis'

import { REDIS_URL } from '../environment'

const DAY = 60 * 60 * 24
var client = Redis.createClient({url: REDIS_URL})

export class RedisClient {
  constructor(public prefix: string) {}

  set(key: string, value: string) {
    client.set(this.prefix + key, value)
  }

  setCached(key: string, value: string) {
    client.setex(this.prefix + key, DAY, value)
  }

  get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      client.get(this.prefix + key, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

  keys(key: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      client.keys(`*${key}*`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}
