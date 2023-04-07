<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\BindTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class BindTicketAction extends Action
{
    public function __invoke(Ticket|string $ticket, Operator|string $operator, array $meta = []): void
    {
        $this->dispatch(new BindTicket(
            uuid: is_string($ticket) ? $ticket : $ticket->getKey(),
            operatorUuid: is_string($operator) ? $operator : $operator->getKey(),
            meta: $meta,
        ));
    }
}
