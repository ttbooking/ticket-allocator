import { Model } from "pinia-orm";
import { Attr, Str, Uid, BelongsToMany, HasMany } from "pinia-orm/decorators";
import OperatorTeam from "./OperatorTeam";
import TeamCategory from "./TeamCategory";
import Ticket from "./Ticket";

export default class TicketCategory extends Model {
    static entity = "ticketCategories";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare name: string;
    @Str("") declare short: string;
    @Attr() declare created_at: string;
    @Attr() declare updated_at: string;

    @BelongsToMany(() => OperatorTeam, () => TeamCategory, "category_uuid", "team_uuid") declare teams: OperatorTeam[];

    @HasMany(() => Ticket, "category_uuid") declare tickets: Ticket[];
}
