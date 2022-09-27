<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Commands;

use Spatie\EventSourcing\Commands\AggregateUuid;
use Spatie\EventSourcing\Commands\HandledBy;
use TTBooking\TicketAllocator\Domain\Operator\OperatorAggregateRoot;

#[HandledBy(OperatorAggregateRoot::class)]
class LeaveOperatorTeam
{
    public function __construct(
        #[AggregateUuid] public readonly string $uuid,
        public readonly string $operatorTeamUuid,
    ) {
    }
}
