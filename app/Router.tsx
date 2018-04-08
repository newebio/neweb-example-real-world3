import {
    ClassicRouter, IRequest,
    MatchedRoute, PageRouteByFrame, PageRouteWithParent, RouteWithRedirectOn,
} from "neweb";
export default class Router extends ClassicRouter {
    onInit() {
        this.addRoute(MatchedRoute({ path: "/" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "home",
            }))));
        this.addRoute(MatchedRoute({ path: "/register" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "signUp",
            }))));
        this.addRoute(MatchedRoute({ path: "/login" }, RouteWithRedirectOn({
            condition: () => {
                const user = this.config.session.getItem("user");
                return (user && user.has() && user.get());
            },
            url: (_, context) => context.params && context.params.redirect ? context.params.redirect : "/",
        },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "signIn",
            })))));
        this.addRoute(MatchedRoute({ path: "/profile/:username" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "profile",
            }))));
        this.addRoute(MatchedRoute({ path: "/article/:slug" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "article",
            }))));

        const withLogin = {
            condition: () => {
                const user = this.config.session.getItem("user");
                return !(user && user.has() && user.get());
            },
            url: (request: IRequest) => "/login?redirect=" + request.url,
        };
        this.addRoute(MatchedRoute({ path: "/settings" },
            RouteWithRedirectOn(withLogin, PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "settings",
            })))));
        this.addRoute(MatchedRoute({ path: "/editor" },
            RouteWithRedirectOn(withLogin, PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "editor",
            })))));
        this.config.session.getItem("user").on(() => {
            this.navigate({ request: this.currentRequest });
        });
    }
}
