<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\BindTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class BindTicketAction extends Action
{
    public function __invoke(Ticket $ticket, Operator $operator): void
    {
        $this->dispatch(new BindTicket(
            uuid: $ticket->getKey(),
            operatorUuid: $operator->getKey(),
        ));
    }
}
