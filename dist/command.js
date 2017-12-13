"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("./util/crypto");
const emoji_1 = require("./util/emoji");
function runCommand(message, command, args) {
    console.log('Running "' + command + '" with args:', args);
    switch (command.toLowerCase()) {
        case 'crypto':
            if (args.length > 0) {
                crypto(message, args[0]);
            }
            else {
                crypto(message);
            }
            break;
        case 'dab':
            say(message, emoji_1.DAB);
            break;
        case 'say':
            say(message, args.join(' '));
            break;
    }
}
exports.runCommand = runCommand;
function say(message, note) {
    if (note) {
        message.channel.send(note);
    }
    else {
        message.channel.send(emoji_1.DAB + "try that again" + emoji_1.DAB);
    }
}
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
