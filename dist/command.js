"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("./util/crypto");
const emoji_1 = require("./util/emoji");
const phrases_1 = require("./util/phrases");
function runCommand(message, command, args) {
    console.log('Running "' + command + '" with args:', args || 'none');
    switch (command.toLowerCase()) {
        case 'crypto':
            crypto(message, args);
            break;
        case 'dab':
            say(message, emoji_1.DAB);
            break;
        case 'learn':
            learn(message, args);
            break;
        case 'say':
            say(message, args);
            break;
    }
}
exports.runCommand = runCommand;
function crypto(message, currency) {
    if (currency) {
        crypto_1.getCoin(currency).then((coin) => {
            say(message, '```\n' + crypto_1.formatCoin(coin, 12, true) + '\n```');
        }, () => {
            say(message, "Uh oh... I had some trouble grabbing the info, try again later!");
        });
    }
    else {
        crypto_1.top10().then((coins) => {
            let formatted = '```\nTop 10 cryptos:\n\n';
            coins.forEach(coin => {
                formatted += crypto_1.formatCoin(coin, 12, false) + '\n';
            });
            say(message, formatted + '\n```');
        }, () => {
            say(message, "Uh oh... I had some trouble grabbing the info, try again later!");
        });
    }
}
function learn(message, args) {
    if (!args) {
        message.channel.send("Teach me to listen for phrases like this:\n\n!yeet learn \"Sheldor\" \"Bazinga Zimbabwe\"");
        return;
    }
    // Regex out the quotes to learn
    let newPhrase = args.match(/("([^"]|"")*")/g);
    if (!newPhrase) {
        message.channel.send("Teach me to listen for phrases like this:\n\n`!yeet learn \"Sheldor\", \"Bazinga Zimbabwe\"`");
    }
    else if (newPhrase.length !== 2) {
        message.channel.send("You need to send me a **phrase** and a **response**...");
    }
    else {
        phrases_1.learnPhrase(newPhrase[0].replace('"', ''), newPhrase[1].replace('"', ''));
        message.channel.send("Got it, for the next 24 hours, when someone says, \"" + newPhrase[0] + "\" I'll say, \"" + newPhrase[1] + "\"");
    }
}
function say(message, note) {
    if (note) {
        message.channel.send(note);
    }
    else {
        message.channel.send(emoji_1.DAB + "try that again" + emoji_1.DAB);
    }
}
