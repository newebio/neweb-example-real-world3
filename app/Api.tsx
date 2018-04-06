import fetch from "node-fetch";
import querystring = require("querystring");
export interface IApiConfig {
    endpoint: string;
    logger: typeof console;
}
export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    };
}
export interface IUser {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string | null;
}
class Api {
    constructor(protected config: IApiConfig) { }
    public async doGetRequest(
        endpoint: string,
        params?: { [index: string]: any },
        headers?: { [index: string]: string },
    ) {
        params = params || {};
        const logger = this.config.logger;
        logger.log("Api::GetRequest", endpoint, params, headers);
        const response = await fetch(this.config.endpoint + "/" + endpoint + "?" +
            querystring.stringify(params), { headers });
        if (response.status === 422) {
            throw new ApiRequestError({
                status: response.status,
                errors: (await response.json()).errors,
            });
        }
        if (response.status !== 200) {
            throw new Error("Invalid response, status - "
                + response.status + "::" + response.statusText);
        }
        const result = await response.json();
        logger.log("Api::Result", result);
        return result;
    }
    public async doPostRequest(
        endpoint: string,
        params?: { [index: string]: any },
        headers?: { [index: string]: string },
    ) {
        params = params || {};
        const logger = this.config.logger;
        logger.log("Api::PostRequest", endpoint, params, headers);
        const response = await fetch(this.config.endpoint + "/" + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                ...(headers || {}),
            },
            body: JSON.stringify(params),
        });
        if (response.status === 422) {
            throw new ApiRequestError({
                status: response.status,
                errors: (await response.json()).errors,
            });
        }
        if (response.status !== 200) {
            throw new Error("Invalid response, status - "
                + response.status + "::" + response.statusText);
        }
        const result = await response.json();
        logger.log("Api::Result", result);
        return result;
    }
    public async user(params: { token: string }): Promise<IUser> {
        return (await this.doGetRequest("user", {}, { Authorization: "Token " + params.token })).user;
    }
    public async createUser(params: { username: string; email: string; password: string }): Promise<IUser> {
        return (await this.doPostRequest("users", { user: params })).user;
    }
    public async tags() {
        return (await this.doGetRequest("tags")).tags;
    }
    public async articles(params?: {
        tag?: string;
        author?: string;
        favorited?: string;
        offset?: number;
        limit?: number;
    }): Promise<{
        articles: IArticle[];
        articlesCount: number;
    }> {
        return this.doGetRequest("articles", params);
    }
}
// tslint:disable-next-line:max-classes-per-file
export class ApiRequestError {
    status = 0;
    errors: any;
    constructor(params: { status: number; errors: any }) {
        this.status = params.status;
        this.errors = params.errors;
    }
}
export default Api;
