<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Support;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Str;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;
use TTBooking\TicketAllocator\Concerns\Broadcastable;

abstract class Event extends ShouldBeStored implements ShouldBroadcast
{
    use Broadcastable;

    protected ?string $aggregateRootName = null;

    protected ?string $eventName = null;

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return string[]
     */
    public function tags(): array
    {
        return [$this->channel, $this->aggregateRootName().':'.$this->aggregateRootUuid()];
    }

    public function broadcastAs(): string
    {
        return $this->aggregateRootName().'.'.$this->eventName();
    }

    protected function aggregateRootName(): string
    {
        return $this->aggregateRootName ??= self::parseClassName()[0];
    }

    protected function eventName(): string
    {
        return $this->eventName ??= self::parseClassName()[1];
    }

    /**
     * @return string[]
     */
    private static function parseClassName(): array
    {
        return explode('-', Str::kebab(class_basename(static::class)), 2);
    }
}
