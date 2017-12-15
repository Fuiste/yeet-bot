import { DAB } from './emoji'
import { RedisClient } from './redis'

const PHRASE_PREFIX = 'triggerphrase_'

const phrases = {
  "yeet": DAB,
  "energy": "༼ つ ◕_◕ ༽つ TAKE MY ENERGY ༼ つ ◕_◕ ༽つ",
  "fampai": ":3 notice me senpai :3"
}

const client = new RedisClient(PHRASE_PREFIX)

/**
 * Returns auto response(s) based on the content of a message.
 * @param content the message content to scan
 */
export async function handlePhraseTriggers(content: string): Promise<string[]> {
  let resps = []

  // Check the hardcoded phrases
  for (let phrase in phrases) {
    if (content.toLowerCase().includes(phrase)) {
      resps.push(phrases[phrase])
    }
  }

  try {
    let keys = await client.keys(PHRASE_PREFIX)
    console.log(keys)

    for (let phrase in keys) {
      if (content.toLowerCase().includes(phrase.substring(PHRASE_PREFIX.length - 1))) {
        let match = await client.get(phrase.substring(PHRASE_PREFIX.length - 1))
        console.log("FOUND: " + match)
        console.log("FOR KEY: " + phrase.substring(PHRASE_PREFIX.length - 1))
      }
    }
  } catch(e) {
    throw e
  }
  return resps
}

export function learnPhrase(key: string, value: string) {
  client.setCached(key, value)        
}