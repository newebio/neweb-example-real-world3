import { FrameController } from "neweb";
import { combineLatest as CombineLatest, from, of } from "rxjs";
import { map } from "rxjs/operators";
import { IArticle, IArticleComment, IUser } from "../../Api";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IData {
    article: IArticle;
    comments: IArticleComment[];
    user: IUser;
}
export interface IParams {
    slug: string;
}
export default class ArticleController extends FrameController<IParams, IData, Context, ISession> {
    async  onInit() {
        const currentUser = this.config.session.get("user");
        if (!currentUser) {
            throw new Error("Need user");
        }
        const data = CombineLatest(
            from(this.config.app.api.article(this.config.params.slug)),
            from(this.config.app.api.articleComments(this.config.params.slug)),
            of(currentUser),
        );
        this.subscriptions.push(
            data.pipe(map(([article, comments, user]) => ({
                article,
                comments,
                user,
            }))).subscribe(this.data$),
        );
    }
}
