import { FrameController } from "neweb";
import withError from "with-error";
import { ApiRequestError } from "../../Api";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IArticlePublishInfo {
    title: string;
    description: string;
    body: string;
    tags: string;
}
export default class EditorController extends FrameController<any, any, Context, ISession> {
    async publish(params: IArticlePublishInfo) {
        const user = this.config.session.get("user");
        if (!user) {
            throw new Error("Not found user");
        }
        const token = user.token;
        const [article, error] = await withError(() => this.config.app.api.createArticle(token,
            {
                title: params.title,
                description: params.description,
                body: params.body,
                tagList: params.tags.split(","),
            }));
        if (error instanceof ApiRequestError) {
            this.data$.next({
                errors: Object.keys(error.errors).map((fieldName) => {
                    return fieldName + " " + error.errors[fieldName];
                }),
            });
            return;
        }
        if (error) {
            throw error;
        }
        this.config.seance.navigate("/article/" + article.slug);
    }
}
