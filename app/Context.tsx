import Api from "./Api";
import Config from "./Config.development";
export interface IContextConfig {
    config: Config;
}
class Context {
    api: Api;
    logger: typeof console;
    constructor(protected config: IContextConfig) {
        this.logger = console;
        this.api = new Api({ endpoint: this.config.config.apiEndpoint, logger: this.logger });
    }
}
export default Context;
