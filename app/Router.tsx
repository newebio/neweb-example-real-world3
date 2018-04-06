import { IPageRoute, IRequest, IRoute, IRouter, ISessionContext } from "neweb";
import { parse } from "querystring";
import URL = require("url");
class Router implements IRouter {
    public async resolve(params: { request: IRequest; session: ISessionContext }): Promise<IRoute> {
        const url = URL.parse(params.request.url);
        const urlParams = url.query ? parse(url.query) : {};
        switch (url.pathname) {
            case "/":
                return this.resolveWithLayout("home", urlParams, params.request.url);
            case "/signup":
                return this.resolveWithLayout("signUp", urlParams, params.request.url);
            default:
                return {
                    type: "notFound",
                    text: "Unknown url " + params.request.url,
                };
        }
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
