<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\CreateTicket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

class CreateTicketAction extends Action
{
    public function __invoke(TicketCategory $category, object $ticketOrigin = null): ?Ticket
    {
        $uuid = (string) Str::orderedUuid();

        $this->dispatch(new CreateTicket(
            uuid: $uuid,
            categoryUuid: $category->getKey(),
            origin: $ticketOrigin,
        ));

        return Ticket::find($uuid);
    }
}
