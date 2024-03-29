<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\SetTicketMetaValue;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class SetTicketMetaValueAction extends Action
{
    public function __invoke(Ticket|string $ticket, string $key, mixed $value): void
    {
        $this->dispatch(new SetTicketMetaValue(
            uuid: is_string($ticket) ? $ticket : $ticket->getKey(),
            key: $key,
            value: $value,
        ));
    }
}
