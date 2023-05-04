export type ToggleOptions = "hide-empty" | "alt-info" | "unlocked";

export type TicketSortBy = "weight" | "duration";

export type SortDirection = "asc" | "desc";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Operator {
    uuid: string;
    name: string;
    display_name: string | null;
    online: boolean;
    ready: boolean;
    ticket_limit: number | null;
    complexity_limit: number | null;
    user: User | null;
    teams: OperatorTeam[];
}

export interface Ticket {
    uuid: string;
    category_uuid: string;
    handler_uuid: string | null;
    meta: Record<string, string> | null;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    created_at: string;
}

export interface OperatorTeam {
    uuid: string;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
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

export interface TicketCategoryFactorConfig {
    value: string;
    initial_weight: number | null;
    weight_increment: number | null;
    complexity: number | null;
    delay: number | null;
}

export interface FactorType {
    alias: string;
    name: string;
    singular: boolean;
}

export interface Factor {
    uuid: string;
    priority: number;
    type: FactorType;
    name: string;
    display_name: string | null;
    description: string | null;
    config: TicketCategoryFactorConfig[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface DisplayOptions {
    duration_threshold: number;
    weight_threshold: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    options: DisplayOptions;
};
