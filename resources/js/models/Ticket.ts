import { Model } from "pinia-orm";
import { Attr, Num, Str, Uid, Cast, BelongsTo } from "pinia-orm/decorators";
import { DateCast } from "pinia-orm/casts";
import type { TicketMetrics } from "@/types";
import { useSharedTimestamp } from "@/shared";
import TicketCategory from "./TicketCategory";
import Operator from "./Operator";

export default class Ticket extends Model {
    static entity = "tickets";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare category_uuid: string;
    @Str(null) declare handler_uuid: string | null;
    @Attr() declare meta: Record<string, string> | null;
    @Attr() declare metrics: Record<string, TicketMetrics> | null;
    @Num(0) declare initial_weight: number;
    @Num(0) declare weight_increment: number;
    @Num(0) declare complexity: number;
    @Num(0) declare delay: number;
    @Cast(() => DateCast) @Attr() declare created_at: Date;
    @Cast(() => DateCast) @Attr(null) declare bound_at: Date | null;
    @Cast(() => DateCast) @Attr(null) declare accepted_at: Date | null;

    @BelongsTo(() => TicketCategory, "category_uuid") declare category: TicketCategory;

    @BelongsTo(() => Operator, "handler_uuid") declare handler: Operator | null;

    get duration() {
        return Math.round((useSharedTimestamp().value - this.created_at.getTime()) / 1000);
    }

    get weight() {
        return this.initial_weight + this.weight_increment * this.duration;
    }
}
