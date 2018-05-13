import { FrameController } from "neweb";
import { combineLatest, concat, from, Observable, of, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { IArticle } from "../../Api";
import Context from "../../Context";
import { ISession } from "../../ISession";
export interface IData extends IArticlesInfo {
    tags: string[];
    isAuth: boolean;
}
export interface IParams {
    page?: string;
}
interface IArticlesInfo {
    articles: IArticle[];
    paginations: number[];
    currentPage: number;
}
export default class extends FrameController<IParams, IData, Context, ISession> {
    feedType: "your" | "global";
    isAuth$: Observable<boolean>;
    tags$: Observable<any>;
    articlesInfo$: Subject<IArticlesInfo>;
    onInit() {
        this.isAuth$ = concat(of(this.config.session.get("user")), this.config.session.get$("user"))
            .pipe(map((v) => !!v));
        this.feedType = "global";
        this.tags$ = from(this.config.app.api.tags());
        this.articlesInfo$ = new Subject();
        this.subscriptions.push(
            combineLatest(
                this.isAuth$,
                this.tags$,
                this.articlesInfo$,
            ).pipe(map(([isAuth, tags, articlesInfo]) => ({
                isAuth,
                tags,
                ...articlesInfo,
            }))).subscribe(this.data$),
        );
        this.updateArticles(this.config.params);
    }
    async onChangeParams(nextParams: IParams) {
        await this.updateArticles(nextParams);
    }
    async updateArticles(params: IParams) {
        const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
        const count = 5;
        const articles = await this.config.app.api.articles({ offset: (currentPage - 1) * count, limit: count });
        const paginations = [];
        for (let i = 1; i < Math.ceil(articles.articlesCount / count) + 1; i++) {
            paginations.push(i);
        }
        this.articlesInfo$.next({
            currentPage,
            articles: articles.articles,
            paginations,
        });
    }
}
