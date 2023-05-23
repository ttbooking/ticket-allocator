<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\DTO;

use Spatie\LaravelData\Data;

class MetricAdjustmentExpressions extends Data
{
    public function __construct(

        public string $initial_weight = '',

        public string $weight_increment = '',

        public string $complexity = '',

        public string $delay = '',

    ) {
    }
}
