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
const redis_1 = require("./redis");
const PHRASE_PREFIX = 'memetics_';
const WEEK = 60 * 60 * 24 * 7;
const baseMemes = [
    {
        url: "https://i.imgur.com/UyR5DBH.png",
        author: "@fuiste#1293"
    }
];
const client = new redis_1.RedisClient(PHRASE_PREFIX);
function getMeme() {
    return __awaiter(this, void 0, void 0, function* () {
        let memes = baseMemes;
        try {
            let keys = yield client.keys(PHRASE_PREFIX);
            for (let i in keys) {
                let match = yield client.get(keys[i].substring(PHRASE_PREFIX.length));
                memes.push(JSON.parse(match));
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        console.log(memes);
        return memes[Math.floor(Math.random() * memes.length - 1)];
    });
}
exports.getMeme = getMeme;
function addMeme(author, url) {
    let key = Math.random().toString(36).substring(7);
    let post = {
        author: author,
        url: url
    };
    client.setCached(key, JSON.stringify(post), WEEK);
}
exports.addMeme = addMeme;
