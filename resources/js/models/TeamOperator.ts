import { Model } from "pinia-orm";
import { Uid } from "pinia-orm/decorators";

export default class TeamOperator extends Model {
    static entity = "teamOperator";

    static primaryKey = ["team_uuid", "operator_uuid"];

    @Uid() team_uuid!: string;
    @Uid() operator_uuid!: string;
}
