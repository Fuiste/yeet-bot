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
const emoji_1 = require("./emoji");
const redis_1 = require("./redis");
const PHRASE_PREFIX = 'triggerphrase_';
const phrases = {
    "yeet": emoji_1.DAB,
    "energy": "༼ つ ◕_◕ ༽つ TAKE MY ENERGY ༼ つ ◕_◕ ༽つ",
    "fampai": ":3 notice me senpai :3"
};
const client = new redis_1.RedisClient(PHRASE_PREFIX);
/**
 * Returns auto response(s) based on the content of a message.
 * @param content the message content to scan
 */
function handlePhraseTriggers(content) {
    return __awaiter(this, void 0, void 0, function* () {
        let resps = [];
        // Check the hardcoded phrases
        for (let phrase in phrases) {
            if (content.toLowerCase().includes(phrase)) {
                resps.push(phrases[phrase]);
            }
        }
        try {
            let keys = yield client.keys(PHRASE_PREFIX);
            console.log(keys);
            for (let phrase in keys) {
                if (content.toLowerCase().includes(phrase.substring(PHRASE_PREFIX.length - 1))) {
                    let match = yield client.get(phrase.substring(PHRASE_PREFIX.length - 1));
                    console.log("FOUND: " + match);
                    console.log("FOR KEY: " + phrase.substring(PHRASE_PREFIX.length - 1));
                }
            }
        }
        catch (e) {
            throw e;
        }
        return resps;
    });
}
exports.handlePhraseTriggers = handlePhraseTriggers;
function learnPhrase(key, value) {
    client.setCached(key, value);
}
exports.learnPhrase = learnPhrase;
