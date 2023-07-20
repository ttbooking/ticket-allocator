<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projectors;

use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Events as TicketEvents;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class OperatorPreProjector extends Projector
{
    public function onTicketBound(TicketEvents\TicketBound $event): void
    {
        $ticket = Ticket::find($event->uuid);
        $newOperator = Operator::find($event->operatorUuid)?->writeable();
        if (! $ticket || ! $newOperator) {
            return;
        }

        $operator = $ticket->operator?->writeable();
        $operator?->decrement('bound_tickets');
        $operator?->decrement('total_complexity', $ticket->complexity);

        $newOperator->increment('bound_tickets');
        $newOperator->increment('total_complexity', $ticket->complexity);
        $newOperator->update(['last_bound_at' => now()]);
    }

    public function onTicketUnbound(TicketEvents\TicketUnbound $event): void
    {
        $ticket = Ticket::find($event->uuid);
        if (! $operator = $ticket?->operator?->writeable()) {
            return;
        }

        $operator->decrement('bound_tickets');
        $operator->decrement('total_complexity', $ticket->complexity);
    }
}
