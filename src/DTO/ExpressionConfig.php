<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\DTO;

use Spatie\LaravelData\Data;
use TTBooking\TicketAllocator\Contracts\FactorConfig;

class ExpressionConfig extends Data implements FactorConfig
{
    public function __construct(

        public array $variables = [],

        public MetricAdjustmentExpressions $expressions = new MetricAdjustmentExpressions,

    ) {
    }
}
