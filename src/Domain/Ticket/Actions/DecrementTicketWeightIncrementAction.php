<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\DecrementTicketWeightIncrement;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class DecrementTicketWeightIncrementAction extends Action
{
    public function __invoke(Ticket $ticket, int $weightPoints): void
    {
        $this->dispatch(new DecrementTicketWeightIncrement(
            uuid: $ticket->getKey(),
            weightPoints: $weightPoints,
        ));
    }
}
