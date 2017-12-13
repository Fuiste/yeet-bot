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
const api_1 = require("./api");
const api = new api_1.Api('https://api.coinmarketcap.com/v1');
function formatCoin(coin, column, verbose) {
    let formatted = '';
    const spaces = ' '.repeat(column);
    if (verbose) {
        formatted += coin.name + ', rank ' + coin.rank + '\n';
        for (const key of Object.keys(coin)) {
            if (key !== 'rank' && key !== 'name') {
                formatted += '\n' + (key + spaces).slice(0, column - 1) + (coin[key] + spaces).slice(0, column - 1);
            }
        }
    }
    else {
        formatted += (coin.rank + '.   ').slice(0, 3);
        formatted += (coin.name + ' '.repeat(column)).slice(0, column - 1);
        formatted += (' $' + coin.usd).slice(0, 9);
    }
    return formatted;
}
exports.formatCoin = formatCoin;
function top10() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield api.get('/ticker/?limit=10');
            let top = [];
            res.forEach(coin => {
                top.push({
                    change1: coin.percent_change_1h + '%',
                    change24: coin.percent_change_24h + '%',
                    change7: coin.percent_change_7d + '%',
                    name: coin.name,
                    rank: coin.rank,
                    symbol: coin.symbol,
                    usd: coin.price_usd
                });
            });
            return top;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.top10 = top10;
function getCoin(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let coin = yield api.get('/ticker/' + id.toLowerCase());
            coin = coin[0];
            return {
                change1: coin.percent_change_1h + '%',
                change24: coin.percent_change_24h + '%',
                change7: coin.percent_change_7d + '%',
                name: coin.name,
                rank: coin.rank,
                symbol: coin.symbol,
                usd: coin.price_usd
            };
        }
        catch (e) {
            throw e;
        }
    });
}
exports.getCoin = getCoin;
