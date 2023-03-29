<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorTicketCategoriesDetached extends Event
{
    /**
     * @param  string  $uuid
     * @param  string[]  $ticketCategoryUuids
     */
    public function __construct(
        public string $uuid,
        public array $ticketCategoryUuids,
    ) {
    }
}
