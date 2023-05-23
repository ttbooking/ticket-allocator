<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

#[Attributes\Excluded]
class Unknown extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics
    {
        return new TicketMetrics;
    }
}
