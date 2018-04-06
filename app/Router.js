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
const querystring_1 = require("querystring");
const URL = require("url");
class Router {
    resolve(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = URL.parse(params.request.url);
            const urlParams = url.query ? querystring_1.parse(url.query) : {};
            switch (url.pathname) {
                case "/":
                    return this.resolveWithLayout("home", urlParams, params.request.url);
                case "/signup":
                    return this.resolveWithLayout("signUp", urlParams, params.request.url);
                default:
                    return {
                        type: "notFound",
                        text: "Unknown url " + params.request.url,
                    };
            }
        });
    }
    resolveWithLayout(frameName, params, url) {
        return {
            page: {
                rootFrame: {
                    params: {},
                    frames: {
                        children: {
                            name: frameName,
                            params,
                            frames: {},
                        },
                    },
                    name: "layout",
                },
                url,
            },
            type: "page",
        };
    }
}
exports.default = Router;
