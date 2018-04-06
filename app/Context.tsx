import Api from "./Api";
import Config from "./Config.development";
export interface IContextConfig {
    config: Config;
}
class Context {
    api: Api;
    constructor(protected config: IContextConfig) {
        this.api = new Api({ endpoint: this.config.config.apiEndpoint });
    }
}
export default Context;
