import { FrameController } from "neweb";
import { IArticle } from "../../Api";
import Context from "../../Context";
export interface IData {
    tags: string[];
    articles: IArticle[];
    currentPage: number;
}
export interface IParams {
    page?: string;
}
export default class extends FrameController<IParams, IData, Context> {
    async getInitialData() {
        return this.prepareData(this.config.params);
    }
    async onChangeParams(nextParams: IParams) {
        this.emit(await this.prepareData(nextParams));
    }
    async prepareData(params: IParams) {
        const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
        const count = 5;
        const [tags, articles] = await Promise.all([
            this.config.context.api.tags(),
            this.config.context.api.articles({ offset: (currentPage - 1) * count, limit: count }),
        ]);
        return {
            currentPage,
            articles,
            tags,
        };
    }
}
