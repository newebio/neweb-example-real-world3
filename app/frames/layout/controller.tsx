import { FrameController } from "neweb";
import { Onemitter } from "onemitter";
import { IUser } from "../../Api";
import Context from "../../Context";
export interface IData {
    isAuth: boolean;
    username?: string;
}
export default class LayoutController extends FrameController<{}, IData, Context> {
    userEmitter: Onemitter<IUser | undefined>;
    onInit() {
        this.userEmitter = this.config.session.getItem("user");
        this.userEmitter.on(async (userInfo) => {
            this.emit(await this.prepareData(userInfo));
        });
    }
    async prepareData(userInfo: IUser | undefined) {
        const user = userInfo ?
            await this.config.context.api.user({ token: userInfo.token }) :
            undefined;
        return {
            isAuth: !!user,
            username: user ? user.username : undefined,
        };
    }
    async getInitialData() {
        const userInfo = this.userEmitter.has() ? this.userEmitter.get() : undefined;
        return this.prepareData(userInfo);
    }
}
