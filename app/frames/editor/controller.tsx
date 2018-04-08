import { FrameController } from "neweb";
import { ApiRequestError } from "../../Api";
import Context from "../../Context";
export interface IArticlePublishInfo {
    title: string;
    description: string;
    body: string;
    tags: string;
}
export default class EditorController extends FrameController<any, any, Context> {
    async getInitialData() {
        return {};
    }
    async publish(params: IArticlePublishInfo) {
        const token = await this.config.session.getItem("user").get().token;
        try {
            const article = await this.config.context.api.createArticle(token,
                {
                    title: params.title,
                    description: params.description,
                    body: params.body,
                    tagList: params.tags.split(","),
                });
            this.config.navigate("/article/" + article.slug);
        } catch (e) {
            if (e instanceof ApiRequestError) {
                this.set({
                    errors: Object.keys(e.errors).map((fieldName) => {
                        return fieldName + " " + e.errors[fieldName];
                    }),
                });
                return;
            }
            throw e;
        }
    }
}
