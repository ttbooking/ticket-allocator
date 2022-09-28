<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\DecrementTicketDelay;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class DecrementTicketDelayAction extends Action
{
    public function __invoke(Ticket $ticket, int $delaySeconds): void
    {
        $this->dispatch(new DecrementTicketDelay(
            uuid: $ticket->getKey(),
            delaySeconds: $delaySeconds,
        ));
    }
}
