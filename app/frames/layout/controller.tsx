import { FrameController } from "neweb";
import Context from "../../Context";
export interface IData {
    isAuth: boolean;
    username?: string;
}
export default class LayoutController extends FrameController<{}, IData, Context> {
    async getInitialData() {
        const userInfo = await this.config.session.getItem("user");
        const user = userInfo ?
            await this.config.context.api.user({ token: userInfo.token }) :
            undefined;
        return {
            isAuth: !!user,
            username: user ? user.username : undefined,
        };
    }
}
