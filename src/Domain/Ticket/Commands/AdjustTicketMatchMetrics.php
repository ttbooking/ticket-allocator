<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Commands;

use Spatie\EventSourcing\Commands\AggregateUuid;
use Spatie\EventSourcing\Commands\HandledBy;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

#[HandledBy(TicketAggregateRoot::class)]
class AdjustTicketMatchMetrics
{
    public function __construct(
        #[AggregateUuid] public string $uuid,
        public string $operatorUuid,
        public TicketMetrics $adjustments,
    ) {}
}
