<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\Events\PropsInvalidated;

class InvalidatingObserver
{
    public function created(): void
    {
        $this->invalidateProps();
    }

    public function updated(): void
    {
        $this->invalidateProps();
    }

    public function deleted(): void
    {
        $this->invalidateProps();
    }

    public function forceDeleted(): void
    {
        $this->invalidateProps();
    }

    public function restored(): void
    {
        $this->invalidateProps();
    }

    protected function invalidateProps(): void
    {
        broadcast(new PropsInvalidated);
    }
}
