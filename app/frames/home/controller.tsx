import { FrameController } from "neweb";
import Context from "../../Context";
export interface IData {
    tags: string[];
}
export default class extends FrameController<any, IData, Context> {
    async getInitialData() {
        const tagsResponse = await this.config.context.api.doGetRequest("tags");
        return {
            tags: tagsResponse.tags,
        };
    }
}
