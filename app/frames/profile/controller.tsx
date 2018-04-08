import { FrameController } from "neweb";
import { IArticle, IProfile } from "../../Api";
import Context from "../../Context";
export interface IData {
    articles: IArticle[];
    articlesCount: number;
    profile: IProfile;
    isAuth: boolean;
}
export interface IParams {
    username: string;
}
export default class ProfileController extends FrameController<IParams, IData, Context> {
    async getInitialData() {
        const profile = await this.config.context.api.profile(this.config.params.username);
        const articlesInfo = await this.config.context.api.articles({ author: profile.username });
        return {
            articles: articlesInfo.articles,
            articlesCount: articlesInfo.articlesCount,
            profile,
            isAuth: this.config.session.getItem("user").has() && this.config.session.getItem("user").get(),
        };
    }
}
