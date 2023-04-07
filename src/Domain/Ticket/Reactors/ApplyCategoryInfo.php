<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Reactors;

use Spatie\EventSourcing\EventHandlers\Reactors\Reactor;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\MergeTicketMetaValuesAction;
use TTBooking\TicketAllocator\Domain\Ticket\Events\TicketCategoryChanged;
use TTBooking\TicketAllocator\Domain\Ticket\Events\TicketCreated;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

class ApplyCategoryInfo extends Reactor
{
    public function __construct(protected MergeTicketMetaValuesAction $mergeTicketMetaValues)
    {
    }

    public function onTicketCreated(TicketCreated $event): void
    {
        if (! $ticketCategory = TicketCategory::find($event->categoryUuid)) {
            return;
        }

        ($this->mergeTicketMetaValues)($event->uuid, [
            Ticket::META_CATEGORY_NAME => $ticketCategory->name,
            Ticket::META_CATEGORY_SHORT => $ticketCategory->short,
        ]);
    }

    public function onTicketCategoryChanged(TicketCategoryChanged $event): void
    {
        if (! $ticketCategory = TicketCategory::find($event->categoryUuid)) {
            return;
        }

        ($this->mergeTicketMetaValues)($event->uuid, [
            Ticket::META_CATEGORY_NAME => $ticketCategory->name,
            Ticket::META_CATEGORY_SHORT => $ticketCategory->short,
        ]);
    }
}
