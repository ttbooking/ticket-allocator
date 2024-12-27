<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\PostOperatorMessage;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class PostOperatorMessageAction extends Action
{
    public function __invoke(Operator|string $operator, Ticket|string $ticket, array $meta = []): void
    {
        $this->dispatch(new PostOperatorMessage(
            uuid: is_string($operator) ? $operator : $operator->getKey(),
            ticketUuid: is_string($ticket) ? $ticket : $ticket->getKey(),
            meta: $meta,
        ));
    }
}
