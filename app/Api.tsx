import fetch from "node-fetch";
export interface IApiConfig {
    endpoint: string;
}
class Api {
    constructor(protected config: IApiConfig) { }
    public async doGetRequest(endpoint: string, _?: { [index: string]: string }) {
        const response = await fetch(this.config.endpoint + "/" + endpoint);
        if (response.status !== 200) {
            throw new Error("Invalid response, status - "
                + response.status + "::" + response.statusText +
                ", body - " + await response.text());
        }
        return response.json();
    }
}
export default Api;
