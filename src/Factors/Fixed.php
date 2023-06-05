<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

/**
 * @extends Factor<array{
 *     initial_weight: int,
 *     weight_increment: int,
 *     complexity: int,
 *     delay: int,
 *     reservation: int,
 * }>
 */
#[Attributes\Singular]
#[Attributes\Component('Factor/Partials/FixedForm')]
#[Attributes\Instance('99561e6e-f5e7-4aa4-bfe1-f1ab3c343041', priority: 100)]
class Fixed extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics
    {
        return $this->config ? TicketMetrics::from($this->config) : new TicketMetrics;
    }
}
