<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Reactors;

use Spatie\EventSourcing\EventHandlers\Reactors\Reactor;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\AdjustTicketMetricsAction;
use TTBooking\TicketAllocator\Domain\Ticket\Events\TicketCreated;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\Models\Factor;

class ApplyFactors extends Reactor
{
    public function __construct(protected AdjustTicketMetricsAction $adjustTicketMetrics)
    {
    }

    public function onTicketCreated(TicketCreated $event): void
    {
        $ticket = TicketAggregateRoot::retrieve($event->uuid);

        Factor::query()
            ->orderBy('priority')
            ->get(['uuid', 'type', 'config'])
            ->pluck('instance', 'uuid')
            ->each(function (FactorContract $factor, string $factorUuid) use ($ticket) {
                ($this->adjustTicketMetrics)($ticket->uuid(), $factorUuid, $factor->getAdjustments($ticket));
            });
    }
}
