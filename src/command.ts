import { Message } from 'discord.js'

import { formatCoin, getCoin, top10 } from './util/crypto'
import { DAB } from './util/emoji'
// import { learnPhrase } from './util/phrases'

export function runCommand(message: Message, command: string, args?: string) {
  console.log('Running "' + command + '" with args:', args || 'none')

  switch(command.toLowerCase()) {
    case 'crypto':
      crypto(message, args)
      break
    case 'dab':
      say(message, DAB)
      break
    case 'learn':
      learn(message, args)
      break
    case 'say':
      say(message, args)
      break
  }
}

function crypto(message: Message, currency?: string) {
  if (currency) {
    getCoin(currency).then((coin) => {
      say(message, '```\n' + formatCoin(coin, 12, true) + '\n```')
    }, () => {
      say(message, "Uh oh... I had some trouble grabbing the info, try again later!")
    })
  } else {
    top10().then((coins) => {
      let formatted = '```\nTop 10 cryptos:\n\n'
      coins.forEach(coin => {
        formatted += formatCoin(coin, 12, false) + '\n'
      })
      say(message, formatted + '\n```')
    }, () => {
      say(message, "Uh oh... I had some trouble grabbing the info, try again later!")
    })
  }
}

function learn(message: Message, args?: string) {
  if (!args) {
    message.channel.send("Teach me to listen for phrases like this:\n\n!yeet learn \"Sheldor\" \"Bazinga Zimbabwe\"")
    return
  }

  // Regex out the quotes to learn
  let newPhrase = args.match(/("([^"]|"")*")/g)

  if (!newPhrase) {
    message.channel.send("Teach me to listen for phrases like this:\n\n`!yeet learn \"Sheldor\", \"Bazinga Zimbabwe\"`")
  } else if (newPhrase.length !== 2) {
    message.channel.send("You need to send me a **phrase** and a **response**...")
  } else {
    // learnPhrase(newPhrase[0].substring(1, newPhrase[0].length - 1), newPhrase[1].substring(1, newPhrase[1].length - 1))
    message.channel.send("Got it, for the next 24 hours, when someone says, \"" + newPhrase[0] + "\" I'll say, \"" + newPhrase[1] + "\"")
  }
}

function say(message: Message, note?: string) {
  if (note) {
    message.channel.send(note)
  } else {
    message.channel.send(DAB + "try that again" + DAB)
  }
}