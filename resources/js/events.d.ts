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
    Closed = ".ticket.closed",
    ComplexityDecremented = ".ticket.complexity-decremented",
    ComplexityIncremented = ".ticket.complexity-incremented",
    Created = ".ticket.created",
    DelayDecremented = ".ticket.delay-decremented",
    DelayIncremented = ".ticket.delay-incremented",
    InitialWeightDecremented = ".ticket.initial-weight-decremented",
    InitialWeightIncremented = ".ticket.initial-weight-incremented",
    Tagged = ".ticket.tagged",
    Unbound = ".ticket.unbound",
    WeightIncrementDecremented = ".ticket.weight-increment-decremented",
    WeightIncrementIncremented = ".ticket.weight-increment-incremented",
}

namespace Operator {
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

namespace Ticket {
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

    export interface ClosedPayload {
        uuid: string;
    }

    export interface ComplexityDecrementedPayload {
        uuid: string;
        complexityPoints: number;
    }

    export interface ComplexityIncrementedPayload {
        uuid: string;
        complexityPoints: number;
    }

    export interface CreatedPayload {
        uuid: string;
        categoryUuid: string;
        operatorUuid: string | null;
        initialWeight: number;
        weightIncrement: number;
        complexity: number;
        delay: number;
        meta: Record<string, string>;
    }

    export interface DelayDecrementedPayload {
        uuid: string;
        delaySeconds: number;
    }

    export interface DelayIncrementedPayload {
        uuid: string;
        delaySeconds: number;
    }

    export interface InitialWeightDecrementedPayload {
        uuid: string;
        weightPoints: number;
    }

    export interface InitialWeightIncrementedPayload {
        uuid: string;
        weightPoints: number;
    }

    export interface TaggedPayload {
        uuid: string;
        tags: string[];
    }

    export interface UnboundPayload {
        uuid: string;
    }

    export interface WeightIncrementDecrementedPayload {
        uuid: string;
        weightPoints: number;
    }

    export interface WeightIncrementIncrementedPayload {
        uuid: string;
        weightPoints: number;
    }
}
