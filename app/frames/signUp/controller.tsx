import { FrameController } from "neweb";
import { ApiRequestError, IUser } from "../../Api";
import Context from "../../Context";
export interface IData {
    errors?: string[];
}
export default class SignUpController extends FrameController<{}, IData, Context, { user: IUser }> {
    async onInit() {
        this.data$.next({});
    }
    async signUp(params: { name: string; password: string; email: string }) {
        try {
            const user = await this.config.app.api.createUser({
                username: params.name,
                email: params.email,
                password: params.password,
            });
            await this.config.session.set("user", user);
            this.config.seance.navigate("/");
        } catch (e) {
            if (e instanceof ApiRequestError && e.status === 422) {
                this.data$.next({
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
