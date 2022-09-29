<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorEnrolled extends Event
{
    public function __construct(
        public string $uuid,
        public ?object $origin = null,
    ) {
    }
}
