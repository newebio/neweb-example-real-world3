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
class Api {
    constructor(protected config: IApiConfig) { }
    public async doGetRequest(endpoint: string, params?: { [index: string]: any }) {
        params = params || {};
        const logger = this.config.logger;
        logger.log("Api::GetRequest", endpoint, params);
        const response = await fetch(this.config.endpoint + "/" + endpoint + "?" +
            querystring.stringify(params),
        );
        if (response.status !== 200) {
            throw new Error("Invalid response, status - "
                + response.status + "::" + response.statusText +
                ", body - " + await response.text());
        }
        return response.json();
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
    }): Promise<IArticle[]> {
        return (await this.doGetRequest("articles", params)).articles;
    }
}
export default Api;
