"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const command_1 = require("./command");
const phrases_1 = require("./util/phrases");
exports.client = new Discord.Client();
// Say hi
exports.client.on('ready', () => {
    console.log('Dabbing on them haters.');
});
// Create an event listener for new guild members
exports.client.on('message', msg => {
    if (msg.content.substring(0, 5) === '!yeet') {
        let split = msg.content.split(' ');
        split.shift(); // Remove '!yeet'
        let cmd = split.shift();
        let args = split.join(' ');
        if (cmd) {
            command_1.runCommand(msg, cmd, args);
        }
        else {
            command_1.runCommand(msg, 'dab');
        }
    }
    else if (!msg.content.includes('!yeet') && !msg.author.bot) {
        phrases_1.handlePhraseTriggers(msg.content).then((res) => {
            res.forEach((r) => {
                command_1.runCommand(msg, 'say', r);
            });
        });
    }
});
