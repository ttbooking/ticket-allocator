import { Axios } from "axios";
import Echo from "laravel-echo";
import { PusherChannel } from "laravel-echo/dist/channel";

declare global {
    interface Window {
        axios: Axios;
        Echo: Echo;
        ticketAllocatorChannel: PusherChannel;
        Ziggy?: any;
    }
}

export type ToggleOptions = "hide-empty" | "alt-info" | "unlocked";

export type TicketSortBy = "weight" | "duration";

export type SortDirection = "asc" | "desc";

export interface Operator {
    uuid: string;
    name: string;
    online: boolean;
    ready: boolean;
    ticket_limit: ?number;
    complexity_limit: ?number;
    teams: OperatorTeam[];
}

export interface Ticket {
    uuid: string;
    category_uuid: string;
    handler_uuid: ?string;
    meta: ?Record<string, string>;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    created_at: string;
}

export interface OperatorTeam {
    uuid: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: ?string;
    operators: Operator[];
    ticket_categories: TicketCategory[];
}

export interface TicketCategory {
    uuid: string;
    name: string;
    short: string;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    created_at: string;
    updated_at: string;
}
