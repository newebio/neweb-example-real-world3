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
const node_fetch_1 = require("node-fetch");
const querystring = require("querystring");
class Api {
    constructor(config) {
        this.config = config;
    }
    doGetRequest(endpoint, params) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params || {};
            const logger = this.config.logger;
            logger.log("Api::GetRequest", endpoint, params);
            const response = yield node_fetch_1.default(this.config.endpoint + "/" + endpoint + "?" +
                querystring.stringify(params));
            if (response.status !== 200) {
                throw new Error("Invalid response, status - "
                    + response.status + "::" + response.statusText +
                    ", body - " + (yield response.text()));
            }
            return response.json();
        });
    }
    tags() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.doGetRequest("tags")).tags;
        });
    }
    articles(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.doGetRequest("articles", params)).articles;
        });
    }
}
exports.default = Api;
