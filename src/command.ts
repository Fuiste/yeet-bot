import { Message } from 'discord.js'
import * as isUrl from 'is-url'

import { client } from './client'
import { formatCoin, getCoin, top10 } from './util/crypto'
import { DAB } from './util/emoji'
import { addMeme, getMeme } from './util/memes'
import { learnPhrase } from './util/phrases'

const HELP: string = "Here's what I can do:\n\n" 
  + "```\n\!yeet crypto\n```\n\nPrices out the top 10 cryptocurrencies, you can get more specific info on a currency by specifying a name.\n\n"
  + "```\n\!yeet dab\n```\n\nUhh...\n\n"
  + "```\n\!yeet game\n```\n\nSet the bot's game\n\n"
  + "```\n\!yeet learn\n```\n\nLearns a phrase and response for the next 24 hours.  The trigger phrase will be the first quoted string and the response will be the second.\n\n"
  + "```\n\!yeet meme\n```\n\nEither posts or learns a meme from the vault, with credit to the original submitter.  Memes **must** be URL's.\n\n"
  + "```\n\!yeet nick\n```\n\nChange the bot's nickname on a given server.  You _need_ to give it the right permissions for this to work.\n\n"
  + "```\n\!yeet say\n```\n\nSays a thing.\n\n"
  + "```\n\!yeet yell\n```\n\nLike say, but with text to speech."

export function runCommand(message: Message, command: string, args?: string) {
  console.log('Running "' + command + '" with args:', args || 'none')

  switch(command.toLowerCase()) {
    case 'crypto':
      crypto(message, args)
      break
    case 'dab':
      say(message, DAB)
      break
    case 'game':
      client.user.setGame(args ? args : 'Dick Kickem 2')
      say(message, DAB)
      break
    case 'help':
      say(message, HELP)
      break
    case 'learn':
      learn(message, args)
      break
    case 'meme':
      meme(message, args)
      break
    case 'nick':
      message.guild.members.get(client.user.id).setNickname(args ? args : 'YeetBot')
      say(message, DAB)
      break
    case 'say':
      say(message, args)
      break
    case 'yell':
      say(message, args, true)
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
    learnPhrase(newPhrase[0].substring(1, newPhrase[0].length - 1), newPhrase[1].substring(1, newPhrase[1].length - 1))
    say(message, DAB)
  }
}

async function meme(message: Message, args?: string) {
  if (!args) {
    try {
      let meme = await getMeme()
      message.channel.send(`Submitted by ${meme.author}`, {embed: {image: {url: meme.url}}})
    } catch(e) {
      console.error(e)
      say(message, "Memes are hard right now, try again later")
    }
  } else {
    console.log(`Adding meme '${args}' by ${message.author.toString()}`)
    if (isUrl(args)) {
      addMeme(message.author.toString(), args)
      say(message, DAB)
    } else {
      say(message, "That isn't a valid URL...")
    }
  }
}

function say(message: Message, note?: string, tts?: boolean) {
  if (note) {
    message.channel.send(note, {tts: tts})
  } else {
    message.channel.send(DAB + "try that again" + DAB, {tts: tts})
  }
}