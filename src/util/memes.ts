import { RedisClient } from './redis'

const PHRASE_PREFIX = 'memetics_'
const WEEK = 60 * 60 * 24 * 7

export interface Shitpost {
  url: string
  author: string
}

const client = new RedisClient(PHRASE_PREFIX)

export async function getMeme(): Promise<Shitpost> {
  let memes: Shitpost[] = []
  try {
    let keys = await client.keys(PHRASE_PREFIX)

    for (let i in keys) {
      let match = await client.get(keys[i].substring(PHRASE_PREFIX.length))
      memes.push(JSON.parse(match))
    }
    
    return memes[Math.floor(Math.random() * memes.length)]
  } catch(e) {
    console.error(e)
    throw e
  }
}

export function addMeme(author: string, url: string) {
  let key = Math.random().toString(36).substring(7)
  let post: Shitpost = {
    author: author,
    url: url
  }
  client.setCached(key, JSON.stringify(post), WEEK)        
}