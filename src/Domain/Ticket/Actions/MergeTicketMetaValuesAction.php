<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\MergeTicketMetaValues;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class MergeTicketMetaValuesAction extends Action
{
    public function __invoke(Ticket|string $ticket, array $meta): void
    {
        if (is_string($ticket)) {
            $ticket = Ticket::find($ticket);
        }

        if($meta = self::diffAssoc(array_merge($ticket->meta ?? [], $meta), $ticket->meta ?? [])) {
            $this->dispatch(new MergeTicketMetaValues(
                uuid: $ticket->getKey(),
                meta: $meta,
            ));
        }
    }
}
