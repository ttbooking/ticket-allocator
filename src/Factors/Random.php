<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

#[Attributes\Hidden]
class Random extends Factor
{
    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        $rand = function (string $metric) {
            $config = $this->getConfig();
            $range = $config[$metric] ?? null;

            return $range ? rand(...$range) : 0;
        };

        return array_combine(
            $metrics = ['initial_weight', 'weight_increment', 'complexity', 'delay'],
            array_map($rand, $metrics)
        );
    }
}
