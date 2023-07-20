<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projectors;

use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Events as TicketEvents;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class OperatorPostProjector extends Projector
{
    public int $weight = 10;

    public function onTicketCreated(TicketEvents\TicketCreated $event): void
    {
        $ticket = Ticket::find($event->uuid);
        $operator = Operator::find($event->operatorUuid)?->writeable();
        if (! $ticket || ! $operator) {
            return;
        }

        $operator->increment('bound_tickets');
        $operator->increment('total_complexity', $ticket->complexity);
        $operator->update(['last_bound_at' => now()]);
    }
}
