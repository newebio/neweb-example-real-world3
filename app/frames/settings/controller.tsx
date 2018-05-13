import { FrameController } from "neweb";
import { IUser } from "../../Api";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IData {
    user: IUser;
}
export default class LayoutController extends FrameController<{}, IData, Context, ISession> {
    onInit() {
        const user = this.config.session.get("user");
        if (!user) {
            throw new Error("Need user");
        }
        this.data$.next({
            user,
        });
    }
    async logout() {
        await this.config.session.set("user", null);
    }
    update(_: IUser & { password: string }) {
        //
    }
}
