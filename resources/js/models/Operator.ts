import { Model } from "pinia-orm";
import { Attr, Bool, Num, Str, Uid, BelongsToMany, HasMany, OnDelete } from "pinia-orm/decorators";
import OperatorTeam from "./OperatorTeam";
import TeamOperator from "./TeamOperator";
import Ticket from "./Ticket";

export default class Operator extends Model {
    static entity = "operators";

    static primaryKey = "uuid";

    @Uid() uuid!: string;
    @Attr() user_id!: number | string;
    @Str("") name!: string;
    @Bool(false) online!: boolean;
    @Bool(false) ready!: boolean;
    @Num(null) ticket_limit!: number | null;
    @Num(null) complexity_limit!: number | null;

    @BelongsToMany(() => OperatorTeam, () => TeamOperator, "operator_uuid", "team_uuid") teams!: OperatorTeam[];
    @HasMany(() => Ticket, "handler_uuid") @OnDelete("set null") tickets!: Ticket[];

    get ticket_count() {
        return this.tickets.length;
    }

    get free_slots() {
        return this.ticket_limit !== null ? Math.max(0, this.ticket_limit - this.ticket_count) : null;
    }

    get total_complexity() {
        return this.tickets.reduce((n, { complexity }) => n + complexity, 0);
    }

    get free_complexity() {
        return this.complexity_limit !== null ? Math.max(0, this.complexity_limit - this.total_complexity) : null;
    }
}
