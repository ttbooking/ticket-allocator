import { Model } from "pinia-orm";
import { Attr, Str, Uid, BelongsToMany } from "pinia-orm/decorators";
import Operator from "./Operator";
import TeamOperator from "./TeamOperator";

export default class OperatorTeam extends Model {
    static entity = "operatorTeams";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare name: string;
    @Str("") declare description: string;
    @Attr() declare matching: Record<string, Array<string | number>> | null;
    @Attr() declare created_at: string;
    @Attr() declare updated_at: string;
    @Attr() declare deleted_at: string | null;

    @BelongsToMany(() => Operator, () => TeamOperator, "team_uuid", "operator_uuid") declare operators: Operator[];
}
