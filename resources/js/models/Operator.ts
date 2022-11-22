import { Model } from "pinia-orm";
import { Bool, Num, Str, Uid, HasMany } from "pinia-orm/dist/decorators";
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
    @HasMany(() => Ticket, "handlerUuid") declare tickets: Ticket[];
}
