<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorOnline extends Event
{
    public function __construct(public readonly string $uuid)
    {
    }
}
