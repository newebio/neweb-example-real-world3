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
    async signUp(params: { name: string; password: string; email: string }) {
        try {
            const user = await this.config.context.api.createUser({
                username: params.name,
                email: params.email,
                password: params.password,
            });
            await this.config.session.setItem("user", user);
            this.config.navigate("/");
        } catch (e) {
            if (e instanceof ApiRequestError && e.status === 422) {
                this.emit({ errors: e.errors });
                return;
            }
            throw e;
        }
    }
}
