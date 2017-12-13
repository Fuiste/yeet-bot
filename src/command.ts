import { Message } from 'discord.js'
import { DAB } from './util/emoji'

export function runCommand(message: Message, command: string, ...args) {
  console.log('Running', command, 'with args:', ...args)

  switch(command.toLowerCase()) {
    case 'say':
      say(message, ...args)
      break
    case 'dab':
      say(message, [DAB])
      break
  }
}

function say(message: Message, words?: string[]) {
  if (words) {
    message.channel.send(words.join(' '))
  } else {
    message.channel.send(DAB)
  }
}