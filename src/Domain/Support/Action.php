<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Support;

use Spatie\EventSourcing\Commands\CommandBus;

abstract class Action
{
    public function __construct(protected CommandBus $bus)
    {
    }

    public function dispatch(object $command): mixed
    {
        return $this->bus->dispatch($command);
    }
}
