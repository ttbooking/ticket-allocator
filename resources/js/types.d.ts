import Echo from "laravel-echo";
import { PusherChannel } from "laravel-echo/dist/channel";

declare global {
    interface Window {
        Echo: Echo;
        ticketAllocatorChannel: PusherChannel;
        Ziggy?: any;
    }
}

export type TicketSortBy = "weight" | "duration";

export type SortDirection = "asc" | "desc";

export interface Operator {
    uuid: string;
    name: string;
    online: boolean;
    ready: boolean;
    ticket_limit: ?number;
    complexity_limit: ?number;
}

export interface Ticket {
    uuid: string;
    category_uuid: string;
    handler_uuid: ?string;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    created_at: string;
}
