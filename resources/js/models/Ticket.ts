import { Model } from "pinia-orm";
import { Attr, Num, Str, Uid, BelongsTo } from "pinia-orm/dist/decorators";
import { useTimestamp } from "@vueuse/core";
import Operator from "./Operator";

export default class Ticket extends Model {
    static entity = "tickets";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Str("") declare categoryUuid: string;
    @Str(null) declare handlerUuid: string | null;
    @Num(0) declare initialWeight: number;
    @Num(0) declare weightIncrement: number;
    @Num(0) declare complexity: number;
    @Num(0) declare delay: number;
    @Attr(new Date()) declare createdAt: Date;

    @BelongsTo(() => Operator, "handlerUuid") declare handler: Operator | null;

    get duration() {
        return Math.round((useTimestamp({ interval: 1000 }).value - this.createdAt.getTime()) / 1000);
    }

    get weight() {
        return this.initialWeight + this.weightIncrement * this.duration;
    }
}
