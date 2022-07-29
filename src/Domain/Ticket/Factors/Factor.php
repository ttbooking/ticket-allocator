<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Factors;

use Spatie\EventSourcing\StoredEvents\ShouldBeStored;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Contracts\ShouldAffect;

abstract class Factor implements FactorContract
{
    public function configure(array $config): static
    {
        return $this;
    }

    public function getConfig(): array
    {
        return [];
    }

    abstract protected function handleFactor(ShouldBeStored&ShouldAffect $event): void;
}
