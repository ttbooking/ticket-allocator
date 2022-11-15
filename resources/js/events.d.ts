export const Channel = "ticket-allocator";

export enum Operator {
    Commented = ".operator.commented",
    ComplexityLimitAdjusted = ".operator.complexity-limit-adjusted",
    Enrolled = ".operator.enrolled",
    JoinedTeam = ".operator.joined-team",
    LeftTeam = ".operator.left-team",
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

export namespace Operator {
    interface CommentedPayload {
        uuid: string;
        orderId: number;
    }

    interface ComplexityLimitAdjustedPayload {
        uuid: string;
        complexityLimit?: number;
    }

    interface EnrolledPayload {
        uuid: string;
        origin?: any;
    }

    interface JoinedTeamPayload {
        uuid: string;
        operatorTeamUuid: string;
    }

    interface LeftTeamPayload {
        uuid: string;
        operatorTeamUuid: string;
    }

    interface NameChangedPayload {
        uuid: string;
        name: string;
    }

    interface NotReadyPayload {
        uuid: string;
    }

    interface OfflinePayload {
        uuid: string;
    }

    interface OnlinePayload {
        uuid: string;
    }

    interface ReadyPayload {
        uuid: string;
    }

    interface ResignedPayload {
        uuid: string;
    }

    interface TicketCategoryAttachedPayload {
        uuid: string;
        ticketCategoryUuid: string;
    }

    interface TicketCategoryDetachedPayload {
        uuid: string;
        ticketCategoryUuid: string;
    }

    interface TicketLimitAdjustedPayload {
        uuid: string;
        ticketLimit?: number;
    }
}

export namespace Ticket {
    interface BoundPayload {
        uuid: string;
        operatorUuid: string;
    }

    interface CategoryChangedPayload {
        uuid: string;
        categoryUuid: string;
    }

    interface ClosedPayload {
        uuid: string;
    }

    interface ComplexityDecrementedPayload {
        uuid: string;
        complexityPoints: number;
    }

    interface ComplexityIncrementedPayload {
        uuid: string;
        complexityPoints: number;
    }

    interface CreatedPayload {
        uuid: string;
        categoryUuid: string;
        origin?: any;
    }

    interface DelayDecrementedPayload {
        uuid: string;
        delaySeconds: number;
    }

    interface DelayIncrementedPayload {
        uuid: string;
        delaySeconds: number;
    }

    interface InitialWeightDecrementedPayload {
        uuid: string;
        weightPoints: number;
    }

    interface InitialWeightIncrementedPayload {
        uuid: string;
        weightPoints: number;
    }

    interface TaggedPayload {
        uuid: string;
        tags: string[];
    }

    interface UnboundPayload {
        uuid: string;
    }

    interface WeightIncrementDecremented {
        uuid: string;
        weightPoints: number;
    }

    interface WeightIncrementIncremented {
        uuid: string;
        weightPoints: number;
    }
}
