<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Reactors;

use Spatie\EventSourcing\EventHandlers\Reactors\Reactor;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;
use TTBooking\TicketAllocator\Contracts\ShouldAffect;
use TTBooking\TicketAllocator\Models\Factor;

class ApplyFactors extends Reactor
{
    public function handleFactor(ShouldBeStored&ShouldAffect $event): void
    {
        Factor::query()->each(function (Factor $factor) {
            // TODO: apply factors, issue commands
        });
    }
}
