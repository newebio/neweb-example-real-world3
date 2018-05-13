import { FrameController } from "neweb";
import { IArticle, IProfile } from "../../Api";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IData {
    articles: IArticle[];
    articlesCount: number;
    profile: IProfile;
    isAuth: boolean;
}
export interface IParams {
    username: string;
}
export default class ProfileController extends FrameController<IParams, IData, Context, ISession> {
    async onInit() {
        const profile = await this.config.app.api.profile(this.config.params.username);
        const articlesInfo = await this.config.app.api.articles({ author: profile.username });
        this.data$.next({
            articles: articlesInfo.articles,
            articlesCount: articlesInfo.articlesCount,
            profile,
            isAuth: this.config.session.has("user") && !!this.config.session.get("user"),
        });
    }
}
