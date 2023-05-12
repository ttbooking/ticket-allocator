<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Attributes\Factors\Alias;
use TTBooking\TicketAllocator\Attributes\Factors\Component;
use TTBooking\TicketAllocator\Attributes\Factors\Singular;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

abstract class Factor implements FactorContract
{
    protected static string $alias;

    protected array $config = [];

    public static function setAlias(string $alias): void
    {
        static::$alias = $alias;
    }

    public static function getAlias(): string
    {
        return static::$alias
            ?? ((new \ReflectionClass(static::class))->getAttributes(Alias::class)[0] ?? null)?->newInstance()->alias
            ?? Str::snake(class_basename(static::class));
    }

    public static function getName(): string
    {
        return trans('ticket-allocator::factor.'.static::getAlias());
    }

    public static function isSingular(): bool
    {
        return ! empty((new \ReflectionClass(static::class))->getAttributes(Singular::class));
    }

    public static function getComponentName(): ?string
    {
        return ((new \ReflectionClass(static::class))->getAttributes(Component::class)[0] ?? null)?->newInstance()->name
            ?? null;
    }

    public function getProps(): array
    {
        return [];
    }

    public function configure(array $config): static
    {
        $this->config = $config;

        return $this;
    }

    public function getConfig(): array
    {
        return $this->config;
    }
}
