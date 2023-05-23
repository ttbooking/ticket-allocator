<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\RandomConfig;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

/**
 * @extends Factor<RandomConfig>
 */
#[Attributes\Hidden]
class Random extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics
    {
        $rand = function (string $metric) {
            $range = $this->config->$metric ?? null;

            return $range ? rand(...$range) : 0;
        };

        return TicketMetrics::from(array_combine(
            $metrics = ['initial_weight', 'weight_increment', 'complexity', 'delay'],
            array_map($rand, $metrics)
        ));
    }
}
