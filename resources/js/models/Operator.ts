import { Model } from "pinia-orm";
import { Attr, Bool, Num, Str, Uid, BelongsToMany, HasMany, OnDelete } from "pinia-orm/decorators";
import { computed } from "vue";
import OperatorTeam from "./OperatorTeam";
import TeamOperator from "./TeamOperator";
import Ticket from "./Ticket";

export default class Operator extends Model {
    static entity = "operators";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Attr() declare user_id: number | string;
    @Str("") declare name: string;
    @Bool(false) declare online: boolean;
    @Bool(false) declare ready: boolean;
    @Num(null) declare ticket_limit: number | null;
    @Num(null) declare complexity_limit: number | null;

    @BelongsToMany(() => OperatorTeam, () => TeamOperator, "operator_uuid", "team_uuid") declare teams: OperatorTeam[];
    @HasMany(() => Ticket, "handler_uuid") @OnDelete("set null") declare tickets: Ticket[];

    get ticket_count() {
        return computed(() => this.tickets.length);
    }

    get free_slots() {
        return computed(() =>
            this.ticket_limit !== null ? Math.max(0, this.ticket_limit - this.ticket_count.value) : null
        );
    }

    get total_complexity() {
        return computed(() => this.tickets.reduce((n, { complexity }) => n + complexity, 0));
    }

    get free_complexity() {
        return computed(() =>
            this.complexity_limit !== null ? Math.max(0, this.complexity_limit - this.total_complexity.value) : null
        );
    }
}
