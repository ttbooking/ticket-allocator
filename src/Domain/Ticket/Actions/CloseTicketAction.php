<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\CloseTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class CloseTicketAction extends Action
{
    public function __invoke(Ticket $ticket): void
    {
        $this->dispatch(new CloseTicket(
            uuid: $ticket->getKey(),
        ));
    }
}
