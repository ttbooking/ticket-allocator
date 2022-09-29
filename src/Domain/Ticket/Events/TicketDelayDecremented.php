<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class TicketDelayDecremented extends Event
{
    public function __construct(
        public string $uuid,
        public int $delaySeconds,
    ) {
    }
}
