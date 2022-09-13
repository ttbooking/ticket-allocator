<?php

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

class OperatorCommented
{
    public function __construct(
        public readonly string $uuid,
        public readonly int $orderId,

    ) {
    }
}
