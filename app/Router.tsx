import {
    ClassicRouter, MatchedRoute,
    PageRouteByFrame, PageRouteWithParent, RouteWithRedirectOn,
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
        this.addRoute(MatchedRoute({ path: "/settings" },
            RouteWithRedirectOn({
                condition: () => {
                    const user = this.config.session.getItem("user");
                    return !(user && user.has() && user.get());
                },
                url: (request) => "/login?redirect=" + request.url,
            }, PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "settings",
            })))));
        this.config.session.getItem("user").on(() => {
            this.navigate({ request: this.currentRequest });
        });
    }
}
