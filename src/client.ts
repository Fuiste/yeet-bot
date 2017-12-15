import * as Discord from 'discord.js'

import { runCommand } from './command'
import { handlePhraseTriggers } from './util/phrases'

export const client = new Discord.Client();

// Say hi
client.on('ready', () => {
  console.log('Dabbing on them haters.')
});
  
// Create an event listener for new guild members
client.on('message', msg => {
  if (msg.content.substring(0, 5) === '!yeet') {
    let args = msg.content.split(' ')
    args.shift()  // Remove '!yeet'
    let cmd = args.shift()

    if (cmd) {
      runCommand(msg, cmd, args)
    } else {
      runCommand(msg, 'dab', [])
    }
  } else {
    handlePhraseTriggers(msg.content).then((res) => {
      runCommand(msg, 'say', [res])
    })
  }
})