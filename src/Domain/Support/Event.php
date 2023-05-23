<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Support;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;
use TTBooking\TicketAllocator\Concerns\Broadcastable;

abstract class Event extends ShouldBeStored implements ShouldBroadcast
{
    use Broadcastable;

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return string[]
     */
    public function tags(): array
    {
        return [$this->channel, $this->prefix().':'.$this->aggregateRootUuid()];
    }

    protected function prefix(): string
    {
        return $this->_prefix ??= self::parseClassName()[0];
    }

    protected function name(): string
    {
        return $this->_name ??= self::parseClassName()[1];
    }

    /**
     * @return string[]
     */
    private static function parseClassName(): array
    {
        return explode('-', static::transformClassName(), 2);
    }
}
