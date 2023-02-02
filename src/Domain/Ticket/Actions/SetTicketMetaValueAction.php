<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\SetTicketMetaValue;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class SetTicketMetaValueAction extends Action
{
    public function __invoke(Ticket $ticket, string $key, string $value): void
    {
        $this->dispatch(new SetTicketMetaValue(
            uuid: $ticket->getKey(),
            key: $key,
            value: $value,
        ));
    }
}
