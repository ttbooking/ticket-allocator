<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Factors;

use Spatie\EventSourcing\Commands\CommandBus;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;
use TTBooking\TicketAllocator\Contracts\ShouldAffect;
use TTBooking\TicketAllocator\Domain\Ticket\Commands\IncrementTicketInitialWeight;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

class Category extends Factor
{
    public function __construct(protected CommandBus $bus, protected array $config = [])
    {
    }

    protected function handleFactor(ShouldBeStored&ShouldAffect $event): void
    {
        $ticket = TicketAggregateRoot::retrieve($event->aggregateRootUuid());
        //$ticket->origin->

        $this->bus->dispatch(new IncrementTicketInitialWeight(
            uuid: $event->aggregateRootUuid(),
            weightPoints: $this->config['variables']['categories'],
        ));
    }
}
