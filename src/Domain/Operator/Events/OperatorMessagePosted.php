<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorMessagePosted extends Event
{
    public function __construct(
        public string $uuid,
        public string $ticketUuid,
        public array $meta = [],
    ) {}
}
