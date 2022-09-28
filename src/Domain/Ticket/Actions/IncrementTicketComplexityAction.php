<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\IncrementTicketComplexity;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class IncrementTicketComplexityAction extends Action
{
    public function __invoke(Ticket $ticket, int $complexityPoints): void
    {
        $this->dispatch(new IncrementTicketComplexity(
            uuid: $ticket->getKey(),
            complexityPoints: $complexityPoints,
        ));
    }
}
