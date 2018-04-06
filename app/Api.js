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
    doGetRequest(endpoint, params, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params || {};
            const logger = this.config.logger;
            logger.log("Api::GetRequest", endpoint, params, headers);
            const response = yield node_fetch_1.default(this.config.endpoint + "/" + endpoint + "?" +
                querystring.stringify(params), { headers });
            if (response.status === 422) {
                throw new ApiRequestError({
                    status: response.status,
                    errors: (yield response.json()).errors,
                });
            }
            if (response.status !== 200) {
                throw new Error("Invalid response, status - "
                    + response.status + "::" + response.statusText);
            }
            const result = yield response.json();
            logger.log("Api::Result", result);
            return result;
        });
    }
    doPostRequest(endpoint, params, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params || {};
            const logger = this.config.logger;
            logger.log("Api::PostRequest", endpoint, params, headers);
            const response = yield node_fetch_1.default(this.config.endpoint + "/" + endpoint, {
                method: "POST",
                headers: Object.assign({ "Content-Type": "application/json; charset=utf-8" }, (headers || {})),
                body: JSON.stringify(params),
            });
            if (response.status === 422) {
                throw new ApiRequestError({
                    status: response.status,
                    errors: (yield response.json()).errors,
                });
            }
            if (response.status !== 200) {
                throw new Error("Invalid response, status - "
                    + response.status + "::" + response.statusText);
            }
            const result = yield response.json();
            logger.log("Api::Result", result);
            return result;
        });
    }
    user(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.doGetRequest("user", {}, { Authorization: "Token " + params.token })).user;
        });
    }
    createUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.doPostRequest("users", { user: params })).user;
        });
    }
    tags() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.doGetRequest("tags")).tags;
        });
    }
    articles(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.doGetRequest("articles", params);
        });
    }
}
// tslint:disable-next-line:max-classes-per-file
class ApiRequestError {
    constructor(params) {
        this.status = 0;
        this.status = params.status;
        this.errors = params.errors;
    }
}
exports.ApiRequestError = ApiRequestError;
exports.default = Api;
