<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Concerns;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionProperty;

/**
 * @phpstan-require-implements ShouldBroadcast
 */
trait Broadcastable
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $queue = 'event-sourcing';

    protected string $channel = 'ticket-allocator';

    protected ?string $_prefix = null;

    protected ?string $_name = null;

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
        return ltrim($this->prefix().'.'.$this->name(), '.');
    }

    public function broadcastOn(): Channel
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

    protected function prefix(): string
    {
        return $this->_prefix ??= '';
    }

    protected function name(): string
    {
        return $this->_name ??= static::transformClassName();
    }

    protected static function transformClassName(): string
    {
        return Str::kebab(class_basename(static::class));
    }
}
