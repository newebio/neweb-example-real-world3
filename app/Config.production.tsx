import { IApplicationConfig } from "neweb";

class Config implements IApplicationConfig {
    public apiEndpoint = "https://conduit.productionready.io/api";
    public session = {
        secret: "5874hu589h67u5656",
    };
}
export default Config;
