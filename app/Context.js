"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("./Api");
class Context {
    constructor(config) {
        this.config = config;
        this.logger = console;
        this.api = new Api_1.default({ endpoint: this.config.config.apiEndpoint, logger: this.logger });
    }
}
exports.default = Context;
