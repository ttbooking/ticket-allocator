<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\DecrementTicketComplexity;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class DecrementTicketComplexityAction extends Action
{
    public function __invoke(Ticket $ticket, int $complexityPoints): void
    {
        $this->dispatch(new DecrementTicketComplexity(
            uuid: $ticket->getKey(),
            complexityPoints: $complexityPoints,
        ));
    }
}
