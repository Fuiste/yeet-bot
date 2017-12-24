import { RedisClient } from './redis'

const PHRASE_PREFIX = 'quotations_'
const WEEK = 60 * 60 * 24 * 7

export interface Quote {
  text: string
  author: string
}

const client = new RedisClient(PHRASE_PREFIX)

export async function getQuote(): Promise<Quote> {
  let quotes: Quote[] = []
  try {
    let keys = await client.keys()

    for (let i in keys) {
      let match = await client.get(keys[i])
      quotes.push(JSON.parse(match))
    }
    return quotes[Math.floor(Math.random() * new Date().getTime() * quotes.length) % quotes.length]
  } catch(e) {
    console.error(e)
    throw e
  }
}

export function addQuote(author: string, text: string) {
  let key = Math.random().toString(36).substring(7)
  let post: Quote = {
    author: author,
    text: text
  }
  client.setCached(key, JSON.stringify(post), WEEK)        
}