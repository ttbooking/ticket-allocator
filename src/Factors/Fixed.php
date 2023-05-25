<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

#[Attributes\Hidden]
class Fixed extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics
    {
        return TicketMetrics::from($this->config);
    }
}
