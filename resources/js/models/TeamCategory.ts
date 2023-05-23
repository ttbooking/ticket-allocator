import { Model } from "pinia-orm";
import { Uid } from "pinia-orm/decorators";

export default class TeamCategory extends Model {
    static entity = "teamCategory";

    static primaryKey = ["team_uuid", "category_uuid"];

    @Uid() declare team_uuid: string;
    @Uid() declare category_uuid: string;
}
