<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorComplexityLimitAdjusted extends Event
{
    public function __construct(
        public string $uuid,
        public ?int $complexityLimit,
    ) {
    }
}
