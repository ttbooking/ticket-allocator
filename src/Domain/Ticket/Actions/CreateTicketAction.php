<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\CreateTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class CreateTicketAction extends Action
{
    public function __invoke(object $ticketOrigin): ?Ticket
    {
        $uuid = (string) Str::orderedUuid();

        $this->dispatch(new CreateTicket(
            uuid: $uuid,
            origin: $ticketOrigin,
        ));

        return Ticket::find($uuid);
    }
}
