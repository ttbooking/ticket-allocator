<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\IncrementTicketWeightIncrement;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class IncrementTicketWeightIncrementAction extends Action
{
    public function __invoke(Ticket $ticket, int $weightPoints): void
    {
        $this->dispatch(new IncrementTicketWeightIncrement(
            uuid: $ticket->getKey(),
            weightPoints: $weightPoints,
        ));
    }
}
