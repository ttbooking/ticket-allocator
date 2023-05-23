<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\AdjustTicketMetrics;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\DTO\TicketMetrics;
use TTBooking\TicketAllocator\Models\Factor;

class AdjustTicketMetricsAction extends Action
{
    public function __invoke(Ticket|string $ticket, Factor|string $factor, TicketMetrics $adjustments): void
    {
        $this->dispatch(new AdjustTicketMetrics(
            uuid: is_string($ticket) ? $ticket : $ticket->getKey(),
            factorUuid: is_string($factor) ? $factor : $factor->getKey(),
            adjustments: $adjustments,
        ));
    }
}
