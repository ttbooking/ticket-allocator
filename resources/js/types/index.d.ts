export type ToggleOptions = "hide-empty" | "alt-info" | "unlocked";

export type TicketSortBy = "weight" | "duration";

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

export interface TicketMetrics {
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    reservation: number;
}

export interface Ticket {
    uuid: string;
    category_uuid: string;
    handler_uuid: string | null;
    meta: Record<string, string> | null;
    metrics: Record<string, TicketMetrics> | null;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
    reservation: number;
    created_at: string;
    bound_at: string | null;
    accepted_at: string | null;
}

export interface OperatorTeam {
    uuid: string;
    name: string;
    description: string | null;
    weight: number;
    matching: Record<string, Array<string | number>> | Array | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    operators: Operator[];
}

export interface Entry {
    uuid: string;
    name: string;
}

export interface TicketCategory {
    uuid: string;
    name: string;
    short: string;
    created_at: string;
    updated_at: string;
}

export type FixedFactorConfig = TicketMetrics;

export type AssociativeFactorConfig = Array<{
    value: string;
    initial_weight: number | null;
    weight_increment: number | null;
    complexity: number | null;
    delay: number | null;
    reservation: number | null;
}>;

export interface ExpressiveFactorConfig {
    variables: object;
    expressions: {
        initial_weight: string;
        weight_increment: string;
        complexity: string;
        delay: string;
        reservation: string;
    };
}

export interface RandomFactorConfig {
    initial_weight: [number, number];
    weight_increment: [number, number];
    complexity: [number, number];
    delay: [number, number];
    reservation: [number, number];
}

export interface FactorType {
    alias: string;
    name: string;
    excluded: boolean;
    hidden: boolean;
    singular: boolean;
    component: string | null;
}

export interface Factor {
    uuid: string;
    priority: number;
    type: FactorType;
    name: string;
    display_name: string | null;
    description: string | null;
    config: AssociativeFactorConfig;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface MatcherType {
    alias: string;
    name: string;
    excluded: boolean;
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
