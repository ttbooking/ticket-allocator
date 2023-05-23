<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;

#[Attributes\Hidden]
#[Attributes\Singular]
class Manual extends Factor
{
    public function getAdjustments(Ticket $ticket): array
    {
        return $ticket->meta[Ticket::META_METRIC_ADJUSTMENTS] ?? [
            'initial_weight' => 0,
            'weight_increment' => 0,
            'complexity' => 0,
            'delay' => 0,
        ];
    }
}
