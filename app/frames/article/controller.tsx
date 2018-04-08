import { FrameController } from "neweb";
import { IArticle } from "../../Api";
import Context from "../../Context";
export interface IData {
    article: IArticle;
}
export interface IParams {
    slug: string;
}
export default class ArticleController extends FrameController<IParams, IData, Context> {
    async getInitialData() {
        return {
            article: await this.config.context.api.article(this.config.params.slug),
        };
    }
}
