<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

#[Attributes\Hidden]
#[Attributes\Singular]
class Manual extends Factor
{
    public function getAdjustments(Ticket $ticket): TicketMetrics
    {
        return isset($ticket->meta[Ticket::META_METRIC_ADJUSTMENTS])
            ? TicketMetrics::from($ticket->meta[Ticket::META_METRIC_ADJUSTMENTS])
            : new TicketMetrics;
    }
}
