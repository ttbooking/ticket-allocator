export const Channel = "ticket-allocator";

export enum Operator {
    Commented = ".operator.commented",
    ComplexityLimitAdjusted = ".operator.complexity-limit-adjusted",
    Enrolled = ".operator.enrolled",
    JoinedTeam = ".operator.joined-team",
    LeftTeam = ".operator.left-team",
    SetTeams = ".operator.set-teams",
    NameChanged = ".operator.name-changed",
    NotReady = ".operator.not-ready",
    Offline = ".operator.offline",
    Online = ".operator.online",
    Ready = ".operator.ready",
    Resigned = ".operator.resigned",
    TicketCategoryAttached = ".operator.ticket-category-attached",
    TicketCategoryDetached = ".operator.ticket-category-detached",
    TicketLimitAdjusted = ".operator.ticket-limit-adjusted",
}

export enum Ticket {
    Bound = ".ticket.bound",
    CategoryChanged = ".ticket.category-changed",
    MetaValueSet = ".ticket.meta-value-set",
    MetaValuesMerged = ".ticket.meta-values-merged",
    MetricsAdjusted = ".ticket.metrics-adjusted",
    Closed = ".ticket.closed",
    Created = ".ticket.created",
    Unbound = ".ticket.unbound",
}

declare namespace Operator {
    export interface CommentedPayload {
        uuid: string;
        orderId: number;
    }

    export interface ComplexityLimitAdjustedPayload {
        uuid: string;
        complexityLimit: number | null;
    }

    export interface EnrolledPayload {
        uuid: string;
        userId: number | string;
        name: string | null;
        online: boolean;
        ready: boolean;
        ticketLimit: number | null;
        complexityLimit: number | null;
    }

    export interface JoinedTeamPayload {
        uuid: string;
        operatorTeamUuid: string;
    }

    export interface LeftTeamPayload {
        uuid: string;
        operatorTeamUuid: string;
    }

    export interface SetTeamsPayload {
        uuid: string;
        operatorTeamUuids: string[];
    }

    export interface NameChangedPayload {
        uuid: string;
        name: string | null;
    }

    export interface NotReadyPayload {
        uuid: string;
    }

    export interface OfflinePayload {
        uuid: string;
    }

    export interface OnlinePayload {
        uuid: string;
    }

    export interface ReadyPayload {
        uuid: string;
    }

    export interface ResignedPayload {
        uuid: string;
    }

    export interface TicketCategoryAttachedPayload {
        uuid: string;
        ticketCategoryUuid: string;
    }

    export interface TicketCategoryDetachedPayload {
        uuid: string;
        ticketCategoryUuid: string;
    }

    export interface TicketLimitAdjustedPayload {
        uuid: string;
        ticketLimit: number | null;
    }
}

declare namespace Ticket {
    export interface BoundPayload {
        uuid: string;
        operatorUuid: string;
        meta: Record<string, string>;
    }

    export interface CategoryChangedPayload {
        uuid: string;
        categoryUuid: string;
        meta: Record<string, string>;
    }

    export interface MetaValueSetPayload {
        uuid: string;
        key: string;
        value: string;
    }

    export interface MetaValuesMergedPayload {
        uuid: string;
        meta: Record<string, string>;
    }

    export interface MetricsAdjustedPayload {
        uuid: string;
        factorUuid: string;
        adjustments: Record<string, number>;
    }

    export interface ClosedPayload {
        uuid: string;
    }

    export interface CreatedPayload {
        uuid: string;
        categoryUuid: string;
        operatorUuid: string | null;
        meta: Record<string, string>;
    }

    export interface UnboundPayload {
        uuid: string;
    }
}
