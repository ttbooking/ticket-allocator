<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\TicketAllocator;

class InvalidatingObserver
{
    public function created(): void
    {
        TicketAllocator::invalidateProps();
    }

    public function updated(): void
    {
        TicketAllocator::invalidateProps();
    }

    public function deleted(): void
    {
        TicketAllocator::invalidateProps();
    }

    public function forceDeleted(): void
    {
        TicketAllocator::invalidateProps();
    }

    public function restored(): void
    {
        TicketAllocator::invalidateProps();
    }
}
