<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\DTO;

class TicketMetrics
{
    public function __construct(
        public int $initial_weight = 0,
        public int $weight_increment = 0,
        public int $complexity = 0,
        public int $delay = 0,
    ) {
    }

    public static function from(array $metrics): static
    {
        return new static(...$metrics);
    }
}
