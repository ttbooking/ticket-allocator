<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\Domain\Ticket\Actions\SetTicketMetaValueAction;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TicketCategoryObserver
{
    public function __construct(protected SetTicketMetaValueAction $setTicketMetaValue)
    {
    }

    /**
     * Handle the TicketCategory "updated" event.
     */
    public function updated(TicketCategory $category): void
    {
        foreach ($category->tickets as $ticket) {
            ($this->setTicketMetaValue)($ticket, Ticket::META_CATEGORY_NAME, $category->name);
            ($this->setTicketMetaValue)($ticket, Ticket::META_CATEGORY_SHORT, $category->short);
        }
    }
}
