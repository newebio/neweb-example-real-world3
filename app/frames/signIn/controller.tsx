import { FrameController } from "neweb";
import withError from "with-error";
import { ApiRequestError } from "../../Api";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IData {
    errors?: string[];
}
export default class SignUpController extends FrameController<any, IData, Context, ISession> {
    async getInitialData() {
        return {};
    }
    async signIn(params: { password: string; email: string }) {
        const [user, error] = await withError(() => this.config.app.api.login({
            email: params.email,
            password: params.password,
        }));
        if (!error) {
            await this.config.session.set("user", user);
            return;
        }
        if (error instanceof ApiRequestError && error.status === 422) {
            this.data$.next({
                errors: Object.keys(error.errors).map((fieldName) => {
                    return fieldName + " " + error.errors[fieldName];
                }),
            });
            return;
        }
        throw error;

    }
}
