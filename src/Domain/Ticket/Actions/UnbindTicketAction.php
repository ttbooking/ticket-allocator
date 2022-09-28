<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\UnbindTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class UnbindTicketAction extends Action
{
    public function __invoke(Ticket $ticket): void
    {
        $this->dispatch(new UnbindTicket(
            uuid: $ticket->getKey(),
        ));
    }
}
