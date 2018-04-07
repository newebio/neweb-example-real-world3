import { FrameController } from "neweb";
import { IArticle } from "../../Api";
import Context from "../../Context";
export interface IData {
    tags: string[];
    articles: IArticle[];
    paginations: number[];
    currentPage: number;
    isAuth: boolean;
}
export interface IParams {
    page?: string;
}
export default class extends FrameController<IParams, IData, Context> {
    async getInitialData() {
        const [tags, articlesResult, user] = await Promise.all([
            this.config.context.api.tags(),
            this.getArticles(this.config.params),
            this.config.session.getItem("user"),
        ]);
        return {
            isAuth: !!user,
            tags,
            ...articlesResult,
        };
    }
    async onChangeParams(nextParams: IParams) {
        const articlesResult = await this.getArticles(nextParams);
        this.set({ ...articlesResult });
    }
    async getArticles(params: IParams) {
        const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
        const count = 5;
        const articles = await this.config.context.api.articles({ offset: (currentPage - 1) * count, limit: count });
        const paginations = [];
        for (let i = 1; i < Math.ceil(articles.articlesCount / count) + 1; i++) {
            paginations.push(i);
        }
        return {
            currentPage,
            articles: articles.articles,
            paginations,
        };
    }
}
