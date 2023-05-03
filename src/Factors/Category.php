<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Attributes\Factors\Singular;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

#[Singular]
class Category extends Factor
{
    public function getProps(): array
    {
        return [];
    }

    public function getConfig(): array
    {
        return [];
    }

    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        return [];
    }
}
