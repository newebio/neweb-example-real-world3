import { FrameController } from "neweb";
import { IArticle, IArticleComment, IUser } from "../../Api";
import Context from "../../Context";
export interface IData {
    article: IArticle;
    comments: IArticleComment[];
    user?: IUser;
}
export interface IParams {
    slug: string;
}
export default class ArticleController extends FrameController<IParams, IData, Context> {
    async getInitialData() {
        return {
            article: await this.config.context.api.article(this.config.params.slug),
            comments: await this.config.context.api.articleComments(this.config.params.slug),
            user: this.config.session.getItem("user").has() ? this.config.session.getItem("user").get() : undefined,
        };
    }
}
