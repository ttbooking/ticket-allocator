<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionProperty;

abstract class Event implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $queue = 'event-sourcing';

    protected string $channel = 'ticket-allocator';

    protected ?string $name = null;

    public function __sleep()
    {
        unset($this->queue);
        unset($this->socket);

        return array_keys($this->broadcastWith());
    }

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return string[]
     */
    public function tags(): array
    {
        return [$this->channel];
    }

    public function broadcastAs(): string
    {
        return $this->name ??= Str::kebab(class_basename(static::class));
    }

    public function broadcastOn()
    {
        return new Channel($this->channel);
    }

    public function broadcastWith(): array
    {
        return collect((new ReflectionClass($this))->getProperties(ReflectionProperty::IS_PUBLIC))
            ->reject(fn (ReflectionProperty $property) => property_exists(__CLASS__, $property->name))
            ->mapWithKeys(fn (ReflectionProperty $property) => [$property->name => $property->getValue($this)])
            ->all();
    }
}
