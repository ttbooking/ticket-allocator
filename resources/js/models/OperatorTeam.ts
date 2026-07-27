import { Model } from "pinia-orm";
import { Attr, Str, Uid, BelongsToMany } from "pinia-orm/decorators";
import Operator from "./Operator";
import TeamOperator from "./TeamOperator";

export default class OperatorTeam extends Model {
    static entity = "operatorTeams";

    static primaryKey = "uuid";

    @Uid() uuid!: string;
    @Str("") name!: string;
    @Str("") description!: string;
    @Attr() matching!: Record<string, Array<string | number>> | null;
    @Attr() created_at!: string;
    @Attr() updated_at!: string;
    @Attr() deleted_at!: string | null;

    @BelongsToMany(() => Operator, () => TeamOperator, "team_uuid", "operator_uuid") operators!: Operator[];
}
