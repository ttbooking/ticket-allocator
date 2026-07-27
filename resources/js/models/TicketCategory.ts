import { Model } from "pinia-orm";
import { Attr, Str, Uid, BelongsToMany, HasMany } from "pinia-orm/decorators";
import OperatorTeam from "./OperatorTeam";
import TeamCategory from "./TeamCategory";
import Ticket from "./Ticket";

export default class TicketCategory extends Model {
    static entity = "ticketCategories";

    static primaryKey = "uuid";

    @Uid() uuid!: string;
    @Str("") name!: string;
    @Str("") short!: string;
    @Attr() created_at!: string;
    @Attr() updated_at!: string;

    @BelongsToMany(() => OperatorTeam, () => TeamCategory, "category_uuid", "team_uuid") teams!: OperatorTeam[];

    @HasMany(() => Ticket, "category_uuid") tickets!: Ticket[];
}
