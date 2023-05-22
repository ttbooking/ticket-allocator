<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

#[Attributes\Hidden]
class Fixed extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        return $this->getConfig();
    }
}
