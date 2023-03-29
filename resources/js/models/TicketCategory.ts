import { Model } from "pinia-orm";
import { Attr, Num, Str, Uid, BelongsToMany, HasMany } from "pinia-orm/dist/decorators";
import OperatorTeam from "./OperatorTeam";
import TeamCategory from "./TeamCategory";
import Ticket from "./Ticket";

export default class TicketCategory extends Model {
    static entity = "ticketCategories";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare name: string;
    @Str("") declare short: string;
    @Num(0) declare initial_weight: number;
    @Num(0) declare weight_increment: number;
    @Num(0) declare complexity: number;
    @Num(0) declare delay: number;
    @Attr() declare created_at: string;
    @Attr() declare updated_at: string;

    @BelongsToMany(() => OperatorTeam, () => TeamCategory, "category_uuid", "team_uuid") declare teams: OperatorTeam[];

    @HasMany(() => Ticket, "category_uuid") declare tickets: Ticket[];
}
