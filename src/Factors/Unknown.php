<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

class Unknown extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        return [
            'initial_weight' => 0,
            'weight_increment' => 0,
            'complexity' => 0,
            'delay' => 0,
        ];
    }
}
