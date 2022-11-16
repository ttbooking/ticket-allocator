import { ITicket } from "@/types";

export class Ticket implements ITicket {
    uuid!: string;
    category_uuid!: string;
    handler_uuid: string | null = null;
    initial_weight = 0;
    weight_increment = 0;
    complexity = 0;
    delay = 0;
    created_at: string;

    constructor(data: Partial<ITicket>) {
        Object.assign(this, data);
        this.created_at ??= new Date().toString();
    }

    get duration() {
        return Math.round((new Date().getTime() - new Date(this.created_at).getTime()) / 1000);
    }

    get weight() {
        return this.initial_weight + this.weight_increment * this.duration;
    }
}
