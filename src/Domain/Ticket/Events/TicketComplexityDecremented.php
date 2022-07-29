<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class TicketComplexityDecremented extends Event
{
    public function __construct(
        public readonly string $uuid,
        public readonly int $complexityPoints,
    ) {
    }
}
