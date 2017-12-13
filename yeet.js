var Discord = require('discord.js');

// Init client
const client = new Discord.Client();
const tok = process.env.DISCORD_TOKEN;
const succDab = '<:dab:390534211632627713>';

// Say hi
client.on('ready', () => {
  console.log('Dab on them haters.');
});
  
// Create an event listener for new guild members
client.on('message', msg => {
  if (msg.content.includes('yeet')) {
    msg.channel.send(succDab);
  }
});

// Log our bot in
client.login(tok);