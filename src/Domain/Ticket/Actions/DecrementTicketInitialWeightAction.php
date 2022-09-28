<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\DecrementTicketInitialWeight;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class DecrementTicketInitialWeightAction extends Action
{
    public function __invoke(Ticket $ticket, int $weightPoints): void
    {
        $this->dispatch(new DecrementTicketInitialWeight(
            uuid: $ticket->getKey(),
            weightPoints: $weightPoints,
        ));
    }
}
