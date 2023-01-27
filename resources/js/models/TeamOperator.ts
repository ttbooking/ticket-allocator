import { Model } from "pinia-orm";
import { Uid } from "pinia-orm/dist/decorators";

export default class TeamOperator extends Model {
    static entity = "teamOperator";

    static primaryKey = ["team_uuid", "operator_uuid"];

    @Uid() declare team_uuid: string;
    @Uid() declare operator_uuid: string;
}
