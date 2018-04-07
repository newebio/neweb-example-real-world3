import { IPageRoute, IRequest, IRoute, IRoutePage, IRouter, IRouterConfig } from "neweb";
import o from "onemitter";
import { parse } from "querystring";
import URL = require("url");
class Router implements IRouter {
    protected routeEmitter = o<IRoute>();
    protected currentRequest: IRequest;
    protected currentPage: IRoutePage | undefined;
    constructor(protected config: IRouterConfig) {
        this.currentRequest = this.config.request;
        this.config.session.getItem("user").on((user) => {
            if (!user && this.currentPage
                && this.currentPage.rootFrame.frames.children.name !== "register"
                && this.currentPage.rootFrame.frames.children.name !== "signIn"
                && this.currentPage.rootFrame.frames.children.name !== "/") {
                this.navigate({
                    request: {
                        ...this.currentRequest,
                        url: "/login?redirect=" + this.currentRequest.url,
                    },
                });
            }
        });
    }
    public navigate(params: { request: IRequest; }) {
        this.currentRequest = params.request;
        const url = URL.parse(params.request.url);
        const urlParams = url.query ? parse(url.query) : {};
        let route: IRoute;
        switch (url.pathname) {
            case "/":
                route = this.resolveWithLayout("home", urlParams, params.request.url);
                this.currentPage = route.page;
                this.routeEmitter.emit(route);
                return;
            case "/settings":
                if (this.checkAuth()) {
                    route = this.resolveWithLayout("settings", urlParams, params.request.url);
                    this.currentPage = route.page;
                    this.routeEmitter.emit(route);
                }
                return;
            case "/register":
                route = this.resolveWithLayout("signUp", urlParams, params.request.url);
                this.currentPage = route.page;
                this.routeEmitter.emit(route);
                return;
            case "/login":
                route = this.resolveWithLayout("signIn", urlParams, params.request.url);
                this.currentPage = route.page;
                this.routeEmitter.emit(route);
                return;
            default:
                this.routeEmitter.emit({
                    type: "notFound",
                    text: "Unknown url " + params.request.url,
                });
        }
    }
    public onNewRoute(cb: any) {
        this.routeEmitter.addListener(cb);
    }
    public waitRoute() {
        return this.routeEmitter.wait();
    }
    public dispose() {
        this.routeEmitter.removeAllListeners();
    }
    protected checkAuth() {
        if (this.config.session.getItem("user").has() && this.config.session.getItem("user").get()) {
            return true;
        }
        this.routeEmitter.emit({ type: "redirect", url: "/register" });
        return false;
    }
    protected resolveWithLayout(frameName: string, params: any, url: string): IPageRoute {
        return {
            page: {
                rootFrame: {
                    params: {},
                    frames: {
                        children: {
                            name: frameName,
                            params,
                            frames: {},
                        },
                    },
                    name: "layout",
                },
                url,
            },
            type: "page",
        };
    }
}
export default Router;
