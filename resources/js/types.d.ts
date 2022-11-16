export type TicketSortBy = "weight" | "duration";

export type SortDirection = "asc" | "desc";

export interface Operator {
    uuid: string;
    name: string;
    online: boolean;
    ready: boolean;
    tickets: Ticket[];
    ticket_limit: ?number;
    complexity_limit: ?number;
    free_slots: ?number;
    free_complexity: ?number;
}

export class Ticket {
    uuid: string;
    category_uuid: string;
    handler_uuid: ?string = null;
    initial_weight = 0;
    weight_increment = 0;
    complexity = 0;
    delay = 0;
    created_at: string;

    constructor(uuid, category_uuid) {
        this.uuid = uuid;
        this.category_uuid = category_uuid;
        this.created_at = new Date().toString();
    }

    get duration() {
        return Math.round((new Date().getTime() - new Date(this.created_at).getTime()) / 1000);
    }

    get weight() {
        return this.initial_weight + this.weight_increment * this.duration;
    }
}
