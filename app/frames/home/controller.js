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
            return this.prepareData(this.config.params);
        });
    }
    onChangeParams(nextParams) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit(yield this.prepareData(nextParams));
        });
    }
    prepareData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
            const count = 5;
            const [tags, articles] = yield Promise.all([
                this.config.context.api.tags(),
                this.config.context.api.articles({ offset: (currentPage - 1) * count, limit: count }),
            ]);
            return {
                currentPage,
                articles,
                tags,
            };
        });
    }
}
exports.default = default_1;
