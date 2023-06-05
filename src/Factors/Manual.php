<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

/**
 * @extends Factor<array{}>
 */
#[Attributes\Hidden]
#[Attributes\Singular]
#[Attributes\Instance('99561ef1-ae1c-45d9-8b57-176c22e109a4', priority: 300)]
class Manual extends Factor
{
    public function getAdjustments(Ticket $ticket): TicketMetrics
    {
        return isset($ticket->meta[Ticket::META_METRIC_ADJUSTMENTS])
            ? TicketMetrics::from($ticket->meta[Ticket::META_METRIC_ADJUSTMENTS])
            : new TicketMetrics;
    }
}
