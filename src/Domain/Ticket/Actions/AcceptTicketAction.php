<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\AcceptTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class AcceptTicketAction extends Action
{
    public function __invoke(Ticket|string $ticket): void
    {
        $this->dispatch(new AcceptTicket(
            uuid: is_string($ticket) ? $ticket : $ticket->getKey(),
        ));
    }
}
