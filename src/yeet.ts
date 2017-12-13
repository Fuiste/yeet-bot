import * as Discord from 'discord.js'
import * as Express from 'express'

import { runCommand } from './command'
import { DISCORD_TOKEN, PORT } from './environment'

// Init client
const client = new Discord.Client();

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
      runCommand(msg, 'say', [])
    }
  }
})

// Log our bot in
client.login(DISCORD_TOKEN);

// Set up a webserver for monitoring
const app = Express();

app.disable('x-powered-by');

app.all('*', (req, res) => {
  if (req.url === '/status') {
    // Health check
    res.status(200)
    res.contentType('text/plain')
    res.send("OK")
  }
})

app.listen(PORT, () => console.log("Yeet server is running :)"))