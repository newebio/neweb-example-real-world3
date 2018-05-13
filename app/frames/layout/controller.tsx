import { FrameController } from "neweb";
import { concat, from, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IData {
    isAuth: boolean;
    username?: string;
}
export default class LayoutController extends FrameController<{}, IData, Context, ISession> {
    onInit() {
        const currentUser = this.config.session.get("user") || null;
        this.subscriptions.push(
            concat(of(currentUser),
                this.config.session.get$("user")
                    .pipe(
                        switchMap((userInfo) =>
                            userInfo ?
                                from(this.config.app.api.user({ token: userInfo.token })) :
                                of(undefined),
                        )))
                .pipe(map((user) => ({
                    isAuth: !!user,
                    username: user ? user.username : undefined,
                })))
                .subscribe(this.data$),
        );
    }
}
