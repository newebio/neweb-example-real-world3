import { IRequest, IRoute, IRouter, ISessionContext } from "neweb";
import { parse } from "querystring";
import URL = require("url");
class Router implements IRouter {
    public async resolve(params: { request: IRequest; session: ISessionContext }): Promise<IRoute> {
        const url = URL.parse(params.request.url);
        const urlParams = url.query ? parse(url.query) : {};
        switch (url.pathname) {
            case "/":
                return {
                    page: {
                        rootFrame: {
                            params: {},
                            frames: {
                                children: {
                                    name: "home",
                                    params: urlParams,
                                    frames: {},
                                },
                            },
                            name: "layout",
                        },
                        url: params.request.url,
                    },
                    type: "page",
                };
            default:
                return {
                    type: "notFound",
                    text: "Unknown url " + params.request.url,
                };
        }
    }
}
export default Router;
