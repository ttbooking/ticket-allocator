<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Commands;

use Spatie\EventSourcing\Commands\AggregateUuid;
use Spatie\EventSourcing\Commands\HandledBy;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

#[HandledBy(TicketAggregateRoot::class)]
class CreateTicket
{
    public function __construct(
        #[AggregateUuid] public string $uuid,
        public string $categoryUuid,
        public ?string $operatorUuid = null,
        public int $initialWeight = 0,
        public int $weightIncrement = 0,
        public int $complexity = 0,
        public int $delay = 0,
        public array $meta = [],
    ) {
    }
}
