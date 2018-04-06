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
const Api_1 = require("../../Api");
class SignUpController extends neweb_1.FrameController {
    getInitialData() {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    signUp(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.config.context.api.createUser({
                    username: params.name,
                    email: params.email,
                    password: params.password,
                });
                yield this.config.session.setItem("user", user);
                this.config.navigate("/");
            }
            catch (e) {
                if (e instanceof Api_1.ApiRequestError && e.status === 422) {
                    this.emit({ errors: e.errors });
                    return;
                }
                throw e;
            }
        });
    }
}
exports.default = SignUpController;
