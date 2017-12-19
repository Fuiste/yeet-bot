"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("./util/crypto");
const emoji_1 = require("./util/emoji");
const memes_1 = require("./util/memes");
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
        case 'meme':
            meme(message, args);
            break;
        case 'say':
            say(message, args);
            break;
        case 'yell':
            say(message, args, true);
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
        phrases_1.learnPhrase(newPhrase[0].substring(1, newPhrase[0].length - 1), newPhrase[1].substring(1, newPhrase[1].length - 1));
        message.channel.send("Got it, for the next 24 hours, when someone says, \"" +
            newPhrase[0].substring(1, newPhrase[0].length - 1) + "\" I'll say, \"" +
            newPhrase[1].substring(1, newPhrase[1].length - 1) + "\"");
    }
}
function meme(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!args) {
            try {
                let meme = yield memes_1.getMeme();
                console.log(meme);
                message.channel.sendEmbed({ url: meme.url, description: `Submitted by @${message.author.tag}` });
            }
            catch (e) {
                console.error(e);
                say(message, "Memes are hard right now, try again later");
            }
        }
    });
}
function say(message, note, tts) {
    if (note) {
        message.channel.send(note, { tts: tts });
    }
    else {
        message.channel.send(emoji_1.DAB + "try that again" + emoji_1.DAB, { tts: tts });
    }
}
