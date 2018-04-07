import { FrameController } from "neweb";
import { ApiRequestError } from "../../Api";
import Context from "../../Context";
export interface IData {
    errors?: string[];
}
export default class SignUpController extends FrameController<any, IData, Context> {
    async getInitialData() {
        return {};
    }
    async signIn(params: { password: string; email: string }) {
        try {
            const user = await this.config.context.api.login({
                email: params.email,
                password: params.password,
            });
            await this.config.session.setItem("user", user);
            this.config.navigate("/");
        } catch (e) {
            if (e instanceof ApiRequestError && e.status === 422) {
                this.set({
                    errors: Object.keys(e.errors).map((fieldName) => {
                        return fieldName + " " + e.errors[fieldName];
                    }),
                });
                return;
            }
            throw e;
        }
    }
}
