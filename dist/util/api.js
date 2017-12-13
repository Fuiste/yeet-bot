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
const request = require("superagent");
class Api {
    constructor(host, debug) {
        this.host = host;
        this.debug = debug;
        if (!debug) {
            this.debug = false;
        }
    }
    _call(endpoint, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debug) {
                console.log(`[API] - ${config.method.toUpperCase()} - ${this.host + endpoint}`);
            }
            let req = request(config.method, this.host + endpoint);
            if (config.body) {
                req = req.send(config.body);
            }
            req = req.set("Content-type", "application/json");
            try {
                const res = yield req;
                if (res.ok) {
                    return res.body;
                }
                else {
                    throw res.body;
                }
            }
            catch (e) {
                if (e.response && e.response.body) {
                    throw e.response.body;
                }
                else {
                    throw e;
                }
            }
        });
    }
    del(endpoint) {
        return this._call(endpoint, {
            method: 'delete'
        });
    }
    get(endpoint) {
        return this._call(endpoint, {
            method: 'get'
        });
    }
    post(endpoint, body) {
        return this._call(endpoint, {
            method: 'post',
            body: body
        });
    }
    patch(endpoint, body) {
        return this._call(endpoint, {
            method: 'patch',
            body: body
        });
    }
}
exports.Api = Api;
