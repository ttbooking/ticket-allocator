import { Model } from "pinia-orm";
import { Attr, Num, Str, Uid } from "pinia-orm/dist/decorators.js";
import type { FactorType, AssociativeFactorConfig } from "@/types";

export default class Factor extends Model {
    static entity = "factors";

    static primaryKey = "uuid";

    @Uid() declare uuid: string;
    @Num(0) declare priority: number;
    @Attr() declare type: FactorType;
    @Str("") declare name: string;
    @Str("") declare display_name: string | null;
    @Str("") declare description: string | null;
    @Attr() declare config: AssociativeFactorConfig;
    @Attr() declare created_at: string;
    @Attr() declare updated_at: string;
    @Attr() declare deleted_at: string | null;
}
