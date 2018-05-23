import { DAB } from './emoji'
import { RedisClient } from './redis'

const PHRASE_PREFIX = 'triggerphrase_'

const phrases = {
  "yeet": DAB,
  "energy": "༼ つ ◕_◕ ༽つ TAKE MY ENERGY ༼ つ ◕_◕ ༽つ",
  "fampai": ":3 notice me senpai :3",
  "succ": "°°°·.°·..·°¯°·._.· 𝕊 𝕌 ℂ ℂ ·._.·°¯°·.·° .·°°°",
  "hodl": "```\nI type d that tyitle twice because I knew it was wrong the first time.  Still wrong.  w/e.  GF's out at a lesbian bar, BTC crashing WHY AM I HOLDING? I'LL TELL YOU WHY.  It's because I'm a bad trader and I KNOW I'M A BAD TRADER.  Yeah you good traders can spot the highs and the lows pit pat piffy wing wong wang just like that and make a millino bucks sure no problem bro.  Likewise the weak hands are like OH NO IT'S GOING DOWN I'M GONNA SELL he he he and then they're like OH GOD MY ASSHOLE when the SMART traders who KNOW WHAT THE FUCK THEY'RE DOING buy back in but you know what?  I'm not part of that group.  When the traders buy back in I'm already part of the market capital so GUESS WHO YOU'RE CHEATING day traders NOT ME~!  Those taunt threads saying 'OHH YOU SHOULD HAVE SOLD' YEAH NO SHIT.  NO SHIT I SHOULD HAVE SOLD.  I SHOULD HAVE SOLD MOMENTS BEFORE EVERY SELL AND BOUGHT MOMENTS BEFORE EVERY BUY BUT YOU KNOW WHAT NOT EVERYBODY IS AS COOL AS YOU.  You only sell in a bear market if you are a good day trader or an illusioned noob.  The people inbetween hold.  In a zero-sum game such as this, traders can only take your money if you sell.\n```"
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
    let keys = await client.keys()

    for (let i in keys) {
      if (content.toLowerCase().includes(keys[i].toLowerCase())) {
        let match = await client.get(keys[i])
        resps.push(match)
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