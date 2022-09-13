<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class TicketTagged extends Event
{
    public function __construct(
        public readonly string $uuid,
        public readonly array $tags,
    ) {
    }
}
