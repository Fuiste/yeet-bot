import * as Discord from 'discord.js'

import { runCommand } from './command'
import { DISCORD_TOKEN } from './environment'

// Init client
const client = new Discord.Client();
const succDab = '<:dab:390534211632627713>';

// Say hi
client.on('ready', () => {
  console.log('Dab on them haters.')
});
  
// Create an event listener for new guild members
client.on('message', msg => {
  if (msg.content.substring(0, 1) === '!yeet') {
    let args = msg.content.split(' ')
    args.shift()  // Remove '!yeet'
    let cmd = args.shift()

    console.log(cmd)
    console.log(args)
    runCommand(cmd, args)
  } else {
    if (msg.content.includes('yeet')) {
      msg.channel.send(succDab)
    }
  }
});

// Log our bot in
client.login(DISCORD_TOKEN);