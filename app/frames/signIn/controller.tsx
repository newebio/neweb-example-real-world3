import { FrameController } from "neweb";
import withError from "with-error";
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
        const { error, result } = await withError(() => this.config.context.api.login({
            email: params.email,
            password: params.password,
        }));
        if (!error) {
            await this.config.session.setItem("user", result);
            return;
        }
        if (error instanceof ApiRequestError && error.status === 422) {
            this.set({
                errors: Object.keys(error.errors).map((fieldName) => {
                    return fieldName + " " + error.errors[fieldName];
                }),
            });
            return;
        }
        throw error;

    }
}
