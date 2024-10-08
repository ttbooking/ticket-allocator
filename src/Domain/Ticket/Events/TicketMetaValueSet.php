<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class TicketMetaValueSet extends Event
{
    public function __construct(
        public string $uuid,
        public string $key,
        public mixed $value,
    ) {}
}
