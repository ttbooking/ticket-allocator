import { Model } from "pinia-orm";
import { Uid } from "pinia-orm/decorators";

export default class TeamCategory extends Model {
    static entity = "teamCategory";

    static primaryKey = ["team_uuid", "category_uuid"];

    @Uid() team_uuid!: string;
    @Uid() category_uuid!: string;
}
