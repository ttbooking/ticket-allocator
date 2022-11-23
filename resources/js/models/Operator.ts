import { Model } from "pinia-orm";
import { Bool, Num, Str, Uid, HasMany, OnDelete } from "pinia-orm/dist/decorators";
import Ticket from "./Ticket";

export default class Operator extends Model {
    static entity = "operators";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare name: string;
    @Bool(false) declare online: boolean;
    @Bool(false) declare ready: boolean;
    @Num(null) declare ticketLimit: number | null;
    @Num(null) declare complexityLimit: number | null;

    @HasMany(() => Ticket, "handlerUuid") @OnDelete("set null") declare tickets: Ticket[];

    get freeSlots() {
        return this.ticketLimit !== null ? Math.max(0, this.ticketLimit - this.tickets.length) : null;
    }

    get totalComplexity() {
        return this.tickets.reduce((n, { complexity }) => n + complexity, 0);
    }

    get freeComplexity() {
        return this.complexityLimit !== null ? Math.max(0, this.complexityLimit - this.totalComplexity) : null;
    }
}
