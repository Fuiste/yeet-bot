import { DAB } from './emoji'

const phrases = {
  "yeet": DAB,
  "energy": "༼ つ ◕_◕ ༽つ TAKE MY ENERGY ༼ つ ◕_◕ ༽つ",
  "fampai": ":3 notice me senpai :3"
}

/**
 * Returns an auto response based on the content of a message.  It's gonna look in a db eventually so it's async even
 * though right now that doesn't make a lot of sense.
 * @param content the message content to scan
 */
export async function handlePhraseTriggers(content: string): Promise<string[]> {
  let resps = []
  for(let phrase in phrases) {
    if(content.toLowerCase().includes(phrase)) {
      resps.push(phrases[phrase])
    }
  }

  return resps
}