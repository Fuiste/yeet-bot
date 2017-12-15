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
const phrases = {
    "yeet": emoji_1.DAB,
    "energy": "༼ つ ◕_◕ ༽つ TAKE MY ENERGY ༼ つ ◕_◕ ༽つ",
    "fampai": ":3 notice me senpai :3"
};
/**
 * Returns an auto response based on the content of a message.  It's gonna look in a db eventually so it's async even
 * though right now that doesn't make a lot of sense.
 * @param content the message content to scan
 */
function handlePhraseTriggers(content) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let phrase in phrases) {
            if (content.includes(phrase)) {
                return phrases[phrase];
            }
        }
        throw null;
    });
}
exports.handlePhraseTriggers = handlePhraseTriggers;
