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
class LayoutController extends neweb_1.FrameController {
    getInitialData() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.config.session.getItem("user");
            const user = userInfo ?
                yield this.config.context.api.user({ token: userInfo.token }) :
                undefined;
            return {
                isAuth: !!user,
                username: user ? user.username : undefined,
            };
        });
    }
}
exports.default = LayoutController;
