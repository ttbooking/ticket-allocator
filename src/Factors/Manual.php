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
#[Attributes\Instance('99420f64-2ffb-44d3-abd8-1d31a1c6627f')]
class Manual extends Factor
{
    public function getAdjustments(Ticket $ticket): TicketMetrics
    {
        return isset($ticket->meta[Ticket::META_METRIC_ADJUSTMENTS])
            ? TicketMetrics::from($ticket->meta[Ticket::META_METRIC_ADJUSTMENTS])
            : new TicketMetrics;
    }
}
