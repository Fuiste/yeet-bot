import * as Discord from 'discord.js'

import { runCommand } from './command'
import { DISCORD_TOKEN } from './environment'

// Init client
const client = new Discord.Client();

// Say hi
client.on('ready', () => {
  console.log('Dab on them haters.')
});
  
// Create an event listener for new guild members
client.on('message', msg => {
  if (msg.content.substring(0, 5) === '!yeet') {
    let args = msg.content.split(' ')
    args.shift()  // Remove '!yeet'
    let cmd = args.shift()

    runCommand(msg, cmd, args)
  }
});

// Log our bot in
client.login(DISCORD_TOKEN);