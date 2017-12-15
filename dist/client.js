"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const command_1 = require("./command");
exports.client = new Discord.Client();
// Say hi
exports.client.on('ready', () => {
    console.log('Dabbing on them haters.');
});
// Create an event listener for new guild members
exports.client.on('message', msg => {
    if (msg.content.substring(0, 5) === '!yeet') {
        let args = msg.content.split(' ');
        args.shift(); // Remove '!yeet'
        let cmd = args.shift();
        if (cmd) {
            command_1.runCommand(msg, cmd, args);
        }
        else {
            command_1.runCommand(msg, 'say', []);
        }
    }
});
