<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Support;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\EventSourcing\Commands\CommandBus;

abstract class Action
{
    public function __construct(protected CommandBus $bus) {}

    public function dispatch(object $command): mixed
    {
        return $this->bus->dispatch($command);
    }

    /**
     * @param  Model|Collection<int, string>|EloquentCollection<int, Model>|iterable<string>|string  $items
     * @return string[]
     */
    final protected static function extractUuids(Model|Collection|EloquentCollection|iterable|string $items): array
    {
        return collect(match (true) {
            $items instanceof Model => $items->getKey(),
            $items instanceof EloquentCollection => $items->modelKeys(),
            default => $items,
        })->all();
    }
}
