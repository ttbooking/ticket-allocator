<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\AdjustTicketMatchMetrics;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

class AdjustTicketMatchMetricsAction extends Action
{
    public function __invoke(
        Ticket|string $ticket,
        Operator|string $operator,
        TicketMetrics $adjustments,
        int $ticketLimit = 0,
        int $complexityLimit = 0,
        array $meta = [],
    ): void {
        $this->dispatch(new AdjustTicketMatchMetrics(
            uuid: is_string($ticket) ? $ticket : $ticket->getKey(),
            operatorUuid: is_string($operator) ? $operator : $operator->getKey(),
            adjustments: $adjustments,
            ticketLimit: $ticketLimit,
            complexityLimit: $complexityLimit,
            meta: $meta,
        ));
    }
}
