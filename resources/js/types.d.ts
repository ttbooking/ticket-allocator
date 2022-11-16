export type TicketSortBy = "weight" | "duration";

export type SortDirection = "asc" | "desc";

export interface Operator {
    uuid: string;
    name: string;
    online: boolean;
    ready: boolean;
    tickets: ITicket[];
    ticket_limit: ?number;
    complexity_limit: ?number;
    free_slots: ?number;
    free_complexity: ?number;
}

export interface ITicket {
    uuid: string;
    category_uuid: string;
    handler_uuid: ?string;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    created_at: string;
    get duration();
    get weight();
}
