<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\FixedConfig;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

/**
 * @extends Factor<FixedConfig>
 */
#[Attributes\Hidden]
class Fixed extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics
    {
        return $this->config;
    }
}
