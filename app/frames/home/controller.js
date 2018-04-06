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
const neweb_1 = require("neweb");
class default_1 extends neweb_1.FrameController {
    getInitialData() {
        return __awaiter(this, void 0, void 0, function* () {
            const [tags, articlesResult] = yield Promise.all([
                this.config.context.api.tags(),
                this.getArticles(this.config.params),
            ]);
            return Object.assign({ tags }, articlesResult);
        });
    }
    onChangeParams(nextParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const articlesResult = yield this.getArticles(nextParams);
            this.set(Object.assign({}, articlesResult));
        });
    }
    getArticles(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
            const count = 5;
            const articles = yield this.config.context.api.articles({ offset: (currentPage - 1) * count, limit: count });
            const paginations = [];
            for (let i = 1; i < Math.ceil(articles.articlesCount / count) + 1; i++) {
                paginations.push(i);
            }
            return {
                currentPage,
                articles: articles.articles,
                paginations,
            };
        });
    }
}
exports.default = default_1;
