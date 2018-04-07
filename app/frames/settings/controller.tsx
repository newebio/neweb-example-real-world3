import { FrameController } from "neweb";
import { Onemitter } from "onemitter";
import { IUser } from "../../Api";
import Context from "../../Context";
export interface IData {
    user: IUser;
}
export default class LayoutController extends FrameController<{}, IData, Context> {
    getInitialData() {
        return {
            user: this.config.session.getItem("user").get(),
        };
    }
    async logout() {
        await this.config.session.setItem("user", null);
    }
    update(user: IUser & { password: string }) {

    }
}