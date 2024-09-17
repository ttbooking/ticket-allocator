<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\Domain\Ticket\Actions\MergeTicketMetaValuesAction;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TicketCategoryObserver
{
    public function __construct(protected MergeTicketMetaValuesAction $mergeTicketMetaValues) {}

    /**
     * Handle the TicketCategory "updated" event.
     */
    public function updated(TicketCategory $category): void
    {
        foreach ($category->tickets as $ticket) {
            ($this->mergeTicketMetaValues)($ticket, [
                Ticket::META_CATEGORY_NAME => $category->name,
                Ticket::META_CATEGORY_SHORT => $category->short,
            ]);
        }
    }
}
