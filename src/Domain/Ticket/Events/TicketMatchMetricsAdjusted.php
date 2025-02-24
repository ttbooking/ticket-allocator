<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

class TicketMatchMetricsAdjusted extends Event
{
    public function __construct(
        public string $uuid,
        public string $operatorUuid,
        public TicketMetrics $adjustments,
        public int $ticketLimit,
        public int $complexityLimit,
        public array $meta = [],
    ) {}
}
