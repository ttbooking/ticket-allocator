import { Model } from "pinia-orm";
import { Attr, Num, Str, Uid, Cast, BelongsTo } from "pinia-orm/dist/decorators";
import { DateCast } from "pinia-orm/dist/casts";
import { useSharedTimestamp } from "@/timestamp";
import Operator from "./Operator";

export default class Ticket extends Model {
    static entity = "tickets";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare category_uuid: string;
    @Str(null) declare handler_uuid: string | null;
    @Num(0) declare initial_weight: number;
    @Num(0) declare weight_increment: number;
    @Num(0) declare complexity: number;
    @Num(0) declare delay: number;
    @Attr() declare created_at: string;

    @BelongsTo(() => Operator, "handler_uuid") declare handler: Operator | null;

    get duration() {
        return Math.round((useSharedTimestamp().value - new Date(this.created_at).getTime()) / 1000);
    }

    get weight() {
        return this.initial_weight + this.weight_increment * this.duration;
    }
}
