<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\ChangeTicketCategory;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

class ChangeTicketCategoryAction extends Action
{
    public function __invoke(Ticket $ticket, TicketCategory $category): void
    {
        $this->dispatch(new ChangeTicketCategory(
            uuid: $ticket->getKey(),
            categoryUuid: $category->getKey(),
        ));
    }
}
