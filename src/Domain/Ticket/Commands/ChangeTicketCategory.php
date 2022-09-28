<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Commands;

use Spatie\EventSourcing\Commands\AggregateUuid;
use Spatie\EventSourcing\Commands\HandledBy;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

#[HandledBy(TicketAggregateRoot::class)]
class ChangeTicketCategory
{
    public function __construct(
        #[AggregateUuid] public readonly string $uuid,
        public readonly string $categoryUuid,
    ) {
    }
}