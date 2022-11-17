import { IOperator, ITicket } from "@/types";

export class Operator implements IOperator {
    uuid!: string;
    name!: string;
    online = false;
    ready = false;
    tickets = [];
    ticket_limit = null;
    complexity_limit = null;

    constructor(data: Partial<IOperator>) {
        Object.assign(this, data);
    }

    get free_slots() {
        return 0;
    }

    get free_complexity() {
        return 0;
    }
}

export class Ticket implements ITicket {
    uuid!: string;
    category_uuid!: string;
    handler_uuid = null;
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
