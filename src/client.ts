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
    let split = msg.content.split(' ')
    split.shift()  // Remove '!yeet'
    let cmd = split.shift()
    let args = split.join(' ')

    if (cmd) {
      runCommand(msg, cmd, args)
    } else {
      runCommand(msg, 'dab')
    }
  } else {
    handlePhraseTriggers(msg.content).then((res) => {
      res.forEach((r) => {
        runCommand(msg, 'say', r)
      })
    })
  }
})